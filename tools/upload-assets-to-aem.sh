#!/bin/bash
# Upload all IR assets to AEM DAM via Assets HTTP API
#
# Usage:
#   export AEM_TOKEN="your-developer-token-here"
#   bash tools/upload-assets-to-aem.sh
#
# Get your dev token from:
#   https://developer.adobe.com/console/ > Your AEM project > Credentials > Generate token
#   Or: AEM Developer Console > Integrations > Local Development Access Token

set -e

AEM_HOST="https://author-p92869-e1797231.adobeaemcloud.com"
DAM_ROOT="/content/dam/ir"
ASSETS_DIR="./assets"
UPLOAD_LOG="./docs/block-analysis/upload-log.txt"

if [ -z "$AEM_TOKEN" ]; then
  echo "ERROR: AEM_TOKEN environment variable is not set."
  echo ""
  echo "Get a developer token from the AEM Developer Console and run:"
  echo "  export AEM_TOKEN=\"your-token-here\""
  echo "  bash tools/upload-assets-to-aem.sh"
  exit 1
fi

echo "=== AEM DAM Asset Uploader ==="
echo "Host: $AEM_HOST"
echo "DAM Root: $DAM_ROOT"
echo "Source: $ASSETS_DIR"
echo ""

# Test connection
echo "Testing connection..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $AEM_TOKEN" \
  "$AEM_HOST/api/assets.json")

if [ "$HTTP_CODE" != "200" ]; then
  echo "ERROR: Connection failed (HTTP $HTTP_CODE). Check your token and host."
  exit 1
fi
echo "Connection OK."
echo ""

> "$UPLOAD_LOG"
TOTAL=$(find "$ASSETS_DIR" -type f | wc -l)
COUNT=0
CREATED=0
SKIPPED=0
ERRORS=0

create_folder() {
  local folder_path="$1"
  local folder_name=$(basename "$folder_path")
  local parent_path=$(dirname "$folder_path")

  # Check if folder exists
  local check=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer $AEM_TOKEN" \
    "$AEM_HOST${folder_path}.json")

  if [ "$check" = "200" ]; then
    return 0
  fi

  # Create folder
  curl -s -o /dev/null \
    -H "Authorization: Bearer $AEM_TOKEN" \
    -X POST \
    -F "jcr:primaryType=sling:OrderedFolder" \
    -F "jcr:content/jcr:title=$folder_name" \
    "$AEM_HOST${parent_path}/" \
    -F ":name=$folder_name" 2>/dev/null
}

ensure_folder_path() {
  local full_path="$1"
  local current=""

  IFS='/' read -ra PARTS <<< "$full_path"
  for part in "${PARTS[@]}"; do
    if [ -z "$part" ]; then continue; fi
    current="$current/$part"
    create_folder "$current"
  done
}

# Process each file
find "$ASSETS_DIR" -type f | sort | while IFS= read -r filepath; do
  COUNT=$((COUNT + 1))

  # Build DAM path from local path
  # e.g. ./assets/sec-filings/2026/q1/8-K.pdf -> /content/dam/ir/sec-filings/2026/q1/8-K.pdf
  relative_path="${filepath#$ASSETS_DIR/}"
  dam_folder="$DAM_ROOT/$(dirname "$relative_path")"
  filename=$(basename "$filepath")
  dam_path="$dam_folder/$filename"

  echo "[$COUNT/$TOTAL] Uploading: $relative_path"

  # Ensure folder structure exists
  ensure_folder_path "$dam_folder"

  # Check if asset already exists
  EXISTING=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer $AEM_TOKEN" \
    "$AEM_HOST/api/assets${dam_folder#/content/dam}/$filename.json")

  if [ "$EXISTING" = "200" ]; then
    echo "  SKIP (exists)"
    echo "SKIP $dam_path" >> "$UPLOAD_LOG"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Determine MIME type
  case "${filename##*.}" in
    pdf)  MIME="application/pdf" ;;
    xls)  MIME="application/vnd.ms-excel" ;;
    xlsx) MIME="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ;;
    zip)  MIME="application/zip" ;;
    html) MIME="text/html" ;;
    png)  MIME="image/png" ;;
    jpg|jpeg) MIME="image/jpeg" ;;
    *)    MIME="application/octet-stream" ;;
  esac

  # Upload asset
  RESPONSE=$(curl -s -w "\n%{http_code}" \
    -H "Authorization: Bearer $AEM_TOKEN" \
    -X POST \
    -F "file=@$filepath;type=$MIME" \
    -F "fileName=$filename" \
    "$AEM_HOST/api/assets${dam_folder#/content/dam}")

  HTTP_CODE=$(echo "$RESPONSE" | tail -1)

  if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "200" ]; then
    echo "  OK"
    echo "OK   $dam_path" >> "$UPLOAD_LOG"
    CREATED=$((CREATED + 1))
  else
    echo "  ERROR (HTTP $HTTP_CODE)"
    echo "ERR  $dam_path (HTTP $HTTP_CODE)" >> "$UPLOAD_LOG"
    ERRORS=$((ERRORS + 1))
  fi

  # Rate limit
  sleep 0.2

done

echo ""
echo "=== Upload Complete ==="
echo "Total processed: $COUNT"
echo "Created: $CREATED"
echo "Skipped (existing): $SKIPPED"
echo "Errors: $ERRORS"
echo "Log: $UPLOAD_LOG"
