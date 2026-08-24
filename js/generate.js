/** Question generators. Browser + Node (node --test). No DOM. */

export function fr(n) {
  return (Math.round(n * 100) / 100).toString().replace('.', ',');
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
    compDec: 'Complément décimal'
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
    compDec: 'Decimal complement'
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
  if (level >= 6 && ctx.age >= 11 && r < 0.30) {
    return complementQuestion(rint(5, 95, rnd) / 100, 1, C.comp1, rnd);
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
  if (r < 0.74) {
    const n = rint(11, 89, rnd) / 10, m = rint(2, 6, rnd);
    return { t: fr(n) + ' × ' + m, a: Math.round(n * m * 10) / 10, tag: C.decMul };
  }
  if (r < 0.88) {
    const n = rint(105, 995, rnd) / 10;
    return { t: fr(n) + ' ÷ 10', a: Math.round(n * 10) / 100, tag: C.div10 };
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
