/** Question generators. Browser + Node (node --test). No DOM. */

/** French writing of a number. Rounds off float noise, keeps up to 4 useful decimals. */
export function fr(n) {
  const r = Math.round(n * 1e6) / 1e6;
  return (r === 0 ? 0 : r).toString().replace('.', ',');
}

export function rint(a, b, rnd = Math.random) {
  return Math.floor(rnd() * (b - a + 1)) + a;
}

export function pick(arr, rnd = Math.random) {
  return arr[Math.floor(rnd() * arr.length)];
}

export const FAM_KEYS = ['tables', 'addsub', 'comp', 'deci', 'frac', 'mes', 'malin', 'mix'];

export const FAM = {
  tables: 'Tables ×',
  addsub: 'Additions éclair',
  comp: 'Compléments',
  deci: 'Décimaux',
  frac: 'Fractions & %',
  mes: 'Mesures',
  malin: 'Calcul malin',
  mix: 'Mélange total'
};

const COPY = {
  fr: {
    half: (n) => 'La moitié de ' + n,
    quarter: (n) => 'Le quart de ' + n,
    third: (n) => 'Le tiers de ' + n,
    fracOf: (num, den, base) => num + '/' + den + ' de ' + base,
    pctOf: (p, base) => p + ' % de ' + base,
    fracDec: (n, d) => n + '/' + d + ' en décimal',
    square: (n) => 'Le carré de ' + n,
    double: (n) => 'Le double de ' + n,
    area: (c) => "Aire d'un carré de côté " + c + ' cm',
    peri: (c) => "Périmètre d'un carré de côté " + c + ' cm',
    tableOf: (a) => 'Table de ' + a,
    division: 'Division',
    addition: 'Addition',
    subtraction: 'Soustraction',
    relatives: 'Nombres relatifs',
    mul10: 'Multiplier par 10',
    mulBy: (m) => 'Multiplier par ' + m,
    tenths: 'Somme de dixièmes',
    decSum: 'Somme de décimaux',
    decMul: 'Décimal × entier',
    div10: 'Diviser par 10',
    lengths: 'Longueurs',
    masses: 'Masses',
    volumes: 'Contenances',
    durations: 'Durées',
    areaTag: 'Aire',
    periTag: 'Périmètre',
    halfTag: 'Moitié',
    quarterTag: 'Quart',
    thirdTag: 'Tiers',
    fracTag: "Fraction d'un nombre",
    pctTag: 'Pourcentage',
    fracDecTag: 'Fraction → décimal',
    squareTag: 'Carré',
    doubleTag: 'Double',
    x5: '× 5 : la moitié, puis × 10',
    x25: '× 25 : le quart, puis × 100',
    x9: '× 9 : × 10, puis on retire n',
    x11: '× 11 : × 10, puis on ajoute n',
    x20: '× 20 : × 2, puis × 10',
    near100: 'Ajouter presque 100',
    comp10: 'Complément à 10',
    comp20: 'Complément à 20',
    comp50: 'Complément à 50',
    comp100: 'Complément à 100',
    comp200: 'Complément à 200',
    comp500: 'Complément à 500',
    comp1000: 'Complément à 1000',
    comp1: 'Complément à 1',
    compDec: 'Complément décimal',
    digitOf: (n, place) => 'Dans ' + n + ', le chiffre des ' + place + ' ?',
    countOf: (n, unit) => 'Dans ' + n + ', le nombre ' + unit + ' ?',
    assemble: (clues) => 'Écris : ' + clues,
    largest: (a, b) => 'Le plus grand : ' + a + ' ou ' + b + ' ?',
    fracNum: (dec, den) => dec + ' = ? / ' + den,
    roundDown: (n) => "Arrondi à l'unité par défaut de " + n,
    roundUp: (n) => "Arrondi à l'unité par excès de " + n,
    truncate: (n) => "Troncature à l'unité de " + n,
    digitTag: 'Chiffre des rangs',
    countTag: 'Nombre de …',
    assembleTag: 'Nombre mystère',
    largestTag: 'Comparer des décimaux',
    fracNumTag: 'Fraction décimale',
    roundTag: "Arrondi à l'unité",
    truncTag: "Troncature à l'unité",
    alignTag: 'Virgules à aligner'
  },
  en: {
    half: (n) => 'Half of ' + n,
    quarter: (n) => 'A quarter of ' + n,
    third: (n) => 'A third of ' + n,
    fracOf: (num, den, base) => num + '/' + den + ' of ' + base,
    pctOf: (p, base) => p + '% of ' + base,
    fracDec: (n, d) => n + '/' + d + ' as a decimal',
    square: (n) => 'The square of ' + n,
    double: (n) => 'Double ' + n,
    area: (c) => 'Area of a square of side ' + c + ' cm',
    peri: (c) => 'Perimeter of a square of side ' + c + ' cm',
    tableOf: (a) => 'Times table ' + a,
    division: 'Division',
    addition: 'Addition',
    subtraction: 'Subtraction',
    relatives: 'Negative numbers',
    mul10: 'Multiply by 10',
    mulBy: (m) => 'Multiply by ' + m,
    tenths: 'Sum of tenths',
    decSum: 'Sum of decimals',
    decMul: 'Decimal × whole number',
    div10: 'Divide by 10',
    lengths: 'Lengths',
    masses: 'Masses',
    volumes: 'Volumes',
    durations: 'Durations',
    areaTag: 'Area',
    periTag: 'Perimeter',
    halfTag: 'Half',
    quarterTag: 'Quarter',
    thirdTag: 'Third',
    fracTag: 'Fraction of a number',
    pctTag: 'Percentage',
    fracDecTag: 'Fraction → decimal',
    squareTag: 'Square',
    doubleTag: 'Double',
    x5: '× 5: half, then × 10',
    x25: '× 25: a quarter, then × 100',
    x9: '× 9: × 10, then subtract n',
    x11: '× 11: × 10, then add n',
    x20: '× 20: × 2, then × 10',
    near100: 'Add almost 100',
    comp10: 'Make 10',
    comp20: 'Make 20',
    comp50: 'Make 50',
    comp100: 'Make 100',
    comp200: 'Make 200',
    comp500: 'Make 500',
    comp1000: 'Make 1000',
    comp1: 'Make 1',
    compDec: 'Decimal complement',
    digitOf: (n, place) => 'In ' + n + ', the ' + place + ' digit?',
    countOf: (n, unit) => 'In ' + n + ', how many ' + unit + '?',
    assemble: (clues) => 'Write: ' + clues,
    largest: (a, b) => 'Which is larger: ' + a + ' or ' + b + '?',
    fracNum: (dec, den) => dec + ' = ? / ' + den,
    roundDown: (n) => 'Round ' + n + ' down to the unit',
    roundUp: (n) => 'Round ' + n + ' up to the unit',
    truncate: (n) => 'Truncate ' + n + ' to the unit',
    digitTag: 'Digit in a place',
    countTag: 'How many units',
    assembleTag: 'Mystery number',
    largestTag: 'Compare decimals',
    fracNumTag: 'Decimal fraction',
    roundTag: 'Round to the unit',
    truncTag: 'Truncate to the unit',
    alignTag: 'Line up the commas'
  }
};

