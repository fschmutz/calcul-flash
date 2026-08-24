# Contributing

PRs welcome. The game must stay in the tab. Do not add analytics, CDNs, or a backend.

## How to run

```bash
python3 -m http.server 8080
node --test test/generate.test.mjs
```

## Layout

- `js/generate.js` — question families (tables, +/−, complements, decimals, fractions, measures, calcul malin)
- `js/fx.js` — canvas fireworks / stars / confetti
- `js/app.js` — round loop, pad, records, version check
- `wiki/` — source of truth for the GitHub wiki (do not edit pages in the wiki UI; this folder overwrites them)

If you change the live app, bump `APP_VERSION` in `js/version.js` **and** `CACHE` in `sw.js` together, and `version.json`.
