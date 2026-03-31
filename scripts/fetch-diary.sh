#!/bin/bash
# Fetch diary content from private repo bravohenry/fri-content
# Runs at build time on Vercel (needs DIARY_GITHUB_TOKEN env var)
# Locally, diary files are already in content/diary/ (gitignored)

set -e

DEST="content/diary"

if [ -d "$DEST" ] && [ "$(ls -A $DEST 2>/dev/null)" ]; then
  echo "[fetch-diary] content/diary/ already has files, skipping fetch"
  exit 0
fi

if [ -z "$DIARY_GITHUB_TOKEN" ]; then
  echo "[fetch-diary] DIARY_GITHUB_TOKEN not set, skipping diary fetch"
  echo "[fetch-diary] Diary pages will not be generated in this build"
  exit 0
fi

echo "[fetch-diary] Cloning diary content from private repo..."
mkdir -p "$DEST"
git clone --depth 1 "https://x-access-token:${DIARY_GITHUB_TOKEN}@github.com/bravohenry/fri-content.git" /tmp/fri-content-clone
cp /tmp/fri-content-clone/diary/*.md "$DEST/"
rm -rf /tmp/fri-content-clone
echo "[fetch-diary] Fetched $(ls $DEST/*.md | wc -l | tr -d ' ') diary entries"