function L(lang) {
  return COPY[lang] || COPY.fr;
}

/** Two writings: « 43 + ? = 100 » or « ? + 43 = 100 ». */
export function complementQuestion(n, target, tag, rnd = Math.random) {
  const a = Math.round((target - n) * 100) / 100;
  return rnd() < 0.35
    ? { t: '? + ' + fr(n) + ' = ' + fr(target), a, tag }
    : { t: fr(n) + ' + ? = ' + fr(target), a, tag };
}

/* ---------- decimal place value (French 6e) ---------- */

/** Named places, most significant first. rank = power of ten. */
const PLACES = [
  { rank: 3, fr: 'milliers', fr1: 'millier', en: 'thousands', en1: 'thousand' },
  { rank: 2, fr: 'centaines', fr1: 'centaine', en: 'hundreds', en1: 'hundred' },
  { rank: 1, fr: 'dizaines', fr1: 'dizaine', en: 'tens', en1: 'ten' },
  { rank: 0, fr: 'unités', fr1: 'unité', en: 'units', en1: 'unit' },
  { rank: -1, fr: 'dixièmes', fr1: 'dixième', en: 'tenths', en1: 'tenth' },
  { rank: -2, fr: 'centièmes', fr1: 'centième', en: 'hundredths', en1: 'hundredth' },
  { rank: -3, fr: 'millièmes', fr1: 'millième', en: 'thousandths', en1: 'thousandth' },
  { rank: -4, fr: 'dix-millièmes', fr1: 'dix-millième', en: 'ten-thousandths', en1: 'ten-thousandth' }
];
const PLACE_BY_RANK = {};
PLACES.forEach((p) => { PLACE_BY_RANK[p.rank] = p; });

