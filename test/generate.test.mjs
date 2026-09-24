import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateQuestion,
  complementQuestion,
  fr,
  FAM_KEYS
} from '../js/generate.js';

import {
  expectedFromText,
  num,
  rankOf,
  cutAt,
  cutPlace,
  clockMinutes
} from './expected.mjs';

const FAMILIES = FAM_KEYS.filter((k) => k !== 'mix');

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

const POWER_OF_TEN = / = \? \/ (?:10|100|1000|10000)$/;

const IS = {
  digit: (t) => /le chiffre des |, the .+ digit\?$/.test(t),
  count: (t) => /le nombre (?:de |d')|how many /.test(t),
  assemble: (t) => /^(?:Écris : |Write: )/.test(t),
  compare: (t) => /^(?:Le plus grand : |Which is larger: )/.test(t),
  fracNum: (t) => POWER_OF_TEN.test(t),
  round: (t) => /^(?:Arrondi|Troncature|Round |Truncate )/.test(t)
};
const isPlaceValue = (t) => Object.values(IS).some((f) => f(t));

/** The decimals-at-work items, which live next to place value inside `deci`. */
const EX = {
  money: (t) => / € = \? (?:centimes|cents)$/.test(t) || /(?:centimes|cents) = \? €$/.test(t),
  gap: (t) => / − /.test(t),
  bridge: (t) => / = \? \/ \d+$/.test(t) && !POWER_OF_TEN.test(t),
  mid: (t) => /^(?:Le milieu de|Halfway between)/.test(t)
};
const isApplied = (t) => Object.values(EX).some((f) => f(t));
const isShift = (t) => / [×÷] 0,0*1$/.test(t);

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

test('a comparison is a pick between the two decimals it prints', () => {
  const qs = deciSample(4, 11, 'moyen', 'fr', 4000, 405).filter((q) => IS.compare(q.t));
  assert.ok(qs.length > 200);
  for (const q of qs) {
    const m = q.t.match(/^Le plus grand : ([\d,]+) ou ([\d,]+) \?$/);
    assert.ok(Array.isArray(q.choices), 'no choices: ' + q.t);
    assert.equal(q.choices.length, 2, q.t);
    /* The labels are the very strings on the card, so no float noise can leak into a button. */
    assert.deepEqual(q.choices.map((c) => c.label).sort(), [m[1], m[2]].sort(), q.t);
    for (const c of q.choices) assert.equal(c.v, num(c.label), q.t);
    assert.equal(q.choices.filter((c) => c.v === q.a).length, 1, 'not exactly one correct: ' + q.t);
  }
});

test('the larger decimal is not always the same button', () => {
  const qs = [].concat(
    deciSample(2, 10, 'moyen', 'fr', 3000, 406),
    deciSample(6, 14, 'expert', 'en', 3000, 407)
  ).filter((q) => IS.compare(q.t));
  assert.ok(qs.length > 300);
  const firstIsCorrect = qs.filter((q) => q.choices[0].v === q.a).length;
  const share = firstIsCorrect / qs.length;
  assert.ok(share > 0.35 && share < 0.65, 'choice order looks fixed: ' + share);
  const firstIsPrinted = qs.filter((q) => q.t.indexOf(q.choices[0].label) < q.t.indexOf(q.choices[1].label));
  assert.ok(firstIsPrinted.length < qs.length, 'buttons always follow the printed order');
});

test('typed questions carry no choices', () => {
  let typed = 0;
  for (const fam of FAMILIES) {
    for (const level of LEVELS) {
      for (const age of [8, 11, 14]) {
        for (const lang of ['fr', 'en']) {
          for (let i = 0; i < 12; i++) {
            const q = generateQuestion(level, { mode: fam, age, diff: 'moyen', lang });
            if (fam === 'deci' && IS.compare(q.t)) continue;
            assert.equal(q.choices, undefined, 'unexpected choices on ' + q.t);
            typed++;
          }
        }
      }
    }
  }
  assert.ok(typed > 2000);
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

test('rounding cuts at the unit, the tenth or the hundredth, floor by default', () => {
  const qs = deciSample(5, 13, 'moyen', 'fr', 4000, 1313);
  const rounds = qs.filter((q) => IS.round(q.t));
  assert.ok(rounds.length > 40);
  assert.ok(rounds.length / qs.length < 0.12, 'rounding share ' + rounds.length / qs.length);
  const places = new Set();
  for (const q of rounds) {
    const m = q.t.match(/^(?:Arrondi|Troncature) (.+?) (?:par défaut |par excès )?de ([\d,]+)$/);
    assert.ok(m, q.t);
    const p = cutPlace(m[1]);
    const v = num(m[2]);
    places.add(p);
    assert.ok(v > 0, q.t);
    /* Positive numbers, so « par défaut » and « troncature » are the same cut. */
    assert.equal(q.a, cutAt(m[2], p, /par excès/.test(q.t)), q.t);
    assert.ok((q.t.split(',')[1] || '').length > p, 'nothing to round in ' + q.t);
    assert.ok(fr(q.a).length <= 6, q.t + ' → ' + fr(q.a));
  }
  assert.ok(places.has(0) && places.has(1), 'places seen: ' + [...places].join(' '));

  const top = deciSample(6, 14, 'expert', 'fr', 4000, 1414).filter((q) => IS.round(q.t));
  const topPlaces = new Set(top.map((q) => cutPlace(q.t.match(/^(?:Arrondi|Troncature) (.+?) (?:par défaut |par excès )?de/)[1])));
  assert.deepEqual([...topPlaces].sort(), [0, 1, 2], 'the top tier should also cut at the hundredth');
  assert.ok(top.some((q) => /par excès/.test(q.t)), 'no round-up at the top tier');

  const mid = deciSample(3, 11, 'moyen', 'fr', 4000, 1111).filter((q) => IS.round(q.t));
  assert.ok(mid.length > 20);
  assert.ok(!mid.some((q) => /par excès/.test(q.t)), 'round-up leaked below the top tier');
  assert.ok(!mid.some((q) => /centième/.test(q.t)), 'the hundredth leaked below the top tier');
  assert.ok(mid.some((q) => /dixième/.test(q.t)), 'the 6e core never cuts at the tenth');
  assert.ok(mid.some((q) => /unité/.test(q.t)), 'the 6e core never cuts at the unit');
});

test('euros and centimes convert both ways and stay on the pad', () => {
  const qs = [].concat(
    deciSample(2, 9, 'moyen', 'fr', 3000, 909),
    deciSample(4, 11, 'moyen', 'fr', 3000, 411),
    deciSample(6, 14, 'expert', 'en', 3000, 614)
  ).filter((q) => EX.money(q.t));
  assert.ok(qs.length > 300, 'money items: ' + qs.length);
  let toCents = 0, toEuros = 0;
  for (const q of qs) {
    let m;
    if ((m = q.t.match(/^([\d,]+) € = \? (?:centimes|cents)$/))) {
      toCents++;
      assert.ok(Number.isInteger(q.a) && q.a > 0, q.t);
      assert.equal(q.a, Math.round(num(m[1]) * 100), q.t);
      assert.ok((m[1].split(',')[1] || '').length <= 2, 'more than two decimals on a price: ' + q.t);
    } else if ((m = q.t.match(/^(\d+) (?:centimes|cents) = \? €$/))) {
      toEuros++;
      assert.equal(q.a, +m[1] / 100, q.t);
      assert.ok(fr(q.a).length <= 6, q.t + ' → ' + fr(q.a));
    } else {
      throw new Error('unexpected money shape: ' + q.t);
    }
  }
  assert.ok(toCents > 100 && toEuros > 100, 'both directions should show up');
});

test('× and ÷ by 0,1 / 0,01 / 0,001 shift the comma without float noise', () => {
  const qs = [].concat(
    deciSample(3, 11, 'moyen', 'fr', 4000, 311),
    deciSample(6, 14, 'expert', 'fr', 4000, 614)
  ).filter((q) => isShift(q.t));
  assert.ok(qs.length > 200, 'comma-shift items: ' + qs.length);
  const factors = new Set(), ops = new Set();
  for (const q of qs) {
    const m = q.t.match(/^([\d,]+) ([×÷]) (0,0*1)$/);
    assert.ok(m, q.t);
    factors.add(m[3]);
    ops.add(m[2]);
    const expected = m[2] === '×' ? num(m[1]) * num(m[3]) : num(m[1]) / num(m[3]);
    assert.ok(Math.abs(expected - q.a) < 1e-9, `${q.t} → ${q.a}`);
    /* The printed answer must be the clean shift, not 0,5700000000000001. */
    assert.ok(/^\d+(,\d+)?$/.test(fr(q.a)), q.t + ' → ' + fr(q.a));
    assert.ok(fr(q.a).length <= 6, q.t + ' → ' + fr(q.a));
  }
  assert.deepEqual([...factors].sort(), ['0,001', '0,01', '0,1']);
  assert.deepEqual([...ops].sort(), ['×', '÷']);
});

test('decimal gaps are positive and mostly ragged', () => {
  const qs = deciSample(5, 12, 'moyen', 'fr', 5000, 512).filter((q) => EX.gap(q.t));
  assert.ok(qs.length > 150, 'gap items: ' + qs.length);
  let ragged = 0;
  for (const q of qs) {
    const m = q.t.match(/^([\d,]+) − ([\d,]+)$/);
    assert.ok(m, q.t);
    assert.ok(num(m[1]) > num(m[2]), 'not a positive gap: ' + q.t);
    assert.ok(Math.abs(num(m[1]) - num(m[2]) - q.a) < 1e-9, q.t);
    assert.ok(fr(q.a).length <= 6, q.t + ' → ' + fr(q.a));
    if ((m[1].split(',')[1] || '').length !== (m[2].split(',')[1] || '').length) ragged++;
  }
  assert.ok(ragged / qs.length > 0.8, 'unequal-length share ' + (ragged / qs.length).toFixed(2));
});

test('midpoints land exactly between the two numbers, and belong to the older players', () => {
  const qs = deciSample(6, 14, 'moyen', 'fr', 5000, 614).filter((q) => EX.mid(q.t));
  assert.ok(qs.length > 150, 'midpoint items: ' + qs.length);
  let decimalPair = 0;
  for (const q of qs) {
    const m = q.t.match(/^Le milieu de ([\d,]+) et ([\d,]+)$/);
    assert.ok(m, q.t);
    const lo = num(m[1]), hi = num(m[2]);
    assert.ok(hi > lo, q.t);
    assert.ok(Math.abs((lo + hi) / 2 - q.a) < 1e-9, q.t);
    assert.ok(fr(q.a).length <= 6, q.t + ' → ' + fr(q.a));
    if (m[1].includes(',') || m[2].includes(',')) decimalPair++;
  }
  assert.ok(decimalPair / qs.length > 0.5, 'the top tier should mostly use decimals');
  for (const age of [8, 9]) {
    const young = deciSample(3, age, 'moyen', 'fr', 3000, 300 + age);
    assert.ok(!young.some((q) => EX.mid(q.t)), 'midpoints reached age ' + age);
  }
});

test('the fraction bridge never uses a power of ten and always divides exactly', () => {
  const qs = [].concat(
    deciSample(4, 11, 'moyen', 'fr', 4000, 411),
    deciSample(6, 14, 'expert', 'en', 4000, 614)
  ).filter((q) => EX.bridge(q.t));
  assert.ok(qs.length > 300, 'bridge items: ' + qs.length);
  const dens = new Set();
  for (const q of qs) {
    const m = q.t.match(/^([\d,]+) = \? \/ (\d+)$/);
    const den = +m[2];
    dens.add(den);
    assert.ok(!/^10+$/.test(m[2]), 'that is the decimal-fraction item: ' + q.t);
    assert.ok(Number.isInteger(q.a) && q.a >= 1, q.t);
    assert.ok(Math.abs(num(m[1]) * den - q.a) < 1e-9, q.t + ' → ' + q.a);
    assert.notEqual(q.a % den, 0, 'a whole number in disguise: ' + q.t);
    assert.ok(fr(q.a).length <= 6, q.t);
  }
  assert.ok(dens.size >= 5, 'denominators seen: ' + [...dens].join(' '));
  for (const age of [8, 9]) {
    const young = deciSample(3, age, 'moyen', 'fr', 3000, 700 + age);
    assert.ok(!young.some((q) => EX.bridge(q.t)), 'the bridge reached age ' + age);
  }
});

test('deci caps every family so the classic drill keeps its rhythm', () => {
  const grid = (level, age, diff) => {
    const qs = deciSample(level, age, diff, 'fr', 6000, 5150 + level * 17 + age);
    const n = qs.length;
    return {
      pv: qs.filter((q) => isPlaceValue(q.t)).length / n,
      ex: qs.filter((q) => isApplied(q.t)).length / n,
      classic: qs.filter((q) => !isPlaceValue(q.t) && !isApplied(q.t)).length / n
    };
  };
  for (const [level, age] of [[1, 8], [3, 11], [5, 13], [6, 14]]) {
    const g = grid(level, age, 'moyen');
    assert.ok(g.ex > 0.12 && g.ex < 0.26, `L${level}/${age} applied share ${g.ex.toFixed(2)}`);
    assert.ok(g.classic > 0.33, `L${level}/${age} classic share ${g.classic.toFixed(2)}`);
    assert.ok(Math.abs(g.pv + g.ex + g.classic - 1) < 1e-9);
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

/* ---------- measures: money, time, geometry ---------- */

function mesSample(level, age, diff, lang, n, seed) {
  const random = mulberry32(seed);
  const out = [];
  for (let i = 0; i < n; i++) out.push(generateQuestion(level, { mode: 'mes', age, diff, lang, random }));
  return out;
}

const MES = {
  units: (t) => / (?:m|cm|km|kg|L) = \? (?:cm|m|mm|g|mL)$/.test(t),
  money: (t) => EX.money(t),
  time: (t) => /= \? (?:min|h|s)$/.test(t),
  geo: (t) => /^(?:Aire|Périmètre|Area|Perimeter)/.test(t)
};

test('every measure prompt belongs to exactly one bucket', () => {
  for (const lang of ['fr', 'en']) {
    for (const q of mesSample(4, 12, 'moyen', lang, 3000, 4120 + lang.length)) {
      const hits = Object.keys(MES).filter((k) => MES[k](q.t));
      assert.equal(hits.length, 1, `${q.t} → ${hits.join('+') || 'none'}`);
    }
  }
});

test('mes caps its buckets so units and time keep the lead', () => {
  const grid = (level, age) => {
    const qs = mesSample(level, age, 'moyen', 'fr', 6000, 6100 + level * 19 + age);
    const share = {};
    for (const k of Object.keys(MES)) share[k] = qs.filter((q) => MES[k](q.t)).length / qs.length;
    return share;
  };
  for (const [level, age] of [[1, 8], [4, 11], [6, 14]]) {
    const g = grid(level, age);
    assert.ok(g.units > 0.33 && g.units < 0.60, `L${level}/${age} units ${g.units.toFixed(2)}`);
    assert.ok(g.money > 0.08 && g.money < 0.19, `L${level}/${age} money ${g.money.toFixed(2)}`);
    assert.ok(g.time > 0.16 && g.time < 0.30, `L${level}/${age} time ${g.time.toFixed(2)}`);
    assert.ok(g.geo > 0.06 && g.geo < 0.30, `L${level}/${age} geometry ${g.geo.toFixed(2)}`);
  }
  /* Geometry has to grow with the player; units have to shrink. */
  assert.ok(grid(6, 14).geo > grid(1, 8).geo * 1.8);
  assert.ok(grid(6, 14).units < grid(1, 8).units);
});

test('every time answer is one number the pad can type', () => {
  const shapes = {
    hToMin: /^\d+ h(?: \d\d)? = \? min$/,
    minToH: /^\d+ min = \? h$/,
    minToS: /^[\d,]+ min = \? s$/,
    sToMin: /^\d+ s = \? min$/,
    addDur: / \+ .+ = \? min$/,
    gap: /^(?:De|From) /
  };
  const seen = {};
  for (const lang of ['fr', 'en']) {
    for (const level of LEVELS) {
      for (const age of AGES) {
        for (const q of mesSample(level, age, 'moyen', lang, 400, 8000 + level * 23 + age)) {
          if (!MES.time(q.t)) continue;
          const kind = Object.keys(shapes).find((k) => shapes[k].test(q.t));
          assert.ok(kind, 'unknown time shape: ' + q.t);
          seen[kind] = (seen[kind] || 0) + 1;
          assert.ok(close(expectedFromText(q.t), q.a), `${q.t} → ${q.a}`);
          assert.ok(q.a > 0 && fr(q.a).length <= 6, `${q.t} → ${q.a}`);
          /* Minutes and seconds are whole; only « ? h » may carry a comma, in quarters. */
          if (/= \? (?:min|s)$/.test(q.t)) assert.ok(Number.isInteger(q.a), q.t + ' → ' + q.a);
          else assert.equal(Math.round(q.a * 4), q.a * 4, 'not a quarter of an hour: ' + q.t);
          if (/^\d+ h \d\d = /.test(q.t)) {
            assert.ok(+q.t.match(/^\d+ h (\d\d)/)[1] <= 59, 'minute out of range: ' + q.t);
          }
        }
      }
    }
  }
  for (const k of Object.keys(shapes)) assert.ok(seen[k] > 20, `time shape ${k} barely appears: ` + seen[k]);
});

test('clock gaps read forwards and stay inside the hour ladder', () => {
  for (const lang of ['fr', 'en']) {
    const qs = [].concat(
      mesSample(1, 8, 'moyen', lang, 3000, 181),
      mesSample(4, 11, 'moyen', lang, 3000, 411),
      mesSample(6, 14, 'expert', lang, 3000, 614)
    ).filter((q) => /^(?:De|From) /.test(q.t));
    assert.ok(qs.length > 400, 'clock gaps: ' + qs.length);
    for (const q of qs) {
      const m = q.t.match(/^(?:De|From) (.+?) (?:à|to) (.+) = \? min$/);
      assert.ok(m, q.t);
      const start = clockMinutes(m[1]), end = clockMinutes(m[2]);
      assert.ok(end > start, 'the clock runs backwards: ' + q.t);
      assert.equal(q.a, end - start, q.t);
      assert.ok(q.a <= 180, 'gap too wide for a mental answer: ' + q.t);
      for (const side of [m[1], m[2]]) {
        const mins = side.match(/(?: h |:)(\d\d)$/);
        if (mins) assert.ok(+mins[1] <= 59, 'minute out of range: ' + q.t);
      }
    }
  }
  /* The youngest always land on a whole hour: « combien de minutes jusqu'à 10 h ». */
  const young = mesSample(1, 8, 'moyen', 'fr', 3000, 808).filter((q) => /^De /.test(q.t));
  assert.ok(young.length > 50);
  for (const q of young) assert.match(q.t, /à \d+ h = \? min$/);
});

test('geometry grows from squares to rectangles and right triangles', () => {
  const kinds = (t) => ({
    square: /carré|square/.test(t),
    rect: /rectangle/.test(t),
    tri: /triangle de côtés|triangle with sides/.test(t),
    right: /triangle rectangle|right triangle/.test(t)
  });
  const has = (qs, k) => qs.some((q) => MES.geo(q.t) && kinds(q.t)[k]);

  for (const age of [8, 9]) {
    for (const level of LEVELS) {
      const qs = mesSample(level, age, 'expert', 'fr', 1500, 900 + level * 11 + age);
      assert.ok(!has(qs, 'rect'), `rectangles reached age ${age} L${level}`);
      assert.ok(!has(qs, 'right'), `half-base-times-height reached age ${age} L${level}`);
    }
  }
  const core = mesSample(4, 11, 'moyen', 'fr', 4000, 411);
  assert.ok(has(core, 'square') && has(core, 'rect') && has(core, 'tri'), 'the 6e core misses a shape');
  assert.ok(!has(core, 'right'), 'half-base-times-height leaked into the 6e core');
  const top = mesSample(6, 14, 'moyen', 'fr', 4000, 614);
  for (const k of ['square', 'rect', 'tri', 'right']) assert.ok(has(top, k), 'the top tier misses ' + k);

  for (const lang of ['fr', 'en']) {
    for (const q of mesSample(6, 14, 'moyen', lang, 4000, 640 + lang.length)) {
      if (!MES.geo(q.t)) continue;
      assert.ok(close(expectedFromText(q.t), q.a), `${q.t} → ${q.a}`);
      assert.ok(q.a > 0 && fr(q.a).length <= 6, `${q.t} → ${q.a}`);
      assert.match(q.t, / cm/, 'a shape without units: ' + q.t);
    }
  }
});

test('comp gives make-1 real weight from level 4', () => {
  const qs = [];
  for (let i = 0; i < 3000; i++) qs.push(generateQuestion(5, { mode: 'comp', age: 11, diff: 'moyen', lang: 'fr' }));
  const ones = qs.filter((q) => /= 1$/.test(q.t));
  assert.ok(ones.length / qs.length > 0.15, 'make-1 share ' + ones.length / qs.length);
  for (const q of ones) assert.ok(close(expectedFromText(q.t), q.a), q.t);
});

test('fuzz: every mode, level, age, difficulty and language re-derives its own answer', () => {
  let n = 0, longest = 0;
  for (const mode of FAM_KEYS) {
    for (const level of LEVELS) {
      for (const age of AGES) {
        for (const diff of DIFFS) {
          for (const lang of ['fr', 'en']) {
            const random = mulberry32(mode.length * 7919 + level * 613 + age * 71 + diff.length * 13 + lang.length);
            for (let i = 0; i < 150; i++) {
              const q = generateQuestion(level, { mode, age, diff, lang, random });
              assert.ok(Number.isFinite(q.a), q.t);
              assert.ok(q.tag && q.famKey && q.fam, q.t);
              assert.ok(close(expectedFromText(q.t), q.a), `${mode} L${level}/${age} ${diff} ${lang}: ${q.t} → ${q.a}`);
              const typed = fr(q.a).replace('-', '');
              assert.ok(/^[\d,]+$/.test(typed), 'not typable: ' + typed);
              assert.ok(typed.length <= 6, `${q.t} answers "${typed}"`);
              longest = Math.max(longest, q.t.length);
              n++;
            }
          }
        }
      }
    }
  }
  assert.ok(n >= 150000, 'fuzz ran ' + n + ' questions');
  /* The question card shrinks its font twice; past ~75 characters it would start to spill. */
  assert.ok(longest <= 75, 'longest prompt ' + longest);
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
