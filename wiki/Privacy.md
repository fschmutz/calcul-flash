# Privacy

- Nothing is uploaded. No analytics, cookies, Sentry, Google, or CDN at runtime.
- Fonts are self-hosted woff2 (Bungee, Fredoka, DM Mono — OFL). Vendored once, never referenced at fonts.googleapis.com / fonts.gstatic.com.
- Content-Security-Policy via meta: `default-src 'self'`, `connect-src 'self'` (service worker). No inline script or style attributes.
- `Referrer-Policy: no-referrer`. `theme-color: #150C2E`.
- Only three `localStorage` keys: language, last player (name, age), high scores by name and difficulty.
- Web Audio stays in the tab. There is no microphone and no network after first load (plus `version.json` no-store when you check for an update).
