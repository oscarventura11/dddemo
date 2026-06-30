#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <folder> <title>"
  echo "Folders: inbox | fleeting | literature | permanent | structure | project"
  exit 1
fi

folder_key="$1"
shift
raw_title="$*"

case "$folder_key" in
  inbox) folder="notes/00 Inbox"; type="inbox" ;;
  fleeting) folder="notes/10 Fleeting"; type="fleeting" ;;
  literature) folder="notes/20 Literature"; type="literature" ;;
  permanent) folder="notes/30 Permanent"; type="permanent" ;;
  structure) folder="notes/40 Structures"; type="structure" ;;
  project) folder="notes/50 Projects"; type="project" ;;
  *)
    echo "Unknown folder: $folder_key"
    exit 1
    ;;
esac

id="$(date +%Y%m%d%H%M)"
slug="$(echo "$raw_title" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"

file_name="$id-$slug.md"
file_path="$folder/$file_name"

mkdir -p "$folder"

cat > "$file_path" <<EOF
---
id: $id
type: $type
created: $(date +"%Y-%m-%d %H:%M")
tags: [$type]
---

# $raw_title

## Context


## Note


## Links

- [[ ]]
EOF

echo "Created $file_path"