/** Plural by default; French keeps the singular after 0 and 1. */
function placeWord(rank, lang, count) {
  const p = PLACE_BY_RANK[rank];
  if (lang === 'en') return count === 1 ? p.en1 : p.en;
  return count != null && count <= 1 ? p.fr1 : p.fr;
}

function frDe(word) {
  return /^[aeiouéèêh]/.test(word) ? "d'" + word : 'de ' + word;
}

/** A number kept as digits so prompts, answers and place lookups never drift. */
function digitsToNumber(int, dec) {
  const s = int.join('') + (dec.length ? ',' + dec.join('') : '');
  return { s, v: parseFloat(s.replace(',', '.')), int, dec };
}

function intDigits(len, rnd) {
  const d = [rint(1, 9, rnd)];
  for (let i = 1; i < len; i++) d.push(rint(0, 9, rnd));
  return d;
}

/** Last digit is never 0: the written form stays canonical, so fr(v) === s. */
function decDigits(len, rnd) {
  const d = [];
  for (let i = 0; i < len; i++) d.push(rint(0, 9, rnd));
  if (len) d[len - 1] = rint(1, 9, rnd);
  return d;
}

function randomNumber(intLen, decLen, rnd) {
  return digitsToNumber(intDigits(intLen, rnd), decDigits(decLen, rnd));
}

function digitAt(n, rank) {
  return rank >= 0 ? n.int[n.int.length - 1 - rank] : n.dec[-rank - 1];
}

/** How many whole units of that rank the number holds (89124,756 → 89 milliers). */
function countAt(n, rank) {
  return parseInt(n.int.concat(n.dec).slice(0, n.int.length - rank).join(''), 10);
}

/** Ranks that have a name and a digit in this number. */
function namedRanks(n) {
  return PLACES
    .map((p) => p.rank)
    .filter((r) => (r >= 0 ? r <= n.int.length - 1 : -r <= n.dec.length));
}

function shuffle(arr, rnd) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function weighted(pairs, rnd) {
  let total = 0;
  for (const p of pairs) total += p[1];
  let x = rnd() * total;
  for (const p of pairs) {
    x -= p[1];
    if (x < 0) return p[0];
  }
  return pairs[pairs.length - 1][0];
}

/**
 * 1 = starter (age ≤ 9 or level 1), 2 = 6e core, 3 = 5e and above.
 * Difficulty nudges one step, never above the starter tier for the youngest.
 */
function pvTier(level, ctx) {
  let t = ctx.age <= 9 || level <= 1 ? 1 : ctx.age >= 12 || level >= 4 ? 3 : 2;
  if (ctx.diff === 'expert' && ctx.age >= 10 && level >= 2) t = Math.min(3, t + 1);
  if (ctx.diff === 'facile') t = Math.max(1, t - 1);
  return t;
}

/** Share of the deci mode spent on place value; the rest stays classic ×10 / ÷10. */
function pvShare(level, ctx) {
  if (ctx.age <= 9 || level <= 1) return 0.20;
  return ctx.age >= 12 || level >= 4 ? 0.45 : 0.38;
}

