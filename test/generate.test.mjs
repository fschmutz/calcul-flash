import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateQuestion,
  complementQuestion,
  fr,
  FAM_KEYS
} from '../js/generate.js';

const FAMILIES = FAM_KEYS.filter((k) => k !== 'mix');

function num(s) {
  return parseFloat(String(s).trim().replace(',', '.'));
}

/** Seeded RNG so calibration coverage assertions never flake. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Place names re-derived here on purpose: the test must not import the table. */
const RANK_OF = {
  milliers: 3, millier: 3, thousands: 3, thousand: 3,
  centaines: 2, centaine: 2, hundreds: 2, hundred: 2,
  dizaines: 1, dizaine: 1, tens: 1, ten: 1,
  unités: 0, unité: 0, units: 0, unit: 0,
  dixièmes: -1, dixième: -1, tenths: -1, tenth: -1,
  centièmes: -2, centième: -2, hundredths: -2, hundredth: -2,
  millièmes: -3, millième: -3, thousandths: -3, thousandth: -3,
  'dix-millièmes': -4, 'dix-millième': -4, 'ten-thousandths': -4, 'ten-thousandth': -4
};

function rankOf(word) {
  const r = RANK_OF[word];
  if (r === undefined) throw new Error('unknown place: ' + word);
  return r;
}

function splitDigits(s) {
  const parts = s.split(',');
  return {
    int: parts[0].split(''),
    dec: parts[1] ? parts[1].split('') : []
  };
}

function digitAtRank(s, rank) {
  const { int, dec } = splitDigits(s);
  const d = rank >= 0 ? int[int.length - 1 - rank] : dec[-rank - 1];
  if (d === undefined) throw new Error('no digit at rank ' + rank + ' in ' + s);
  return +d;
}

function countAtRank(s, rank) {
  const { int, dec } = splitDigits(s);
  const kept = int.concat(dec).slice(0, int.length - rank);
  if (kept.length === 0) throw new Error('no count at rank ' + rank + ' in ' + s);
  return parseInt(kept.join(''), 10);
}

