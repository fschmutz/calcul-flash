# Architecture

Static GitHub Pages from the **repo root** (not `docs/`). The app URL is `/`. Do not move Pages to `docs/` or the live URL breaks.

```
index.html          cabinet screens, CSP
css/                arcade UI (Bungee, Fredoka, DM Mono)
js/app.js           round loop, pad, records, version check
js/generate.js      seven families + mix
js/fx.js            canvas fireworks
js/i18n.js          EN / FR
js/version.js       APP_VERSION
sw.js               cache flash-v1; version.json is never precached
wiki/               source of truth → GitHub wiki via scripts/wiki-sync.sh
test/               node --test (no browser)
```

GitHub wiki is a separate git repo (`calcul-flash.wiki.git`). Edit `wiki/*.md` here; `scripts/wiki-sync.sh` mirrors them. Edits in the GitHub wiki UI are overwritten. There is no `wiki.yml` Action — the token has no `workflow` scope; run the script locally after the wiki tab exists.
