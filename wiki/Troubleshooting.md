# Troubleshooting

## The live page looks old

Tap **Reload latest version** in the footer. That unregisters the service worker (`flash-v1`) and reloads. A hard refresh also works.

## No sound on iPad

iOS needs a tap before AudioContext. The first pointer/click unlocks it. Safari 16.4+ also needs `audioSession.type = 'playback'` so the hardware mute switch does not kill beeps — that is already in `js/app.js`. Try the speaker button (🔊) after a tap.

## Records vanished

They live in `localStorage` under `calcul-flash-records`. A private window, another browser, or clearing site data wipes them. They are not on a server.

## Comma vs period

The pad uses a comma (French decimal). A keyboard period is accepted and stored as a comma.
