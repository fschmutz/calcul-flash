# Modes

| Key | What |
| --- | --- |
| `tables` | Times tables to 12, inverse division |
| `addsub` | Addition and subtraction; Expert can go negative |
| `comp` | Complements to 10, 20, 50, 100, 200, 500, 1000, 1 |
| `deci` | ×10 / ×100, ÷10, × and ÷ by 0,1 / 0,01 / 0,001, tenths, decimal × whole, ragged sums, make 1 — plus the 6e place-value family and the decimals-at-work family (see below) |
| `frac` | Halves, quarters, thirds, n/d of a number, percentages |
| `mes` | Units (m↔cm, km↔m, kg↔g, L↔mL), euros ↔ centimes, time, geometry (see below) |
| `malin` | Squares, ×5 / ×9 / ×11 / ×25 / ×20, doubles, +99 |
| `mix` | Weighted draw from the seven families |

Copy is French by default; the English toggle translates UI and worded prompts (`Half of…`, `Make 100`).
Numbers keep the French comma in both languages, because that is the only decimal separator the pad types.

**The pad is the contract.** Every answer is a single number of at most six characters, digits, one comma
and an optional minus. No item may ask for two fields (`2 h 20`), a unit, a word, or a click.

## `deci`

Three families share the mode. The draw is: place value first, then decimals-at-work, then classic.

| Family | age ≤ 9 or level 1 | age 10–11, levels 2–3 | age ≥ 12 or levels 4–6 |
| --- | --- | --- | --- |
| Place value (A–F) | 20 % | 38 % | 45 % |
| Decimals at work (G–K) | 20 % | 20 % | 20 % |
| Classic ×10 / ÷10 / tenths / make 1 | 60 % | 42 % | 35 % |

The classic share also carries item H (× and ÷ by 0,1), at ~14 % of it from tier 2.

### A–F — decimal place value (French 6e)

| Type | Prompt (FR) | Prompt (EN) | Answer |
| --- | --- | --- | --- |
| A — chiffre des | `Dans 9090,69, le chiffre des dixièmes ?` | `In 9090,69, the tenths digit?` | one digit, `6` |
| B — nombre de | `Dans 327,7, le nombre de dizaines ?` | `In 327,7, how many tens?` | the count, `32` |
| C — nombre mystère | `Écris : 6 dizaines, 2 unités, 9 dixièmes` | `Write: 6 tens, 2 units, 9 tenths` | `62,9` |
| D — comparer | `Le plus grand : 7,39 ou 7,425 ?` | `Which is larger: 7,39 or 7,425?` | `7,425` |
| E — fraction décimale | `7,892 = ? / 1000` | same | the numerator, `7892` |
| F — arrondi / troncature | `Arrondi au dixième par défaut de 2,417` | `Round 2,417 down to the tenth` | `2,4` |

A and B are deliberately never conflated: A always answers a single digit, B always answers a count of at least two
digits (the generator avoids the leading place, where the two coincide).

**Rounding convention.** F cuts at the unit, the dixième or the centième. Every number is positive, so
*arrondi par défaut* and *troncature* are the same value — the floor at that place (2,417 → 2,4), exactly as in the
6e exercise books. *Arrondi par excès* (the ceiling) only appears at the top tier. There is no "round to nearest":
the pad cannot express the tie rule, so it would just be a guess. The generator always leaves at least one digit
past the cut, so the question is never already answered.

### G–K — decimals at work

| Type | Prompt (FR) | Prompt (EN) | Answer |
| --- | --- | --- | --- |
| G — euros et centimes | `3,45 € = ? centimes` / `250 centimes = ? €` | `3,45 € = ? cents` / `250 cents = ? €` | `345` / `2,5` |
| H — glisser la virgule | `4,7 × 0,1` / `3,2 ÷ 0,01` | same | `0,47` / `320` |
| I — écart | `87,9 − 86,989` | same | `0,911` |
| J — milieu | `Le milieu de 3,4 et 3,8` | `Halfway between 3,4 and 3,8` | `3,6` |
| K — décimal → fraction | `0,75 = ? / 4` | same | `3` |

**Where the fraction bridge lives, and why.** K is in `deci`, not in `frac`. It is the same printed shape as
item E (`décimal = ? / dénominateur`) with the power-of-ten restriction lifted, so the two sit next to each other
and a player meets `0,75 = ? / 100` and `0,75 = ? / 4` in the same drill — which is the whole point. `frac` keeps
the other direction (`3/4 en décimal`). Bridge denominators are never powers of ten, and are always of the form
2^a × 5^b so the decimal terminates: 2, 4, 5, 8, 16, 20, 25, 40, 50. The left side is never a whole number.

**Comma shift (H).** Computed by moving the comma on the digits, never by multiplying floats, so `5,8 × 0,001`
prints `0,0058` and not `0,0058000000000001`. Operand sizes are budgeted so the shifted answer always fits the pad.