/** A — the digit written at a named place. */
function gPvDigit(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  let n, ranks;
  if (tier === 1) {
    n = randomNumber(rint(2, 3, rnd), 0, rnd);
    ranks = [0, 1];
  } else if (tier === 2) {
    n = randomNumber(rint(2, 4, rnd), rint(1, 3, rnd), rnd);
    ranks = namedRanks(n);
  } else {
    n = randomNumber(rint(3, 6, rnd), rint(2, 4, rnd), rnd);
    ranks = namedRanks(n);
  }
  const rank = pick(ranks, rnd);
  return {
    t: C.digitOf(n.s, placeWord(rank, ctx.lang)),
    a: digitAt(n, rank),
    tag: C.digitTag
  };
}

/** B — how many whole units of that rank. Never the same question as A. */
function gPvCount(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  let n, allow;
  if (tier === 1) {
    n = randomNumber(rint(2, 3, rnd), rnd() < 0.5 ? 1 : 0, rnd);
    allow = [0, 1, 2];
  } else if (tier === 2) {
    n = randomNumber(rint(2, 4, rnd), rint(1, 2, rnd), rnd);
    allow = [0, 1, 2, 3, -1];
  } else {
    n = randomNumber(rint(3, 5, rnd), rint(1, 3, rnd), rnd);
    allow = [0, 1, 2, 3, -1, -2];
  }
  const ranks = namedRanks(n)
    .filter((r) => allow.indexOf(r) !== -1 && String(countAt(n, r)).length <= 6);
  /** Two digits at least, so the count is never just the digit sitting there. */
  const telling = ranks.filter((r) => countAt(n, r) >= 10);
  const rank = pick(telling.length ? telling : ranks, rnd);
  const word = placeWord(rank, ctx.lang);
  return {
    t: C.countOf(n.s, ctx.lang === 'en' ? word : frDe(word)),
    a: countAt(n, rank),
    tag: C.countTag
  };
}

/** C — write the number described by its places (nombre mystère). */
function gPvAssemble(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const k = tier === 1 ? 3 : tier === 2 ? rint(3, 4, rnd) : rint(4, 5, rnd);
  const maxDec = tier === 1 ? 2 : tier === 2 ? 3 : 4;
  const lows = [];
  for (let b = -1; b >= -maxDec; b--) if (b + k - 1 >= 0) lows.push(b);
  const bottom = pick(lows, rnd);
  const top = bottom + k - 1;

  const digits = {};
  const ranks = [];
  for (let r = top; r >= bottom; r--) { digits[r] = rint(0, 9, rnd); ranks.push(r); }
  digits[top] = rint(1, 9, rnd);
  digits[bottom] = rint(1, 9, rnd);

  const gap = tier === 1 ? 0 : tier === 2 ? 0.25 : 0.35;
  if (ranks.length > 3 && rnd() < gap) {
    const idx = rint(1, ranks.length - 2, rnd);
    digits[ranks[idx]] = 0;
    ranks.splice(idx, 1);
  }

  const int = [], dec = [];
  for (let r = top; r >= 0; r--) int.push(digits[r]);
  for (let r = -1; r >= bottom; r--) dec.push(digits[r]);
  const n = digitsToNumber(int, dec);

  const order = tier === 1 ? ranks : rnd() < (tier === 2 ? 0.2 : 0.35) ? shuffle(ranks.slice(), rnd) : ranks;
  const clues = order
    .map((r) => digits[r] + ' ' + placeWord(r, ctx.lang, digits[r]))
    .join(', ');
  return { t: C.assemble(clues), a: n.v, tag: C.assembleTag };
}

