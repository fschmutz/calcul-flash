# Modes

| Key | What |
| --- | --- |
| `tables` | Times tables to 12, inverse division |
| `addsub` | Addition and subtraction; Expert can go negative |
| `comp` | Complements to 10, 20, 50, 100, 200, 500, 1000, 1 |
| `deci` | ×10 / ×100, ÷10, tenths, decimal × whole, ragged sums, make 1 — and the whole 6e place-value family (see below) |
| `frac` | Halves, quarters, thirds, n/d of a number, percentages |
| `mes` | m↔cm, km↔m, kg↔g, L↔mL, hours, square area/perimeter |
| `malin` | Squares, ×5 / ×9 / ×11 / ×25 / ×20, doubles, +99 |
| `mix` | Weighted draw from the seven families |

Copy is French by default; the English toggle translates UI and worded prompts (`Half of…`, `Make 100`).

## `deci` — decimal place value (French 6e)

Roughly 38–45 % of the mode from age 10 (20 % at age ≤ 9 or level 1) is place-value work; the rest stays classic
×10 / ÷10 / tenths so the drill keeps its arcade rhythm. Six item types, all answered on the number pad:

| Type | Prompt (FR) | Prompt (EN) | Answer |
| --- | --- | --- | --- |
| A — chiffre des | `Dans 9090,69, le chiffre des dixièmes ?` | `In 9090,69, the tenths digit?` | one digit, `6` |
| B — nombre de | `Dans 327,7, le nombre de dizaines ?` | `In 327,7, how many tens?` | the count, `32` |
| C — nombre mystère | `Écris : 6 dizaines, 2 unités, 9 dixièmes` | `Write: 6 tens, 2 units, 9 tenths` | `62,9` |
| D — comparer | `Le plus grand : 7,39 ou 7,425 ?` | `Which is larger: 7,39 or 7,425?` | `7,425` |
| E — fraction décimale | `7,892 = ? / 1000` | same | the numerator, `7892` |
| F — arrondi / troncature | `Arrondi à l'unité par défaut de 2,41` | `Round 2,41 down to the unit` | `2` |

A and B are deliberately never conflated: A always answers a single digit, B always answers a count of at least two
digits (the generator avoids the leading place, where the two coincide).

**Rounding convention.** Every F number is positive, so *arrondi à l'unité par défaut* and *troncature à l'unité*
are the same value — the floor (2,41 → 2), exactly as in the 6e exercise books. *Arrondi à l'unité par excès*
(the ceiling) only appears at the top tier. There is no "round to nearest" item: the pad cannot show the
tie-breaking rule, so it would just be a guess.

### Calibration

Three tiers. `facile` moves one tier down, `expert` one tier up (never for age ≤ 9).

| Tier | Who | A places | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | age ≤ 9, or level 1 | unités, dizaines (whole numbers) | up to centaines | 3 clues, ≤ 2 decimals | 1–2 decimals | `/10`, `/100` | — |
| 2 | age 10–11, levels 2–3 | unités → milliers, dixièmes → millièmes | up to milliers, plus dixièmes | 3–4 clues, ≤ 3 decimals, zeros and gaps | unequal lengths, ≤ 3 decimals | `/100`, `/1000` | ~10 %, floor only |
| 3 | age ≥ 12, or levels 4–6 | adds dix-millièmes and 5–6 digit integers | adds centièmes, counts to 999 999 | 4–5 clues, ≤ 4 decimals, clues shuffled | ≤ 4 decimals | up to `/10000` | ~12 %, adds *par excès* |

Answers never exceed six characters, because that is what the pad accepts (`7,425`, `891247`, `0,58`).
