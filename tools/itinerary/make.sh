#!/bin/sh
# Build a client's one-page route sheet as PDF and PNG.
#
#   tools/itinerary/make.sh example        → the model, from tools/itinerary/trips/example.js
#   tools/itinerary/make.sh smith-april    → from clients/smith-april.js
#
# Output goes to clients/out/ (not on GitHub: it holds clients' names and dates).
# Needs Chrome. Pass its path as a second argument if it isn't found.
set -e
cd "$(dirname "$0")/../.."
name="${1:-example}"
chrome="${2:-$(command -v chromium || command -v google-chrome || echo "/c/Program Files/Google/Chrome/Application/chrome.exe")}"
root="$(pwd -W 2>/dev/null || pwd)"
if [ -f "clients/$name.js" ]; then dir="../../clients"; else dir="trips"; fi
mkdir -p clients/out
url="file:///$root/tools/itinerary/itinerary.html?c=$name&dir=$dir"
"$chrome" --headless --disable-gpu --allow-file-access-from-files --no-pdf-header-footer --virtual-time-budget=6000 \
  --print-to-pdf="$root/clients/out/$name.pdf" "$url" >/dev/null 2>&1
"$chrome" --headless --disable-gpu --allow-file-access-from-files --hide-scrollbars --virtual-time-budget=6000 \
  --window-size=794,1123 --force-device-scale-factor=2 --screenshot="$root/clients/out/$name.png" "$url" >/dev/null 2>&1
ls -l "clients/out/$name.pdf" "clients/out/$name.png" | awk '{print $5, $9}'