/** Evaluate the printed prompt; must match q.a. */
export function expectedFromText(t) {
  const s = t.trim();
  let m;
  if ((m = s.match(/^\? \+ (.+) = (.+)$/))) return num(m[2]) - num(m[1]);
  if ((m = s.match(/^(.+) \+ \? = (.+)$/))) return num(m[2]) - num(m[1]);
  if ((m = s.match(/^Dans ([\d,]+), le chiffre des (.+) \?$/)) ||
      (m = s.match(/^In ([\d,]+), the (.+) digit\?$/))) {
    return digitAtRank(m[1], rankOf(m[2]));
  }
  if ((m = s.match(/^Dans ([\d,]+), le nombre (?:de |d')(.+) \?$/)) ||
      (m = s.match(/^In ([\d,]+), how many (.+)\?$/))) {
    return countAtRank(m[1], rankOf(m[2]));
  }
  if ((m = s.match(/^(?:Écris : |Write: )(.+)$/))) {
    return m[1].split(', ').reduce((acc, clue) => {
      const c = clue.match(/^(\d) (.+)$/);
      if (!c) throw new Error('unparsed clue: ' + clue);
      return acc + +c[1] * Math.pow(10, rankOf(c[2]));
    }, 0);
  }
  if ((m = s.match(/^Le plus grand : ([\d,]+) ou ([\d,]+) \?$/)) ||
      (m = s.match(/^Which is larger: ([\d,]+) or ([\d,]+)\?$/))) {
    if (num(m[1]) === num(m[2])) throw new Error('equal pair: ' + s);
    return Math.max(num(m[1]), num(m[2]));
  }
  if ((m = s.match(/^([\d,]+) = \? \/ (\d+)$/))) {
    const dec = (m[1].split(',')[1] || '').length;
    if (Math.pow(10, dec) !== +m[2]) throw new Error('denominator mismatch: ' + s);
    return Math.round(num(m[1]) * +m[2]);
  }
  if ((m = s.match(/^Arrondi à l'unité par défaut de ([\d,]+)$/)) ||
      (m = s.match(/^Troncature à l'unité de ([\d,]+)$/)) ||
      (m = s.match(/^Round ([\d,]+) down to the unit$/)) ||
      (m = s.match(/^Truncate ([\d,]+) to the unit$/))) {
    return Math.floor(num(m[1]));
  }
  if ((m = s.match(/^Arrondi à l'unité par excès de ([\d,]+)$/)) ||
      (m = s.match(/^Round ([\d,]+) up to the unit$/))) {
    return Math.ceil(num(m[1]));
  }
  if ((m = s.match(/^(.+) m = \? cm$/))) return Math.round(num(m[1]) * 100);
  if ((m = s.match(/^(.+) km = \? m$/))) return Math.round(num(m[1]) * 1000);
  if ((m = s.match(/^(.+) cm = \? m$/))) return Math.round(num(m[1])) / 100;
  if ((m = s.match(/^(.+) kg = \? g$/))) return Math.round(num(m[1]) * 1000);
  if ((m = s.match(/^(.+) L = \? mL$/))) return Math.round(num(m[1]) * 1000);
  if ((m = s.match(/^(\d+) h (\d+) = \? min$/))) return +m[1] * 60 + +m[2];
  if ((m = s.match(/^(\d+) min = \? h$/))) return num(m[1]) / 60;
  if ((m = s.match(/^Aire d'un carré de côté (\d+) cm$/))) return (+m[1]) * (+m[1]);
  if ((m = s.match(/^Périmètre d'un carré de côté (\d+) cm$/))) return 4 * (+m[1]);
  if ((m = s.match(/^Area of a square of side (\d+) cm$/))) return (+m[1]) * (+m[1]);
  if ((m = s.match(/^Perimeter of a square of side (\d+) cm$/))) return 4 * (+m[1]);
  if ((m = s.match(/^(?:La moitié de|Half of) (.+)$/))) return num(m[1]) / 2;
  if ((m = s.match(/^(?:Le quart de|A quarter of) (.+)$/))) return num(m[1]) / 4;
  if ((m = s.match(/^(?:Le tiers de|A third of) (.+)$/))) return num(m[1]) / 3;
  if ((m = s.match(/^(?:Le carré de|The square of) (.+)$/))) return num(m[1]) * num(m[1]);
  if ((m = s.match(/^(?:Le double de|Double) (.+)$/))) return num(m[1]) * 2;
  if ((m = s.match(/^(\d+)\/(\d+) (?:de|of) (.+)$/))) {
    return (num(m[3]) * +m[1]) / +m[2];
  }
  if ((m = s.match(/^(\d+)\s*% (?:de|of) (.+)$/))) {
    return Math.round(num(m[2]) * +m[1]) / 100;
  }
  if ((m = s.match(/^(\d+)\/(\d+) (?:en décimal|as a decimal)$/))) {
    return +m[1] / +m[2];
  }
  if ((m = s.match(/^(.+) × (.+)$/))) return num(m[1]) * num(m[2]);
  if ((m = s.match(/^(.+) ÷ (.+)$/))) return num(m[1]) / num(m[2]);
  if ((m = s.match(/^(.+) \+ (.+)$/))) return num(m[1]) + num(m[2]);
  if ((m = s.match(/^(.+) − (.+)$/))) return num(m[1]) - num(m[2]);
  throw new Error('unparsed: ' + t);
}

function close(a, b) {
  return Math.abs(a - b) < 1e-6;
}

test('complement to 100 / 10 / 1', () => {
  const a = complementQuestion(43, 100, 't', () => 0.9);
  assert.equal(a.a, 57);
  assert.equal(expectedFromText(a.t), 57);
  assert.match(a.t, /43/);
  assert.match(a.t, /100/);

  const b = complementQuestion(43, 100, 't', () => 0.1);
  assert.equal(b.a, 57);
  assert.equal(expectedFromText(b.t), 57);
  assert.ok(b.t.startsWith('? +'));

  const c = complementQuestion(7, 10, 't', () => 0.9);
  assert.equal(c.a, 3);

  const d = complementQuestion(0.25, 1, 't', () => 0.9);
  assert.equal(d.a, 0.75);
  assert.ok(close(expectedFromText(d.t), 0.75));
});

test('fr formats French decimals', () => {
  assert.equal(fr(1.5), '1,5');
  assert.equal(fr(10), '10');
  assert.equal(fr(0.25), '0,25');
  assert.equal(fr(7.425), '7,425');
  assert.equal(fr(3.0405), '3,0405');
  assert.equal(fr(0.1 + 0.2), '0,3');
  assert.equal(fr(7.39 + 0.035), '7,425');
  assert.equal(fr(-0.0000001), '0');
});

for (const fam of FAMILIES) {
  test(`answers match printed expression: ${fam}`, () => {
    let n = 0;
    for (const level of [1, 2, 3, 4, 5, 6]) {
      for (const age of [8, 11, 14]) {
        for (const diff of ['facile', 'moyen', 'expert']) {
          for (const lang of ['fr', 'en']) {
            for (let i = 0; i < 24; i++) {
              const q = generateQuestion(level, { mode: fam, age, diff, lang });
              assert.ok(Number.isFinite(q.a), `non-finite a for ${q.t}`);
              assert.ok(q.t && q.t.length > 0);
              const exp = expectedFromText(q.t);
              assert.ok(
                close(exp, q.a),
                `${fam} L${level} ${lang}: "${q.t}" expected ${exp} got ${q.a}`
              );
              n++;
            }
          }
        }
      }
    }
    assert.ok(n > 100);
  });
}

test('mix mode stays on a known family and matches', () => {
  for (let i = 0; i < 80; i++) {
    const q = generateQuestion(3, { mode: 'mix', age: 11, diff: 'moyen', lang: 'fr' });
    assert.ok(FAMILIES.includes(q.famKey), q.famKey);
    assert.ok(close(expectedFromText(q.t), q.a), q.t);
  }
});

/* ---------- decimal place value (6e) ---------- */

const AGES = [8, 9, 10, 11, 12, 13, 14];
const DIFFS = ['facile', 'moyen', 'expert'];
const LEVELS = [1, 2, 3, 4, 5, 6];

/** Everything a player can be asked, for one age / level / difficulty cell. */
function deciSample(level, age, diff, lang, n, seed) {
  const random = mulberry32(seed);
  const out = [];
  for (let i = 0; i < n; i++) out.push(generateQuestion(level, { mode: 'deci', age, diff, lang, random }));
  return out;
}

const IS = {
  digit: (t) => /le chiffre des |, the .+ digit\?$/.test(t),
  count: (t) => /le nombre (?:de |d')|how many /.test(t),
  assemble: (t) => /^(?:Écris : |Write: )/.test(t),
  compare: (t) => /^(?:Le plus grand : |Which is larger: )/.test(t),
  fracNum: (t) => / = \? \/ \d+$/.test(t),
  round: (t) => /^(?:Arrondi|Troncature|Round |Truncate )/.test(t)
};
const isPlaceValue = (t) => Object.values(IS).some((f) => f(t));

test('every new prompt shape is answered by its own text', () => {
  let seen = 0;
  for (const level of LEVELS) {
    for (const age of AGES) {
      for (const diff of DIFFS) {
        for (const lang of ['fr', 'en']) {
          for (const q of deciSample(level, age, diff, lang, 120, level * 977 + age * 31 + lang.length)) {
            assert.ok(close(expectedFromText(q.t), q.a), `${lang} L${level}/${age}: ${q.t} → ${q.a}`);
            if (isPlaceValue(q.t)) seen++;
          }
        }
      }
    }
  }
  assert.ok(seen > 5000, 'place-value items generated: ' + seen);
});

test('typed answer always fits the arcade pad (6 characters)', () => {
  for (const mode of FAM_KEYS) {
    for (const level of LEVELS) {
      for (const age of AGES) {
        for (const diff of DIFFS) {
          for (let i = 0; i < 40; i++) {
            const q = generateQuestion(level, { mode, age, diff, lang: 'fr' });
            const typed = fr(q.a).replace('-', '');
            assert.ok(typed.length <= 6, `${mode} L${level}/${age}: "${q.t}" answers "${typed}"`);
          }
        }
      }
    }
  }
});

test('deci keeps classic work next to the place-value family', () => {
  const share = (level, age, diff) => {
    const qs = deciSample(level, age, diff, 'fr', 3000, 4242 + level * 13 + age);
    return qs.filter((q) => isPlaceValue(q.t)).length / qs.length;
  };
  for (const age of [10, 11, 12, 14]) {
    for (const level of [2, 3, 4, 5, 6]) {
      const s = share(level, age, 'moyen');
      assert.ok(s > 0.30 && s < 0.52, `age ${age} L${level} place-value share ${s.toFixed(2)}`);
    }
  }
  for (const age of [8, 9]) {
    const s = share(3, age, 'moyen');
    assert.ok(s > 0.12 && s < 0.30, `age ${age} place-value share ${s.toFixed(2)}`);
  }
  const l1 = share(1, 13, 'moyen');
  assert.ok(l1 > 0.12 && l1 < 0.30, 'level 1 stays mostly classic: ' + l1.toFixed(2));
});

test('every item type A–F shows up where it should', () => {
  const kinds = (level, age, diff) => {
    const qs = deciSample(level, age, diff, 'fr', 4000, 77 + level * 5 + age);
    const found = {};
    for (const k of Object.keys(IS)) found[k] = qs.some((q) => IS[k](q.t));
    return found;
  };
  const core = kinds(3, 11, 'moyen');
  for (const k of Object.keys(IS)) assert.ok(core[k], `age 11 L3 misses ${k}`);
  const top = kinds(6, 14, 'expert');
  for (const k of Object.keys(IS)) assert.ok(top[k], `age 14 L6 expert misses ${k}`);
  const young = kinds(2, 8, 'moyen');
  for (const k of ['digit', 'count', 'assemble', 'compare', 'fracNum']) {
    assert.ok(young[k], `age 8 misses ${k}`);
  }
});

test('young players stay on the easy end of the place-value ladder', () => {
  for (const age of [8, 9]) {
    for (const level of LEVELS) {
      for (const diff of DIFFS) {
        for (const q of deciSample(level, age, diff, 'fr', 800, 909 + level * 7 + age)) {
          assert.ok(!/millième/.test(q.t), `age ${age}: ${q.t}`);
          assert.ok(!IS.round(q.t), `age ${age}: ${q.t}`);
          if (IS.digit(q.t)) {
            const place = q.t.match(/le chiffre des (.+) \?$/)[1];
            assert.ok(['unités', 'dizaines'].includes(place), `age ${age}: ${q.t}`);
          }
          if (IS.fracNum(q.t)) {
            const den = +q.t.match(/\/ (\d+)$/)[1];
            assert.ok(den === 10 || den === 100, `age ${age}: ${q.t}`);
          }
        }
      }
    }
  }
  const l1 = deciSample(1, 13, 'facile', 'fr', 800, 31337);
  assert.ok(!l1.some((q) => /millième/.test(q.t)), 'level 1 stays away from thousandths');
});

test('older players reach thousandths, ten-thousandths and rounding', () => {
  const qs = [].concat(
    deciSample(5, 12, 'moyen', 'fr', 2500, 515),
    deciSample(6, 14, 'expert', 'fr', 2500, 616)
  );
  assert.ok(qs.some((q) => /dix-millièmes/.test(q.t)), 'no ten-thousandths');
  assert.ok(qs.some((q) => /millièmes/.test(q.t)), 'no thousandths');
  assert.ok(qs.some((q) => /^Arrondi à l'unité par excès/.test(q.t)), 'no round-up');
  assert.ok(qs.some((q) => /^Troncature/.test(q.t)), 'no truncation');
  assert.ok(qs.some((q) => IS.count(q.t) && q.a >= 1000), 'no large unit counts');
  assert.ok(qs.some((q) => / = \? \/ 1000$/.test(q.t)), 'no thousandths fraction');
});

test('chiffre des and nombre de never get conflated', () => {
  for (const lang of ['fr', 'en']) {
    for (const q of deciSample(5, 12, 'moyen', lang, 4000, 8080 + lang.length)) {
      if (IS.digit(q.t)) {
        assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a <= 9, `digit answer: ${q.t} → ${q.a}`);
      }
      if (IS.count(q.t)) {
        assert.ok(Number.isInteger(q.a) && q.a >= 10, `count answer: ${q.t} → ${q.a}`);
      }
    }
  }
});

test('assembled numbers use 3–5 place clues and read back exactly', () => {
  const qs = [].concat(
    deciSample(2, 9, 'moyen', 'fr', 1500, 21),
    deciSample(3, 11, 'moyen', 'fr', 1500, 22),
    deciSample(6, 14, 'expert', 'fr', 1500, 23)
  ).filter((q) => IS.assemble(q.t));
  assert.ok(qs.length > 200);
  let shuffled = 0, withZero = 0;
  for (const q of qs) {
    const clues = q.t.replace(/^Écris : /, '').split(', ');
    assert.ok(clues.length >= 3 && clues.length <= 5, q.t);
    const ranks = clues.map((c) => rankOf(c.match(/^\d (.+)$/)[1]));
    assert.equal(new Set(ranks).size, ranks.length, 'duplicate place: ' + q.t);
    if (ranks.some((r, i) => i > 0 && r > ranks[i - 1])) shuffled++;
    if (/(^|, )0 /.test(q.t)) withZero++;
    assert.ok(q.a > 0, q.t);
    assert.ok(fr(q.a).replace('-', '').length <= 6, q.t + ' → ' + fr(q.a));
  }
  assert.ok(shuffled > 0, 'clues are never given out of order');
  assert.ok(withZero > 0, 'a place is never worth zero');
});

test('comparisons are strict and often use different decimal lengths', () => {
  const qs = deciSample(4, 11, 'moyen', 'fr', 4000, 404).filter((q) => IS.compare(q.t));
  assert.ok(qs.length > 200);
  let unequalLength = 0;
  for (const q of qs) {
    const m = q.t.match(/^Le plus grand : ([\d,]+) ou ([\d,]+) \?$/);
    const a = num(m[1]), b = num(m[2]);
    assert.notEqual(a, b, q.t);
    assert.equal(q.a, Math.max(a, b));
    if ((m[1].split(',')[1] || '').length !== (m[2].split(',')[1] || '').length) unequalLength++;
  }
  assert.ok(unequalLength / qs.length > 0.4, 'not enough unequal-length pairs');
});

test('decimal fraction numerators have no leading zero', () => {
  const qs = [].concat(
    deciSample(2, 10, 'moyen', 'fr', 2000, 1010),
    deciSample(6, 14, 'expert', 'fr', 2000, 1011)
  ).filter((q) => IS.fracNum(q.t));
  assert.ok(qs.length > 150);
  for (const q of qs) {
    const m = q.t.match(/^([\d,]+) = \? \/ (\d+)$/);
    const dec = (m[1].split(',')[1] || '').length;
    assert.equal(+m[2], Math.pow(10, dec), q.t);
    assert.ok(Number.isInteger(q.a) && q.a >= 1, q.t);
    assert.equal(String(q.a), String(q.a).replace(/^0+/, ''), q.t);
    assert.equal(q.a, Math.round(num(m[1]) * +m[2]), q.t);
  }
});

test('rounding to the unit is floor by default, and stays rare', () => {
  const qs = deciSample(5, 13, 'moyen', 'fr', 4000, 1313);
  const rounds = qs.filter((q) => IS.round(q.t));
  assert.ok(rounds.length > 40);
  assert.ok(rounds.length / qs.length < 0.12, 'rounding share ' + rounds.length / qs.length);
  for (const q of rounds) {
    const v = num(q.t.match(/([\d,]+)$/)[1]);
    assert.ok(v > 0, q.t);
    assert.equal(q.a, /par excès/.test(q.t) ? Math.ceil(v) : Math.floor(v));
  }
});

test('deci still serves the classic ×10 / ÷10 work plus make-1 and ragged sums', () => {
  const qs = deciSample(4, 11, 'moyen', 'fr', 4000, 4110);
  assert.ok(qs.some((q) => / × 10$/.test(q.t) || / × 100$/.test(q.t)), 'no ×10 / ×100');
  assert.ok(qs.some((q) => / ÷ 10$/.test(q.t)), 'no ÷10');
  assert.ok(qs.some((q) => /= 1$/.test(q.t)), 'no make-1');
  assert.ok(
    qs.some((q) => {
      const m = q.t.match(/^([\d,]+) \+ ([\d,]+)$/);
      if (!m) return false;
      return (m[1].split(',')[1] || '').length !== (m[2].split(',')[1] || '').length;
    }),
    'no unequal-length decimal sum'
  );
});

test('comp gives make-1 real weight from level 4', () => {
  const qs = [];
  for (let i = 0; i < 3000; i++) qs.push(generateQuestion(5, { mode: 'comp', age: 11, diff: 'moyen', lang: 'fr' }));
  const ones = qs.filter((q) => /= 1$/.test(q.t));
  assert.ok(ones.length / qs.length > 0.15, 'make-1 share ' + ones.length / qs.length);
  for (const q of ones) assert.ok(close(expectedFromText(q.t), q.a), q.t);
});

test('no throw on levels 1–6 for every family, age, difficulty', () => {
  for (const mode of FAM_KEYS) {
    for (let level = 1; level <= 6; level++) {
      for (const age of [8, 9, 10, 11, 12, 13, 14]) {
        for (const diff of ['facile', 'moyen', 'expert']) {
          for (let i = 0; i < 12; i++) {
            const q = generateQuestion(level, { mode, age, diff, lang: 'fr' });
            assert.equal(typeof q.t, 'string');
            assert.ok(Number.isFinite(q.a));
            assert.ok(q.tag);
            assert.ok(q.famKey);
          }
        }
      }
    }
  }
});
