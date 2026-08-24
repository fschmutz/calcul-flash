#!/usr/bin/env bash
# Publish wiki/ to the GitHub wiki (<repo>.wiki.git).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WIKI_URL="${WIKI_URL:-https://github.com/fschmutz/calcul-flash.wiki.git}"

if [ ! -d "$ROOT/wiki" ]; then
    echo "wiki-sync: no wiki/ directory in $ROOT" >&2
    exit 1
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo "==> Cloning wiki"
if ! git clone -q "$WIKI_URL" "$tmp/wiki" 2>/dev/null; then
    echo "wiki-sync: wiki repo empty or missing, initializing"
    mkdir -p "$tmp/wiki"
    git -C "$tmp/wiki" init -q -b master
    git -C "$tmp/wiki" remote add origin "$WIKI_URL"
fi

echo "==> Mirroring wiki/ → wiki repo"
find "$tmp/wiki" -maxdepth 1 -name '*.md' -delete
cp "$ROOT"/wiki/*.md "$tmp/wiki/"

cd "$tmp/wiki"
if git diff --quiet && [ -z "$(git status --porcelain)" ]; then
    echo "wiki-sync: wiki already up to date"
    exit 0
fi

git add -A
git config user.name >/dev/null 2>&1 || git config user.name "wiki-sync"
git config user.email >/dev/null 2>&1 || git config user.email "wiki-sync@users.noreply.github.com"
git commit -m "docs(wiki): sync from main repo wiki/"

git push -u origin HEAD:master
echo "==> Wiki published"
