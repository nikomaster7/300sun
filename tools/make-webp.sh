#!/bin/sh
# Make a .webp twin next to every .jpg in site/images (about 40% lighter, same look).
# Uses Chrome to do the conversion, so nothing else needs installing.
#
#   tools/make-webp.sh                    all photos that have no .webp yet
#   tools/make-webp.sh "/path/to/chrome"  if Chrome isn't found
set -e
cd "$(dirname "$0")/.."
chrome="${1:-$(command -v chromium || command -v google-chrome || echo "/c/Program Files/Google/Chrome/Application/chrome.exe")}"
root="$(pwd -W 2>/dev/null || pwd)"
find site/images -name "*.jpg" | sort | while read f; do
  out="${f%.jpg}.webp"
  [ -s "$out" ] && continue
  "$chrome" --headless --disable-gpu --allow-file-access-from-files --virtual-time-budget=8000 --dump-dom \
    "file:///$root/tools/webp.html?q=0.6&f=file:///$root/$f" 2>/dev/null |
    grep -o "DATA [A-Za-z0-9+/=]* END" | sed 's/^DATA //; s/ END$//' | base64 -d > "$out"
  echo "$out"
done