/** D — compare two decimals, often of different lengths. */
function gPvCompare(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const iLen = tier === 1 ? 1 : rint(1, 2, rnd);
  const maxDec = Math.min(tier === 1 ? 2 : tier === 2 ? 3 : 4, 5 - iLen);
  let la = rint(1, maxDec, rnd);
  let lb = rint(1, maxDec, rnd);
  if (tier > 1 && la === lb && rnd() < 0.7) lb = la === maxDec ? Math.max(1, la - 1) : la + 1;
  const sameInt = rnd() < 0.7;

  let a, b, guard = 0;
  do {
    const ia = intDigits(iLen, rnd);
    const ib = sameInt ? ia.slice() : intDigits(iLen, rnd);
    a = digitsToNumber(ia, decDigits(la, rnd));
    b = digitsToNumber(ib, decDigits(lb, rnd));
    guard++;
  } while (a.v === b.v && guard < 12);
  if (a.v === b.v) {
    const dec = b.dec.slice();
    dec[dec.length - 1] = (dec[dec.length - 1] % 9) + 1;
    b = digitsToNumber(b.int, dec);
  }
  return { t: C.largest(a.s, b.s), a: Math.max(a.v, b.v), tag: C.largestTag };
}

/** E — the numerator of the decimal fraction: 7,892 = ? / 1000. */
function gPvFracNum(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const k = tier === 1 ? pick([1, 2], rnd) : tier === 2 ? pick([2, 3], rnd) : pick([2, 3, 4], rnd);
  const zeroInt = tier > 1 && rnd() < 0.3;
  const int = zeroInt ? [0] : intDigits(k >= 4 ? 1 : rint(1, 2, rnd), rnd);
  const dec = decDigits(k, rnd);
  if (zeroInt) dec[0] = rint(1, 9, rnd);
  const n = digitsToNumber(int, dec);
  return {
    t: C.fracNum(n.s, Math.pow(10, k)),
    a: parseInt(int.join('') + dec.join(''), 10),
    tag: C.fracNumTag
  };
}

/** F — arrondi par défaut / par excès / troncature à l'unité. Numbers stay positive. */
function gPvRound(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const n = randomNumber(rint(1, tier === 1 ? 2 : 3, rnd), rint(1, tier === 3 ? 3 : 2, rnd), rnd);
  const floor = parseInt(n.int.join(''), 10);
  if (tier === 3 && rnd() < 0.35) return { t: C.roundUp(n.s), a: floor + 1, tag: C.roundTag };
  if (rnd() < 0.35) return { t: C.truncate(n.s), a: floor, tag: C.truncTag };
  return { t: C.roundDown(n.s), a: floor, tag: C.roundTag };
}

const PV_WEIGHTS = {
  1: [[gPvDigit, 40], [gPvCount, 15], [gPvAssemble, 20], [gPvCompare, 15], [gPvFracNum, 10]],
  2: [[gPvDigit, 26], [gPvCount, 18], [gPvAssemble, 18], [gPvCompare, 16], [gPvFracNum, 12], [gPvRound, 10]],
  3: [[gPvDigit, 20], [gPvCount, 20], [gPvAssemble, 18], [gPvCompare, 16], [gPvFracNum, 14], [gPvRound, 12]]
};

function gPlaceValue(level, ctx) {
  const tier = pvTier(level, ctx);
  return weighted(PV_WEIGHTS[tier], ctx.rnd)(tier, ctx);
}

function gTables(level, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const hi = level <= 1 ? 8 : level <= 2 ? 9 : level <= 3 ? 10 : 12;
  let a = rint(2, hi, rnd), b = rint(2, hi, rnd);
  if (level <= 2 && rnd() < 0.18) {
    const n = rint(2, 19, rnd), m = pick([10, 2, 5], rnd);
    return { t: n + ' × ' + m, a: n * m, tag: C.tableOf(m) };
  }
  if (level >= 3 && rnd() < (level >= 6 ? 0.35 : 0.30)) {
    const p = a * b;
    return { t: fr(p) + ' ÷ ' + a, a: b, tag: C.division };
  }
  if (level >= 4 && rnd() < (level >= 6 ? 0.40 : 0.20)) {
    a = rint(11, level >= 6 ? 19 : 15, rnd);
    b = rint(3, 9, rnd);
  }
  return { t: a + ' × ' + b, a: a * b, tag: C.tableOf(a) };
}

