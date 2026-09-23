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
    rectArea: (l, w) => "Aire d'un rectangle de " + l + ' cm sur ' + w + ' cm',
    rectPeri: (l, w) => "Périmètre d'un rectangle de " + l + ' cm sur ' + w + ' cm',
    triPeri: (a, b, c) => "Périmètre d'un triangle de côtés " + a + ', ' + b + ' et ' + c + ' cm',
    rightArea: (a, b) => "Aire d'un triangle rectangle de " + a + ' cm sur ' + b + ' cm',
    tableOf: (a) => 'Table de ' + a,
    division: 'Division',
    addition: 'Addition',
    subtraction: 'Soustraction',
    relatives: 'Nombres relatifs',
    mul10: 'Multiplier par 10',
    mulBy: (m) => 'Multiplier par ' + m,
    divBy: (m) => 'Diviser par ' + m,
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
    roundDown: (n, place) => 'Arrondi ' + place + ' par défaut de ' + n,
    roundUp: (n, place) => 'Arrondi ' + place + ' par excès de ' + n,
    truncate: (n, place) => 'Troncature ' + place + ' de ' + n,
    roundPlace: ["à l'unité", 'au dixième', 'au centième'],
    mid: (a, b) => 'Le milieu de ' + a + ' et ' + b,
    euroToCent: (e) => e + ' € = ? centimes',
    centToEuro: (c) => c + ' centimes = ? €',
    clockGap: (a, b) => 'De ' + a + ' à ' + b + ' = ? min',
    clock: (h, m) => (m === 0 ? h + ' h' : h + ' h ' + (m < 10 ? '0' + m : m)),
    digitTag: 'Chiffre des rangs',
    countTag: 'Nombre de …',
    assembleTag: 'Nombre mystère',
    largestTag: 'Comparer des décimaux',
    fracNumTag: 'Fraction décimale',
    roundTag: (place) => 'Arrondi ' + place,
    truncTag: (place) => 'Troncature ' + place,
    alignTag: 'Virgules à aligner',
    gapTag: 'Écart entre décimaux',
    midTag: 'Milieu de deux décimaux',
    bridgeTag: 'Décimal → fraction',
    moneyTag: 'Euros et centimes',
    minSecTag: 'Minutes et secondes',
    hourTag: 'Heures et minutes',
    addDurTag: 'Additionner des durées',
    clockGapTag: 'Entre deux heures'
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
    rectArea: (l, w) => 'Area of a ' + l + ' cm by ' + w + ' cm rectangle',
    rectPeri: (l, w) => 'Perimeter of a ' + l + ' cm by ' + w + ' cm rectangle',
    triPeri: (a, b, c) => 'Perimeter of a triangle with sides ' + a + ', ' + b + ' and ' + c + ' cm',
    rightArea: (a, b) => 'Area of a right triangle ' + a + ' cm by ' + b + ' cm',
    tableOf: (a) => 'Times table ' + a,
    division: 'Division',
    addition: 'Addition',
    subtraction: 'Subtraction',
    relatives: 'Negative numbers',
    mul10: 'Multiply by 10',
    mulBy: (m) => 'Multiply by ' + m,
    divBy: (m) => 'Divide by ' + m,
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
    roundDown: (n, place) => 'Round ' + n + ' down to the ' + place,
    roundUp: (n, place) => 'Round ' + n + ' up to the ' + place,
    truncate: (n, place) => 'Truncate ' + n + ' to the ' + place,
    roundPlace: ['unit', 'tenth', 'hundredth'],
    mid: (a, b) => 'Halfway between ' + a + ' and ' + b,
    euroToCent: (e) => e + ' € = ? cents',
    centToEuro: (c) => c + ' cents = ? €',
    clockGap: (a, b) => 'From ' + a + ' to ' + b + ' = ? min',
    clock: (h, m) => h + ':' + (m < 10 ? '0' + m : m),
    digitTag: 'Digit in a place',
    countTag: 'How many units',
    assembleTag: 'Mystery number',
    largestTag: 'Compare decimals',
    fracNumTag: 'Decimal fraction',
    roundTag: (place) => 'Round to the ' + place,
    truncTag: (place) => 'Truncate to the ' + place,
    alignTag: 'Line up the commas',
    gapTag: 'Decimal gap',
    midTag: 'Midpoint of two decimals',
    bridgeTag: 'Decimal → fraction',
    moneyTag: 'Euros and cents',
    minSecTag: 'Minutes and seconds',
    hourTag: 'Hours and minutes',
    addDurTag: 'Add durations',
    clockGapTag: 'Between two clock times'
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

