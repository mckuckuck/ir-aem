#!/bin/bash
# Restore content files from backup after project recreation
#
# Usage:
#   bash tools/restore-content.sh
#
# This restores all 22 pages (HTML + .plain.html) from content-backup/ to content/
# Run this after recreating the project and linking to the new AEM site.

set -e

BACKUP_DIR="./tools/content-backup"
CONTENT_DIR="./content"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "ERROR: Backup directory '$BACKUP_DIR' not found."
  echo "Make sure you're running this from the repo root."
  exit 1
fi

echo "=== Content Restore ==="
echo "Source: $BACKUP_DIR"
echo "Target: $CONTENT_DIR"
echo ""

# Create content directory if it doesn't exist
mkdir -p "$CONTENT_DIR"

# Copy all backed-up content
cp -r "$BACKUP_DIR"/* "$CONTENT_DIR"/

echo "✓ Restored $(find "$CONTENT_DIR" -name '*.html' | wc -l) HTML files"
echo "  - $(find "$CONTENT_DIR" -name '*.plain.html' | wc -l) .plain.html files (for md2jcr)"
echo "  - $(find "$CONTENT_DIR" -name '*.html' -not -name '*.plain.html' | wc -l) page files (for local dev)"
echo ""
echo "Done! Content restored successfully."
echo ""
echo "Next steps:"
echo "  1. Verify local preview: http://localhost:3000/"
echo "  2. Run md2jcr to push content to AEM"
echo "  3. Update paths.json if the AEM content path changed"