function gAddSub(level, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  let a, b;
  if (level <= 1) { a = rint(11, 49, rnd); b = rint(2, 9, rnd); }
  else if (level <= 2) { a = rint(15, 79, rnd); b = rint(6, 29, rnd); }
  else if (level <= 3) { a = rint(24, 99, rnd); b = rint(12, 79, rnd); }
  else if (level <= 5) { a = rint(105, 499, rnd); b = rint(21, 199, rnd); }
  else { a = rint(205, 899, rnd); b = rint(105, 499, rnd); }
  if (rnd() < 0.5) return { t: a + ' + ' + b, a: a + b, tag: C.addition };
  if (ctx.diff === 'expert' && level >= 5 && ctx.age >= 11 && rnd() < 0.30) {
    const x = rint(2, 12, rnd), y = rint(x + 1, 19, rnd);
    return { t: x + ' − ' + y, a: x - y, tag: C.relatives };
  }
  const [x, y] = a >= b ? [a, b] : [b, a];
  return { t: x + ' − ' + y, a: x - y, tag: C.subtraction };
}

function gComp(level, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const r = rnd();
  if (level <= 1) {
    if (r < 0.4) return complementQuestion(rint(2, 9, rnd), 10, C.comp10, rnd);
    if (r < 0.75) return complementQuestion(rint(2, 19, rnd), 20, C.comp20, rnd);
    return complementQuestion(rint(5, 45, rnd), 50, C.comp50, rnd);
  }
  if (level <= 3 || ctx.age <= 9) {
    if (r < 0.55) return complementQuestion(rint(12, 97, rnd), 100, C.comp100, rnd);
    if (r < 0.8) return complementQuestion(rint(3, 47, rnd), 50, C.comp50, rnd);
    return complementQuestion(rint(21, 199, rnd), 200, C.comp200, rnd);
  }
  if (ctx.age >= 10 && level >= 4 && r < 0.28) {
    const hundredths = level >= 5 || ctx.diff === 'expert';
    return complementQuestion(
      hundredths ? rint(5, 95, rnd) / 100 : rint(1, 9, rnd) / 10,
      1,
      C.comp1,
      rnd
    );
  }
  if (r < 0.45) return complementQuestion(rint(105, 985, rnd), 1000, C.comp1000, rnd);
  if (r < 0.70) return complementQuestion(rint(12, 97, rnd), 100, C.comp100, rnd);
  if (r < 0.85) return complementQuestion(rint(210, 490, rnd), 500, C.comp500, rnd);
  if (ctx.age <= 10) return complementQuestion(rint(105, 985, rnd), 1000, C.comp1000, rnd);
  return complementQuestion(rint(1, 19, rnd) / 2, 10, C.compDec, rnd);
}

function gFrac(level, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  if (ctx.age <= 9 || level <= 1) {
    const n = rint(2, 25, rnd) * 4;
    return rnd() < 0.5
      ? { t: C.half(n), a: n / 2, tag: C.halfTag }
      : { t: C.quarter(n), a: n / 4, tag: C.quarterTag };
  }
  const r = rnd();
  if (r < 0.38) {
    const [num, den] = pick([[1, 2], [1, 4], [3, 4], [1, 3], [2, 3], [1, 5], [2, 5], [1, 10], [3, 10]], rnd);
    const base = den * rint(2, level >= 4 ? 24 : 9, rnd);
    return { t: C.fracOf(num, den, base), a: base * num / den, tag: C.fracTag };
  }
  if (r < 0.78) {
    const p = level <= 3 ? pick([10, 50, 25, 20], rnd) : pick([10, 50, 25, 20, 75, 5, 15, 30], rnd);
    const base = rint(2, level >= 4 ? 40 : 16, rnd) * (p === 15 || p === 5 ? 20 : p === 75 || p === 25 ? 4 : 10);
    return { t: C.pctOf(p, base), a: Math.round(base * p) / 100, tag: C.pctTag };
  }
  if (r < 0.9) {
    const n = rint(2, 20, rnd) * 5;
    return { t: C.third(n * 3), a: n, tag: C.thirdTag };
  }
  const d = pick([[1, 2, 0.5], [1, 4, 0.25], [3, 4, 0.75], [1, 5, 0.2], [1, 10, 0.1], [3, 5, 0.6]], rnd);
  return { t: C.fracDec(d[0], d[1]), a: d[2], tag: C.fracDecTag };
}

