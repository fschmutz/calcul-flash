# Changelog

## 2026.09.24.1

Comparing two decimals is now a tap, not a typing exercise. `Le plus grand : 7,39 ou 7,425 ?` already prints
both numbers, so the pad and the typing display step aside and the two decimals become two big buttons in
random order; one tap answers, with the same fireworks, the same score and the same seconds lost on a miss.
Generators may now attach `choices` — `{ v, label }` options, exactly one worth the answer — and the round
loop wires them up once, so the next pick-one item needs no UI work. Everything else is still typed on the
six-key pad, keyboard included. Keys `1` and `2` pick a choice, and the buttons are real buttons: Tab to
them, Enter or Space to answer.

## 2026.09.23.2

`deci` grows past place value: *arrondi / troncature* now also cut at the dixième and the centième, × and
÷ by 0,1 / 0,01 / 0,001 are first-class items, and four new families join the mix — euros ↔ centimes, the
gap between two ragged decimals (`87,9 − 86,989`), the midpoint of two decimals, and a fraction bridge
whose denominators are never powers of ten (`0,75 = ? / 4`).

`mes` is rebuilt into four capped buckets — units, money, time, geometry. Time goes beyond `h + m → min`:
minutes ↔ hours in quarters, minutes ↔ seconds, added durations (`1 h 45 + 35 min = ? min`) and the gap
between two clock times (`De 14 h 37 à 15 h = ? min`). Geometry adds rectangle area and perimeter,
triangle perimeter, and half-base-times-height at the top tier. Every answer is still one number on the
numeric pad, ≤ 6 characters, and every family is graded across ages 8–14, levels 1–6, FR and EN.

## 2026.09.23.1

`deci` now covers the French 6ème decimal place-value programme: *chiffre des* vs *nombre de*, writing a number from
its places, comparing decimals of different lengths, decimal fraction numerators, and *arrondi / troncature à
l'unité*. Graded across ages 8–14 and levels 1–6, FR and EN, answers still numeric-pad only. `comp` gets more
*complément à 1*. Worded prompts scale down instead of spilling off the question card.

## 2026.08.24.1

First public GitHub Pages app: arcade mental math, EN/FR, self-hosted fonts, PWA, local records, MIT.
