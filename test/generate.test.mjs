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

/** Evaluate the printed prompt; must match q.a. */
export function expectedFromText(t) {
  const s = t.trim();
  let m;
  if ((m = s.match(/^\? \+ (.+) = (.+)$/))) return num(m[2]) - num(m[1]);
  if ((m = s.match(/^(.+) \+ \? = (.+)$/))) return num(m[2]) - num(m[1]);
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
});

for (const fam of FAMILIES) {
  test(`answers match printed expression: ${fam}`, () => {
    let n = 0;
    for (const level of [1, 2, 3, 4, 5, 6]) {
      for (const age of [8, 11, 14]) {
        for (const diff of ['facile', 'moyen', 'expert']) {
          for (const lang of ['fr', 'en']) {
            for (let i = 0; i < 8; i++) {
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