function gMes(level, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const easy = ctx.age <= 9 || level <= 2;
  const r = rnd();
  if (r < 0.22) {
    const n = easy ? rint(2, 9, rnd) : rint(11, 99, rnd) / 10;
    return { t: fr(n) + ' m = ? cm', a: Math.round(n * 100), tag: C.lengths };
  }
  if (r < 0.40) {
    const n = easy ? rint(2, 9, rnd) : rint(11, 95, rnd) / 10;
    return { t: fr(n) + ' km = ? m', a: Math.round(n * 1000), tag: C.lengths };
  }
  if (r < 0.55) {
    const n = easy ? rint(2, 9, rnd) * 100 : rint(15, 480, rnd) * 10;
    return { t: n + ' cm = ? m', a: Math.round(n) / 100, tag: C.lengths };
  }
  if (r < 0.70) {
    const n = easy ? rint(2, 9, rnd) : rint(11, 95, rnd) / 10;
    return { t: fr(n) + ' kg = ? g', a: Math.round(n * 1000), tag: C.masses };
  }
  if (r < 0.82) {
    const n = easy ? rint(2, 9, rnd) : rint(11, 95, rnd) / 10;
    return { t: fr(n) + ' L = ? mL', a: Math.round(n * 1000), tag: C.volumes };
  }
  if (r < 0.92) {
    const h = rint(1, 5, rnd), m = pick([15, 30, 45, 10, 20, 40], rnd);
    return { t: h + ' h ' + m + ' = ? min', a: h * 60 + m, tag: C.durations };
  }
  if (level >= 3) {
    const c = rint(3, 15, rnd);
    return rnd() < 0.5
      ? { t: C.area(c), a: c * c, tag: C.areaTag }
      : { t: C.peri(c), a: 4 * c, tag: C.periTag };
  }
  const n = rint(2, 9, rnd) * 60;
  return { t: n + ' min = ? h', a: n / 60, tag: C.durations };
}

function gMalin(level, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const r = rnd();
  if (r < 0.14) {
    const n = rint(3, level >= 4 ? 19 : 12, rnd);
    return { t: C.square(n), a: n * n, tag: C.squareTag };
  }
  if (r < 0.28) {
    const n = level <= 2 ? rint(12, 49, rnd) : rint(24, 199, rnd);
    return { t: n + ' × 5', a: n * 5, tag: C.x5 };
  }
  if (r < 0.40) {
    const n = rint(4, level >= 4 ? 48 : 24, rnd);
    return { t: n + ' × 25', a: n * 25, tag: C.x25 };
  }
  if (r < 0.52) {
    const n = rint(12, level >= 4 ? 98 : 49, rnd);
    return { t: n + ' × 9', a: n * 9, tag: C.x9 };
  }
  if (r < 0.64) {
    const n = rint(12, level >= 4 ? 89 : 49, rnd);
    return { t: n + ' × 11', a: n * 11, tag: C.x11 };
  }
  if (r < 0.74) {
    const n = level <= 2 ? rint(11, 99, rnd) : rint(105, 999, rnd);
    return { t: C.double(n), a: n * 2, tag: C.doubleTag };
  }
  if (r < 0.84) {
    const n = (level <= 2 ? rint(11, 99, rnd) : rint(105, 499, rnd)) * 2;
    return { t: C.half(n), a: n / 2, tag: C.halfTag };
  }
  if (r < 0.92) {
    const n = rint(105, 899, rnd), m = pick([99, 98, 101, 102], rnd);
    return { t: n + ' + ' + m, a: n + m, tag: C.near100 };
  }
  const n = rint(12, level >= 4 ? 89 : 39, rnd);
  return { t: n + ' × 20', a: n * 20, tag: C.x20 };
}

