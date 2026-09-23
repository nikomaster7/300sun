#!/bin/zsh
# Turn original photos into the web sizes the site expects (640 / 1280 px wide).
# Uses macOS's built-in `sips`, nothing to install.
#
#   tools/prepare-photos.sh ~/Downloads/paella.jpg paella 300sun-valencia-paella-valenciana-1
#
# → site/images/paella/300sun-valencia-paella-valenciana-1-640.jpg (and -1280)
set -e
src="$1"; folder="$2"; name="$3"
if [[ -z "$src" || -z "$folder" || -z "$name" ]]; then
  echo "usage: $0 <photo> <paella|hostels|valencia> <file-name-without-size>"; exit 1
fi
out="$(dirname "$0")/../site/images/$folder"
mkdir -p "$out"
for w in 640 1280; do
  sips -s format jpeg -s formatOptions 78 --resampleWidth $w "$src" --out "$out/$name-$w.jpg" >/dev/null
done
ls -lh "$out/$name"-*.jpg
