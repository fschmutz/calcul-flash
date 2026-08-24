<div align="center">

# Calcul Flash

**60 secondes. Combien tu en as ?**  
**60 seconds. How many can you get right?**

[![Live](https://img.shields.io/badge/live-fschmutz.github.io-FF3E8A?style=for-the-badge)](https://fschmutz.github.io/calcul-flash/)
[![License: MIT](https://img.shields.io/badge/license-MIT-FFC93C?style=for-the-badge)](LICENSE)
[![Privacy](https://img.shields.io/badge/privacy-nothing_uploaded-150C2E?style=for-the-badge)](https://github.com/fschmutz/calcul-flash/wiki/Privacy)
[![Wiki](https://img.shields.io/badge/wiki-how_it_works-3EE7B8?style=for-the-badge)](https://github.com/fschmutz/calcul-flash/wiki)

<img src="assets/logo.svg" alt="Calcul Flash mascot" width="260">

**[Open the live app →](https://fschmutz.github.io/calcul-flash/)**
· [wiki](https://github.com/fschmutz/calcul-flash/wiki)

</div>

Arcade cabinet. First name + age 8–14, then mode / difficulty / duration. Timed round, numeric pad, streak multipliers, a recap for parents, canvas fireworks. Nothing is uploaded.

French is the default (and if `navigator.language` starts with `fr`). English is a toggle. Only language, last player (name, age), and local records go to `localStorage`.

## Modes

Tables ×, lightning +/−, complements, decimals, fractions & %, measures, “calcul malin”, and a full mix. Age-calibrated. Web Audio beeps. Works offline after the first load.

## Privacy

No analytics, cookies, Sentry, Google, or CDN at runtime. Fonts are self-hosted woff2 (Bungee, Fredoka, DM Mono — OFL). CSP is `default-src 'self'` with `connect-src 'self'` (service worker). Details: [wiki/Privacy](https://github.com/fschmutz/calcul-flash/wiki/Privacy).

## Run it locally

```bash
python3 -m http.server 8080
# http://localhost:8080
```

```bash
node --test test/generate.test.mjs
```

If the live page looks stale after a new push, tap **Reload latest version** in the footer (or hard-refresh). The service worker otherwise keeps an old build.

## License

MIT. Copyright (c) 2026 [Falco Schmutz](https://github.com/fschmutz).
