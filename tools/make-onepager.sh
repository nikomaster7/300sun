#!/bin/sh
# Rebuild the travel advisors one-pager PDF from tools/onepager/advisors.html.
# Needs Chrome or Chromium. Pass its path if it isn't found:
#
#   tools/make-onepager.sh "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
#
# → site/advisors/300sun-travel-advisors.pdf
set -e
cd "$(dirname "$0")/.."
chrome="${1:-$(command -v chromium || command -v google-chrome || echo "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")}"
"$chrome" --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/site/advisors/300sun-travel-advisors.pdf" \
  "file://$PWD/tools/onepager/advisors.html"
ls -lh site/advisors/300sun-travel-advisors.pdf
