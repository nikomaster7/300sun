#!/bin/sh
# Build the Instagram slides (1080 x 1350 PNG) from tools/instagram/posts.js.
# Needs Chrome. Pass its path if it isn't found:
#
#   tools/instagram/make.sh "/c/Program Files/Google/Chrome/Application/chrome.exe"
#
# → marketing/instagram/<post id>/slide-N.png
set -e
cd "$(dirname "$0")/../.."
chrome="${1:-$(command -v chromium || command -v google-chrome || echo "/c/Program Files/Google/Chrome/Application/chrome.exe")}"
root="$(pwd -W 2>/dev/null || pwd)"
# "id count" pairs, read from posts.js
grep -o 'id: "[^"]*"\|{ t: "' tools/instagram/posts.js | awk '/^id/ { if (id) print id, n; gsub(/id: "|"/, ""); id = $0; n = 0; next } { n++ } END { print id, n }' |
while read id n; do
  mkdir -p "marketing/instagram/$id"
  s=1
  while [ "$s" -le "$n" ]; do
    "$chrome" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=4000 --window-size=1080,1350 \
      --screenshot="$root/marketing/instagram/$id/slide-$s.png" \
      "file:///$root/tools/instagram/post.html?p=$id&s=$s" >/dev/null 2>&1
    s=$((s + 1))
  done
  echo "$id: $n slides"
done