**Gap (I).** The natural follow-up to D: the two numbers have different decimal lengths on purpose, and the
integer parts stay within 2 of each other so the difference fits the pad.

**Midpoint (J).** Built from the middle out (`middle ± step`), so the answer is always exact. Whole-number pairs
(`Le milieu de 7 et 12`) appear from tier 2; decimal pairs are the top tier's job.

### Calibration

Three tiers. `facile` moves one tier down, `expert` one tier up (never for age ≤ 9).

| Tier | Who | A places | B | C | D | E | F | G | H | I | J | K |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | age ≤ 9, or level 1 | unités, dizaines (whole numbers) | up to centaines | 3 clues, ≤ 2 decimals | 1–2 decimals | `/10`, `/100` | — | ≤ 9,75 € | — | equal lengths, ≤ 2 dec | — | — |
| 2 | age 10–11, levels 2–3 | unités → milliers, dixièmes → millièmes | up to milliers, plus dixièmes | 3–4 clues, ≤ 3 decimals, zeros and gaps | unequal lengths, ≤ 3 decimals | `/100`, `/1000` | unité, dixième; floor only | ≤ 49,99 € | ×0,1 / ×0,01, ÷ from here | ragged, ≤ 2 dec | whole pairs | /2 /4 /5 /8 /20 /25 |
| 3 | age ≥ 12, or levels 4–6 | adds dix-millièmes and 5–6 digit integers | adds centièmes, counts to 999 999 | 4–5 clues, ≤ 4 decimals, clues shuffled | ≤ 4 decimals | up to `/10000` | adds centième and *par excès* | ≤ 999,99 € | adds ×0,001 | ragged, ≤ 3 dec | decimal pairs | /4 /8 /16 /20 /25 /40 /50 |

Answers never exceed six characters, because that is what the pad accepts (`7,425`, `891247`, `0,58`).

## `mes`

Four buckets, capped so no single one takes over the round.

| Bucket | age ≤ 9 or level ≤ 2 | age 10–11, levels 3–4 | age ≥ 12 or levels 5–6 |
| --- | --- | --- | --- |
| Units — m↔cm, km↔m, kg↔g, L↔mL | 55 % | 45 % | 38 % |
| Money — euros ↔ centimes | 15 % | 14 % | 12 % |
| Time | 20 % | 24 % | 25 % |
| Geometry | 10 % | 17 % | 25 % |

`facile` and `expert` nudge the tier exactly as in `deci` (never above tier 1 for age ≤ 9). Money is the same
generator `deci` uses for item G: it is both a comma shift and a unit conversion, and one implementation means
the two modes can never drift apart.

### Time

**Answer convention.** One number, always, in the unit named by the prompt:

- `= ? min` → whole minutes. Everything that mixes hours and minutes answers here.
- `= ? h` → decimal hours, in quarters only: `3`, `2,5`, `2,25`, `2,75`. Never `2 h 15`.
- `= ? s` → whole seconds.

| Type | Prompt (FR) | Prompt (EN) | Answer |
| --- | --- | --- | --- |
| hours → minutes | `2 h 45 = ? min`, `3 h = ? min` | same | `165`, `180` |
| minutes → hours | `150 min = ? h` | same | `2,5` |
| minutes → seconds | `7 min = ? s`, `2,5 min = ? s` | same | `420`, `150` |
| seconds → minutes | `480 s = ? min` | same | `8` |
| add durations | `1 h 45 + 35 min = ? min` | same | `140` |
| between two times | `De 14 h 37 à 15 h = ? min` | `From 14:37 to 15:00 = ? min` | `23` |

Clock times are the one place where the two languages differ in shape: French writes `14 h 37` and `15 h`,
English writes `14:37` and `15:00`. Durations (`1 h 45`, `35 min`) are written the same way in both.
"How many minutes until the next hour" is not a separate item — it is the gap item with a whole hour on the
right, and it is the only shape the youngest tier ever sees. Gaps never exceed 3 hours.

### Geometry

Units stay in the prompt (cm); the answer is a bare number.

| Type | Prompt (FR) | Prompt (EN) | Answer | From |
| --- | --- | --- | --- | --- |
| square area / perimeter | `Aire d'un carré de côté 7 cm` | `Area of a square of side 7 cm` | `49` | tier 1 |
| rectangle area / perimeter | `Périmètre d'un rectangle de 9 cm sur 4 cm` | `Perimeter of a 9 cm by 4 cm rectangle` | `26` | tier 2 |
| triangle perimeter | `Périmètre d'un triangle de côtés 5, 7 et 9 cm` | `Perimeter of a triangle with sides 5, 7 and 9 cm` | `21` | tier 2 |
| right-triangle area (½ab) | `Aire d'un triangle rectangle de 7 cm sur 5 cm` | `Area of a right triangle 7 cm by 5 cm` | `17,5` | tier 3 |

Triangle sides always satisfy the triangle inequality, so the shape asked about can actually exist.
Rectangles and ½ab never reach age ≤ 9, whose geometry stays squares.