function gDeci(level, ctx) {
  if (ctx.rnd() < pvShare(level, ctx)) return gPlaceValue(level, ctx);
  return gClassicDeci(level, ctx);
}

function gClassicDeci(level, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  if (ctx.age <= 9) {
    const r = rnd();
    if (r < 0.4) {
      const n = rint(3, 49, rnd);
      return { t: n + ' × 10', a: n * 10, tag: C.mul10 };
    }
    if (r < 0.7) {
      const n = rint(2, 9, rnd) / 10, m = rint(2, 9, rnd) / 10;
      return { t: fr(n) + ' + ' + fr(m), a: Math.round((n + m) * 10) / 10, tag: C.tenths };
    }
    const n = rint(3, 25, rnd);
    return { t: C.half(n * 2), a: n, tag: C.halfTag };
  }
  const r = rnd();
  if (level <= 1 || r < 0.28) {
    const n = rint(11, 99, rnd) / 10, m = pick([10, 100], rnd);
    return { t: fr(n) + ' × ' + m, a: n * m, tag: C.mulBy(m) };
  }
  if (r < 0.52) {
    const n = rint(2, 9, rnd) / 10, m = rint(2, 9, rnd) / 10;
    return { t: fr(n) + ' + ' + fr(m), a: Math.round((n + m) * 10) / 10, tag: C.decSum };
  }
  if (r < 0.70) {
    const n = rint(11, 89, rnd) / 10, m = rint(2, 6, rnd);
    return { t: fr(n) + ' × ' + m, a: Math.round(n * m * 10) / 10, tag: C.decMul };
  }
  if (r < 0.80) {
    const n = rint(105, 995, rnd) / 10;
    return { t: fr(n) + ' ÷ 10', a: Math.round(n * 10) / 100, tag: C.div10 };
  }
  if (r < 0.90) {
    const la = rint(1, 2, rnd);
    const a = digitsToNumber(intDigits(1, rnd), decDigits(la, rnd));
    const b = digitsToNumber([0], decDigits(Math.min(3, la + rint(1, 2, rnd)), rnd));
    return { t: a.s + ' + ' + b.s, a: Math.round((a.v + b.v) * 1e6) / 1e6, tag: C.alignTag };
  }
  if (r < 0.96) {
    return complementQuestion(rint(5, 95, rnd) / 100, 1, C.comp1, rnd);
  }
  const n = rint(3, 49, rnd) / 2;
  return { t: C.half(fr(n * 2)), a: n, tag: C.halfTag };
}

const FAMILY_FNS = {
  tables: gTables,
  addsub: gAddSub,
  comp: gComp,
  deci: gDeci,
  frac: gFrac,
  mes: gMes,
  malin: gMalin
};

const MIX_BAG = ['tables', 'tables', 'addsub', 'addsub', 'comp', 'deci', 'frac', 'mes', 'malin', 'malin'];

/**
 * @param {number} level 1–6
 * @param {{mode?:string,diff?:string,age?:number,lang?:string,random?:()=>number}} [ctx]
 */
export function generateQuestion(level, ctx = {}) {
  const rnd = ctx.random || Math.random;
  const mode = ctx.mode || 'tables';
  const inner = {
    rnd,
    mode,
    diff: ctx.diff || 'moyen',
    age: ctx.age == null ? 11 : ctx.age,
    lang: ctx.lang || 'fr'
  };
  const famKey = mode === 'mix' ? pick(MIX_BAG, rnd) : mode;
  const fn = FAMILY_FNS[famKey] || gDeci;
  const q = fn(level, inner);
  q.famKey = famKey;
  q.fam = FAM[famKey];
  return q;
}
