#!/bin/bash
# Download all IR assets into organized /assets/ folder structure
# Run from project root: bash tools/download-assets.sh

set -e
ASSETS_DIR="./assets"
URL_FILE="./docs/block-analysis/asset-urls.txt"
DOWNLOAD_LOG="./docs/block-analysis/download-log.txt"

echo "=== American Express IR Asset Downloader ==="
echo "Source: $URL_FILE"
echo "Destination: $ASSETS_DIR"
echo ""

> "$DOWNLOAD_LOG"
TOTAL=$(wc -l < "$URL_FILE")
COUNT=0
ERRORS=0

classify_url() {
  local url="$1"

  # SEC filings from CloudFront (EDGAR)
  if echo "$url" | grep -q "cloudfront.net/CIK-"; then
    local ext="${url##*.}"
    echo "sec-filings/edgar/$ext"
    return
  fi

  # Q4 CDN paths
  if echo "$url" | grep -q "q4cdn.com"; then
    local path=$(echo "$url" | sed 's|.*747928648/files/||')

    # Earnings
    if echo "$path" | grep -q "doc_earnings/"; then
      local year=$(echo "$path" | grep -oE '20[0-9]{2}' | head -1)
      local quarter=$(echo "$path" | grep -oE 'q[1-4]' | head -1)
      echo "earnings/${year}/${quarter}"
      return
    fi

    # Financials (annual reports, 10-K, 10-Q, proxy)
    if echo "$path" | grep -q "doc_financials/"; then
      local year=$(echo "$path" | grep -oE '20[0-9]{2}' | head -1)
      if echo "$path" | grep -qi "annual-report\|proxy"; then
        echo "annual-reports/${year}"
      else
        echo "sec-filings/${year}"
      fi
      return
    fi

    # Term sheets
    if echo "$path" | grep -q "term_sheets/"; then
      echo "term-sheets"
      return
    fi

    # Governance documents
    if echo "$path" | grep -q "doc_governance/"; then
      echo "governance"
      return
    fi

    # Fixed income presentations
    if echo "$path" | grep -q "fixed_income/\|fixed-income"; then
      local year=$(echo "$path" | grep -oE '20[0-9]{2}' | head -1)
      echo "fixed-income/presentations/${year}"
      return
    fi

    # Credit account / ABS
    if echo "$path" | grep -q "credit_account/"; then
      echo "fixed-income/abs/credit-account-master-trust"
      return
    fi

    # Issuance trust
    if echo "$path" | grep -q "issuance_trust/"; then
      local subpath=""
      if echo "$path" | grep -q "program_documents"; then
        subpath="program-docs"
      elif echo "$path" | grep -q "servicer_reports"; then
        subpath="servicer-reports"
      elif echo "$path" | grep -q "performance_trends"; then
        subpath="performance-trends"
      else
        subpath="other"
      fi
      echo "fixed-income/abs/issuance-trust-ii/${subpath}"
      return
    fi

    # ESG / Sustainability
    if echo "$path" | grep -q "ESG/\|Sustainability"; then
      echo "sustainability"
      return
    fi

    # Pillar disclosures
    if echo "$path" | grep -q "pillar"; then
      echo "disclosures/pillar3"
      return
    fi

    # Political engagement
    if echo "$path" | grep -q "engagement/"; then
      echo "political-contributions"
      return
    fi

    # Events / presentations
    if echo "$path" | grep -q "doc_events/\|doc_presentations/"; then
      local year=$(echo "$path" | grep -oE '20[0-9]{2}' | head -1)
      echo "events/${year}"
      return
    fi

    # General downloads by year
    if echo "$path" | grep -q "doc_downloads/"; then
      # ABS servicer/performance
      if echo "$path" | grep -qi "ABS-.*Servicer"; then
        local year=$(echo "$path" | grep -oE '20[0-9]{2}' | head -1)
        echo "fixed-income/abs/credit-account-master-trust/servicer-reports/${year}"
        return
      fi
      if echo "$path" | grep -qi "ABS-.*Trust-Data"; then
        local year=$(echo "$path" | grep -oE '20[0-9]{2}' | head -1)
        echo "fixed-income/abs/credit-account-master-trust/performance-trends/${year}"
        return
      fi
      # Fixed income presentations
      if echo "$path" | grep -qi "Fixed-Income-Presentation"; then
        local year=$(echo "$path" | grep -oE '20[0-9]{2}' | head -1)
        echo "fixed-income/presentations/${year}"
        return
      fi
      # LCR disclosures
      if echo "$path" | grep -qi "LCR"; then
        echo "disclosures/lcr"
        return
      fi
      # Governance docs
      if echo "$path" | grep -qi "governance\|Code-of-Conduct\|Charter\|By-Laws\|Whistleblower\|Human-Rights\|Certificate"; then
        echo "governance"
        return
      fi
      local year=$(echo "$path" | grep -oE '20[0-9]{2}' | head -1)
      echo "downloads/${year}"
      return
    fi
  fi

  # IR site direct files
  if echo "$url" | grep -q "ir.americanexpress.com"; then
    echo "other"
    return
  fi

  echo "other"
}

while IFS= read -r url; do
  COUNT=$((COUNT + 1))

  # Classify into folder
  FOLDER=$(classify_url "$url")
  DEST_DIR="$ASSETS_DIR/$FOLDER"

  # Extract filename
  FILENAME=$(basename "$url" | sed 's/?.*//')

  # Create directory
  mkdir -p "$DEST_DIR"

  DEST_PATH="$DEST_DIR/$FILENAME"

  # Skip if already downloaded
  if [ -f "$DEST_PATH" ]; then
    echo "[$COUNT/$TOTAL] SKIP (exists): $FILENAME"
    echo "SKIP $url -> $DEST_PATH" >> "$DOWNLOAD_LOG"
    continue
  fi

  echo "[$COUNT/$TOTAL] Downloading: $FILENAME -> $FOLDER/"

  if curl -sS -L -o "$DEST_PATH" --max-time 30 --retry 2 "$url" 2>/dev/null; then
    echo "OK   $url -> $DEST_PATH" >> "$DOWNLOAD_LOG"
  else
    echo "[$COUNT/$TOTAL] ERROR: Failed to download $FILENAME"
    echo "ERR  $url" >> "$DOWNLOAD_LOG"
    ERRORS=$((ERRORS + 1))
    rm -f "$DEST_PATH"
  fi

  # Rate limit: small delay between downloads
  sleep 0.3

done < "$URL_FILE"

echo ""
echo "=== Download Complete ==="
echo "Total: $COUNT files processed"
echo "Errors: $ERRORS"
echo "Log: $DOWNLOAD_LOG"
echo ""
echo "Folder sizes:"
du -sh "$ASSETS_DIR"/*/ 2>/dev/null | sort -rh
