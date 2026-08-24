# How it works

A round is a countdown (45 s / 60 s / 2 min). Each correct answer scores speed + level, multiplied by the streak (×2 from 5 in a row, ×3 from 9). A miss resets the streak and shaves a few seconds (2 / 3 / 4 depending on difficulty).

## Age and difficulty

Starting palier (level) follows age: 8–9 → 1, 10–11 → 2, 12 → 3, 13–14 → 4. Easy starts one below, Expert one above, all capped at 6. The generators in `js/generate.js` read that palier.

## Pad

Digits, comma, ±, backspace, OK. A complete answer auto-submits when its length matches the expected string. Keyboard works the same.

## Recap

Parents see badges (mode, difficulty, age, palier, duration), accuracy by family, missed sums, and the slowest correct ones (> 4 s).

## Sound and fireworks

Web Audio oscillator beeps (unlocked on first tap — iOS). Canvas fireworks / stars / confetti at 95 / 90 / 80 % if the round had at least 8 questions. `prefers-reduced-motion` skips the particles.