/** « de » elides before a vowel: le nombre d'unités, le nombre de dizaines. */
function frDe(word) {
  return /^[aeiouéè]/.test(word) ? "d'" + word : 'de ' + word;
}

/** Value of a canonical French decimal string. */
function val(s) {
  return parseFloat(s.replace(',', '.'));
}

/**
 * Move the comma k places right (k > 0, ÷ 0,1) or left (k < 0, × 0,1) on a canonical
 * French decimal. Done on digits, not on floats, so 5,8 × 0,001 is 0,0058 and not 0,0058000000001.
 */
function shiftComma(s, k) {
  const parts = s.split(',');
  let int = parts[0].split('');
  const dec = parts[1] ? parts[1].split('') : [];
  for (let i = 0; i < Math.abs(k); i++) {
    if (k > 0) int.push(dec.length ? dec.shift() : '0');
    else dec.unshift(int.length ? int.pop() : '0');
  }
  while (int.length > 1 && int[0] === '0') int.shift();
  if (!int.length) int = ['0'];
  while (dec.length && dec[dec.length - 1] === '0') dec.pop();
  return int.join('') + (dec.length ? ',' + dec.join('') : '');
}

/** Minutes inside an hour are written on two digits: 2 h 05, never 2 h 5. */
function mm(m) {
  return m < 10 ? '0' + m : String(m);
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

/** Difficulty nudges one step, never above the starter tier for the youngest. */
function nudge(t, level, ctx) {
  if (ctx.diff === 'expert' && ctx.age >= 10 && level >= 2) t = Math.min(3, t + 1);
  if (ctx.diff === 'facile') t = Math.max(1, t - 1);
  return t;
}

/** 1 = starter (age ≤ 9 or level 1), 2 = 6e core, 3 = 5e and above. */
function pvTier(level, ctx) {
  return nudge(ctx.age <= 9 || level <= 1 ? 1 : ctx.age >= 12 || level >= 4 ? 3 : 2, level, ctx);
}

/** Same ladder for measures, one level later: the old `easy` flag was age ≤ 9 or level ≤ 2. */
function mesTier(level, ctx) {
  return nudge(ctx.age <= 9 || level <= 2 ? 1 : ctx.age >= 12 || level >= 5 ? 3 : 2, level, ctx);
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
  /* Two digits at least, so the count is never just the digit sitting there. */
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

/**
 * F — arrondi par défaut / par excès / troncature, à l'unité, au dixième ou au centième.
 * Numbers stay positive, so *par défaut* and *troncature* are the same value (the floor at
 * that place) exactly as in the 6e exercise books. There is no "nearest": the pad cannot
 * express the tie rule, so it would only be a guess.
 */
function gPvRound(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  /* Keeping at least one digit past the cut is what makes the question worth asking. */
  const p = tier === 2 ? rint(0, 1, rnd) : rint(0, 2, rnd);
  const intLen = rint(1, p === 2 ? 2 : 3, rnd);
  const n = randomNumber(intLen, rint(p + 1, Math.min(4, p + 2), rnd), rnd);
  const place = C.roundPlace[p];
  const kept = parseInt(n.int.join('') + n.dec.slice(0, p).join(''), 10);
  const scale = Math.pow(10, p);
  if (tier === 3 && rnd() < 0.35) return { t: C.roundUp(n.s, place), a: (kept + 1) / scale, tag: C.roundTag(place) };
  if (rnd() < 0.35) return { t: C.truncate(n.s, place), a: kept / scale, tag: C.truncTag(place) };
  return { t: C.roundDown(n.s, place), a: kept / scale, tag: C.roundTag(place) };
}

const PV_WEIGHTS = {
  1: [[gPvDigit, 40], [gPvCount, 15], [gPvAssemble, 20], [gPvCompare, 15], [gPvFracNum, 10]],
  2: [[gPvDigit, 26], [gPvCount, 18], [gPvAssemble, 18], [gPvCompare, 16], [gPvFracNum, 12], [gPvRound, 10]],
  3: [[gPvDigit, 20], [gPvCount, 20], [gPvAssemble, 18], [gPvCompare, 16], [gPvFracNum, 14], [gPvRound, 12]]
};

function gPlaceValue(tier, ctx) {
  return weighted(PV_WEIGHTS[tier], ctx.rnd)(tier, ctx);
}

/* ---------- decimals at work: money, comma shift, gap, midpoint, fraction bridge ---------- */

/**
 * G — euros and centimes, the everyday × 100 / ÷ 100. Shared by `deci` and `mes`, because it is
 * both a comma shift and a unit conversion; duplicating it would only make the two drift apart.
 */
function gMoney(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const cents = tier === 1
    ? rint(1, 9, rnd) * 100 + pick([0, 5, 10, 20, 25, 50, 75], rnd)
    : tier === 2 ? rint(105, 4999, rnd) : rint(1005, 99999, rnd);
  return rnd() < 0.5
    ? { t: C.euroToCent(fr(cents / 100)), a: cents, tag: C.moneyTag }
    : { t: C.centToEuro(cents), a: cents / 100, tag: C.moneyTag };
}

/** H — × and ÷ by 0,1 / 0,01 / 0,001: the same comma shift, both directions. */
function gShift(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const k = tier <= 2 ? pick([1, 1, 2], rnd) : pick([1, 2, 3], rnd);
  const factor = ['0,1', '0,01', '0,001'][k - 1];
  const div = tier >= 2 && rnd() < 0.42;
  /* Digit budgets chosen so the shifted answer never outgrows the six-character pad. */
  const p = rint(0, Math.min(2, 4 - k), rnd);
  const n = randomNumber(div ? rint(1, Math.min(2, 6 - k), rnd) : rint(1, 3, rnd), p, rnd);
  return {
    t: n.s + (div ? ' ÷ ' : ' × ') + factor,
    a: val(shiftComma(n.s, div ? k : -k)),
    tag: div ? C.divBy(factor) : C.mulBy(factor)
  };
}

/** I — how much bigger, straight after the compare item: 87,9 − 86,989. */
function gDeciGap(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const maxDec = tier === 3 ? 3 : 2;
  const iLen = tier === 1 ? 1 : rint(1, 2, rnd);
  const la = rint(1, maxDec, rnd);
  /* Unequal decimal lengths are the whole point: 87,9 looks smaller than 86,989 until you align. */
  const lb = tier === 1 ? la : la === maxDec ? la - 1 || 1 : la + 1;
  const hiInt = intDigits(iLen, rnd);
  const loInt = String(Math.max(1, parseInt(hiInt.join(''), 10) - rint(0, 2, rnd))).split('');
  let a = digitsToNumber(hiInt, decDigits(la, rnd));
  let b = digitsToNumber(loInt, decDigits(lb, rnd));
  if (a.v === b.v) {
    const dec = b.dec.slice();
    dec[dec.length - 1] = (dec[dec.length - 1] % 9) + 1;
    b = digitsToNumber(b.int, dec);
  }
  if (a.v < b.v) { const t = a; a = b; b = t; }
  return { t: a.s + ' − ' + b.s, a: Math.round((a.v - b.v) * 1e6) / 1e6, tag: C.gapTag };
}

/** J — the number halfway between two others. Built from the middle out, so it always lands clean. */
function gDeciMid(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  if (tier < 3 || rnd() < 0.35) {
    const lo = rint(2, 60, rnd);
    const hi = lo + rint(1, 9, rnd);
    return { t: C.mid(lo, hi), a: (lo + hi) / 2, tag: C.midTag };
  }
  const scale = rnd() < 0.5 ? 10 : 100;
  const step = rint(1, scale === 10 ? 24 : 45, rnd);
  const middle = rint(step + 1, scale === 10 ? 480 : 4800, rnd);
  return {
    t: C.mid(fr((middle - step) / scale), fr((middle + step) / scale)),
    a: middle / scale,
    tag: C.midTag
  };
}

/** K — 0,75 = ? / 4. Denominators are never powers of ten, so this is not item E in disguise. */
const BRIDGE_DENS = { 1: [2, 4, 5], 2: [2, 4, 5, 8, 20, 25], 3: [4, 8, 16, 20, 25, 40, 50] };

function gDeciBridge(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const den = pick(BRIDGE_DENS[tier], rnd);
  const top = den * (tier === 1 ? 2 : 3);
  let num;
  /* A whole-number left side would read « 2 = ? / 4 » and stop being a decimal question. */
  do { num = rint(1, top, rnd); } while (num % den === 0);
  return { t: C.fracNum(fr(num / den), den), a: num, tag: C.bridgeTag };
}

const EX_WEIGHTS = {
  1: [[gMoney, 70], [gDeciGap, 30]],
  2: [[gMoney, 34], [gDeciGap, 24], [gDeciBridge, 26], [gDeciMid, 16]],
  3: [[gMoney, 18], [gDeciGap, 24], [gDeciBridge, 28], [gDeciMid, 30]]
};

/** Share of what is left after place value; the rest stays classic ×10 / ÷10. */
const EX_SHARE = { 1: 0.25, 2: 0.32, 3: 0.36 };

function gDeciApplied(tier, ctx) {
  return weighted(EX_WEIGHTS[tier], ctx.rnd)(tier, ctx);
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

/* ---------- measures: units, money, time, geometry ---------- */

function gMesUnits(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const easy = tier === 1;
  const r = rnd();
  if (r < 0.24) {
    const n = easy ? rint(2, 9, rnd) : rint(11, 99, rnd) / 10;
    return { t: fr(n) + ' m = ? cm', a: Math.round(n * 100), tag: C.lengths };
  }
  if (r < 0.44) {
    const n = easy ? rint(2, 9, rnd) : rint(11, 95, rnd) / 10;
    return { t: fr(n) + ' km = ? m', a: Math.round(n * 1000), tag: C.lengths };
  }
  if (r < 0.62) {
    const n = easy ? rint(2, 9, rnd) * 100 : rint(15, 480, rnd) * 10;
    return { t: n + ' cm = ? m', a: Math.round(n) / 100, tag: C.lengths };
  }
  if (r < 0.82) {
    const n = easy ? rint(2, 9, rnd) : rint(11, 95, rnd) / 10;
    return { t: fr(n) + ' kg = ? g', a: Math.round(n * 1000), tag: C.masses };
  }
  const n = easy ? rint(2, 9, rnd) : rint(11, 95, rnd) / 10;
  return { t: fr(n) + ' L = ? mL', a: Math.round(n * 1000), tag: C.volumes };
}

/**
 * Time answers are always one number the pad can type: minutes for everything that mixes
 * hours and minutes, decimal hours for « ? h », seconds for « ? s ». Never « 2 h 20 ».
 */
function tHourToMin(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const h = tier === 1 ? rint(1, 3, rnd) : tier === 2 ? rint(1, 5, rnd) : rint(1, 9, rnd);
  if (tier === 1 && rnd() < 0.3) return { t: h + ' h = ? min', a: h * 60, tag: C.hourTag };
  const m = tier === 1 ? pick([10, 15, 20, 30, 40, 45], rnd) : rint(1, 59, rnd);
  return { t: h + ' h ' + mm(m) + ' = ? min', a: h * 60 + m, tag: C.hourTag };
}

/** Quarter-hour steps only, so « ? h » is always 2, 2,25, 2,5 or 2,75. */
function tMinToHour(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const n = tier === 1 ? rint(2, 9, rnd) * 60 : tier === 2 ? rint(3, 16, rnd) * 30 : rint(5, 32, rnd) * 15;
  return { t: n + ' min = ? h', a: n / 60, tag: C.hourTag };
}

function tMinSec(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  if (rnd() < 0.5) {
    const n = tier === 3 && rnd() < 0.3 ? rint(5, 19, rnd) / 2 : rint(2, tier === 1 ? 9 : 16, rnd);
    return { t: fr(n) + ' min = ? s', a: Math.round(n * 60), tag: C.minSecTag };
  }
  /* Whole minutes back: the half-minute flavour lives in the other direction (2,5 min = 150 s). */
  const n = rint(2, tier === 3 ? 16 : 9, rnd) * 60;
  return { t: n + ' s = ? min', a: n / 60, tag: C.minSecTag };
}

/** A duration written the way a timetable writes it: 1 h 45, 2 h, 35 min. */
function durText(h, m) {
  if (!h) return m + ' min';
  return m ? h + ' h ' + mm(m) : h + ' h';
}

function tAddDur(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const one = () => ({ h: rint(1, tier === 3 ? 4 : 2, rnd), m: rint(0, 11, rnd) * 5 });
  let a, b;
  if (tier === 1) {
    a = { h: 0, m: rint(2, 10, rnd) * 5 };
    b = { h: 0, m: rint(2, 10, rnd) * 5 };
  } else if (tier === 2) {
    a = one();
    b = { h: 0, m: rint(3, 11, rnd) * 5 };
  } else {
    a = one();
    b = one();
  }
  const total = (a.h + b.h) * 60 + a.m + b.m;
  return { t: durText(a.h, a.m) + ' + ' + durText(b.h, b.m) + ' = ? min', a: total, tag: C.addDurTag };
}

/** The gap between two clock times, answered in minutes. Tier 1 always lands on a whole hour. */
function tClockGap(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const h = rint(7, tier === 1 ? 11 : 20, rnd);
  /* Capped at 58 so the same-hour branch always has a later minute left to land on. */
  const m = tier === 1 ? rint(1, 11, rnd) * 5 : rint(1, 58, rnd);
  let eh, em;
  if (tier === 1 || rnd() < 0.35) { eh = h + 1; em = 0; }
  else if (tier === 2) { eh = h; em = rint(m + 1, 59, rnd); }
  else { eh = h + rint(1, 2, rnd); em = rint(0, 59, rnd); }
  const start = h * 60 + m;
  const end = eh * 60 + em;
  return {
    t: C.clockGap(C.clock(h, m), C.clock(eh, em)),
    a: end - start,
    tag: C.clockGapTag
  };
}

const TIME_WEIGHTS = {
  1: [[tHourToMin, 30], [tMinToHour, 20], [tMinSec, 25], [tAddDur, 10], [tClockGap, 15]],
  2: [[tHourToMin, 22], [tMinToHour, 18], [tMinSec, 16], [tAddDur, 22], [tClockGap, 22]],
  3: [[tHourToMin, 16], [tMinToHour, 18], [tMinSec, 14], [tAddDur, 26], [tClockGap, 26]]
};

function gMesTime(tier, ctx) {
  return weighted(TIME_WEIGHTS[tier], ctx.rnd)(tier, ctx);
}

function gSquare(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const c = rint(3, tier === 3 ? 25 : 15, rnd);
  return rnd() < 0.5
    ? { t: C.area(c), a: c * c, tag: C.areaTag }
    : { t: C.peri(c), a: 4 * c, tag: C.periTag };
}

function gRect(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const l = rint(4, tier === 3 ? 20 : 12, rnd);
  const w = rint(2, l - 1, rnd);
  return rnd() < 0.5
    ? { t: C.rectArea(l, w), a: l * w, tag: C.areaTag }
    : { t: C.rectPeri(l, w), a: 2 * (l + w), tag: C.periTag };
}

/** Three sides that can actually close: the third one stays inside the triangle inequality. */
function gTriPeri(tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const a = rint(3, tier === 3 ? 18 : 12, rnd);
  const b = rint(3, tier === 3 ? 18 : 12, rnd);
  const c = rint(Math.abs(a - b) + 1, a + b - 1, rnd);
  return { t: C.triPeri(a, b, c), a: a + b + c, tag: C.periTag };
}

/** Half of the two legs: the answer is a whole number or a clean half. */
function gRightTri(_tier, ctx) {
  const rnd = ctx.rnd;
  const C = L(ctx.lang);
  const a = rint(3, 12, rnd), b = rint(2, 9, rnd);
  return { t: C.rightArea(a, b), a: a * b / 2, tag: C.areaTag };
}

const GEO_WEIGHTS = {
  1: [[gSquare, 100]],
  2: [[gSquare, 45], [gRect, 40], [gTriPeri, 15]],
  3: [[gSquare, 25], [gRect, 35], [gTriPeri, 18], [gRightTri, 22]]
};

function gMesGeo(tier, ctx) {
  return weighted(GEO_WEIGHTS[tier], ctx.rnd)(tier, ctx);
}

const MES_WEIGHTS = {
  1: [[gMesUnits, 55], [gMoney, 15], [gMesTime, 20], [gMesGeo, 10]],
  2: [[gMesUnits, 45], [gMoney, 14], [gMesTime, 24], [gMesGeo, 17]],
  3: [[gMesUnits, 38], [gMoney, 12], [gMesTime, 25], [gMesGeo, 25]]
};

function gMes(level, ctx) {
  const tier = mesTier(level, ctx);
  return weighted(MES_WEIGHTS[tier], ctx.rnd)(tier, ctx);
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
  const tier = pvTier(level, ctx);
  if (ctx.rnd() < pvShare(level, ctx)) return gPlaceValue(tier, ctx);
  if (ctx.rnd() < EX_SHARE[tier]) return gDeciApplied(tier, ctx);
  return gClassicDeci(level, ctx, tier);
}

function gClassicDeci(level, ctx, tier) {
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
  if (tier >= 2 && rnd() < 0.14) return gShift(tier, ctx);
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
