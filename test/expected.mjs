/**
 * The oracle: re-derive the answer from the prompt the player actually reads, with no help from
 * `js/generate.js`. It lives in its own module so a browser play-through can import it from the
 * running page and score a real round with the very same evaluator the tests use.
 */

export function num(s) {
  return parseFloat(String(s).trim().replace(',', '.'));
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

export function rankOf(word) {
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

/** Cut a positive decimal at p decimals, on the digits: floor, and floor + one unit of that place. */
export function cutAt(s, p, up) {
  const { int, dec } = splitDigits(s);
  if (dec.length <= p) throw new Error('nothing to cut at ' + p + ' in ' + s);
  const kept = parseInt(int.join('') + dec.slice(0, p).join(''), 10);
  return (kept + (up ? 1 : 0)) / Math.pow(10, p);
}

const CUT_PLACE = { "à l'unité": 0, 'au dixième': 1, 'au centième': 2, unit: 0, tenth: 1, hundredth: 2 };

export function cutPlace(word) {
  const p = CUT_PLACE[word];
  if (p === undefined) throw new Error('unknown rounding place: ' + word);
  return p;
}

/** « 1 h 45 », « 2 h » or « 35 min » in minutes. */
function durMinutes(s) {
  let m = s.match(/^(\d+) h (\d+)$/);
  if (m) return +m[1] * 60 + +m[2];
  m = s.match(/^(\d+) h$/);
  if (m) return +m[1] * 60;
  m = s.match(/^(\d+) min$/);
  if (m) return +m[1];
  throw new Error('unparsed duration: ' + s);
}

/** « 14 h 20 », « 15 h » (FR) or « 14:20 » (EN) as minutes since midnight. */
export function clockMinutes(s) {
  let m = s.match(/^(\d+) h (\d+)$/) || s.match(/^(\d+):(\d+)$/);
  if (m) return +m[1] * 60 + +m[2];
  m = s.match(/^(\d+) h$/);
  if (m) return +m[1] * 60;
  throw new Error('unparsed clock time: ' + s);
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
    const den = +m[2];
    const exact = Math.round(num(m[1]) * den);
    /* Powers of ten are the decimal-fraction item; anything else is the fraction bridge. */
    if (Math.pow(10, dec) !== den && Math.abs(num(m[1]) * den - exact) > 1e-9) {
      throw new Error('numerator is not whole: ' + s);
    }
    return exact;
  }
  if ((m = s.match(/^Arrondi (.+) par défaut de ([\d,]+)$/))) return cutAt(m[2], cutPlace(m[1]), false);
  if ((m = s.match(/^Troncature (.+) de ([\d,]+)$/))) return cutAt(m[2], cutPlace(m[1]), false);
  if ((m = s.match(/^Arrondi (.+) par excès de ([\d,]+)$/))) return cutAt(m[2], cutPlace(m[1]), true);
  if ((m = s.match(/^Round ([\d,]+) down to the (.+)$/))) return cutAt(m[1], cutPlace(m[2]), false);
  if ((m = s.match(/^Truncate ([\d,]+) to the (.+)$/))) return cutAt(m[1], cutPlace(m[2]), false);
  if ((m = s.match(/^Round ([\d,]+) up to the (.+)$/))) return cutAt(m[1], cutPlace(m[2]), true);
  if ((m = s.match(/^(?:Le milieu de|Halfway between) ([\d,]+) (?:et|and) ([\d,]+)$/))) {
    return (num(m[1]) + num(m[2])) / 2;
  }
  if ((m = s.match(/^([\d,]+) € = \? (?:centimes|cents)$/))) return Math.round(num(m[1]) * 100);
  if ((m = s.match(/^(\d+) (?:centimes|cents) = \? €$/))) return +m[1] / 100;
  if ((m = s.match(/^(.+) m = \? cm$/))) return Math.round(num(m[1]) * 100);
  if ((m = s.match(/^(.+) km = \? m$/))) return Math.round(num(m[1]) * 1000);
  if ((m = s.match(/^(.+) cm = \? m$/))) return Math.round(num(m[1])) / 100;
  if ((m = s.match(/^(.+) kg = \? g$/))) return Math.round(num(m[1]) * 1000);
  if ((m = s.match(/^(.+) L = \? mL$/))) return Math.round(num(m[1]) * 1000);
  if ((m = s.match(/^(.+) \+ (.+) = \? min$/))) return durMinutes(m[1]) + durMinutes(m[2]);
  if ((m = s.match(/^(?:De|From) (.+?) (?:à|to) (.+) = \? min$/))) {
    return clockMinutes(m[2]) - clockMinutes(m[1]);
  }
  if ((m = s.match(/^(\d+) s = \? min$/))) return +m[1] / 60;
  if ((m = s.match(/^(.+) = \? min$/))) return durMinutes(m[1]);
  if ((m = s.match(/^(\d+) min = \? h$/))) return num(m[1]) / 60;
  if ((m = s.match(/^(.+) min = \? s$/))) return Math.round(num(m[1]) * 60);
  if ((m = s.match(/^Aire d'un carré de côté (\d+) cm$/))) return (+m[1]) * (+m[1]);
  if ((m = s.match(/^Périmètre d'un carré de côté (\d+) cm$/))) return 4 * (+m[1]);
  if ((m = s.match(/^Area of a square of side (\d+) cm$/))) return (+m[1]) * (+m[1]);
  if ((m = s.match(/^Perimeter of a square of side (\d+) cm$/))) return 4 * (+m[1]);
  if ((m = s.match(/^Aire d'un rectangle de (\d+) cm sur (\d+) cm$/)) ||
      (m = s.match(/^Area of a (\d+) cm by (\d+) cm rectangle$/))) {
    return (+m[1]) * (+m[2]);
  }
  if ((m = s.match(/^Périmètre d'un rectangle de (\d+) cm sur (\d+) cm$/)) ||
      (m = s.match(/^Perimeter of a (\d+) cm by (\d+) cm rectangle$/))) {
    return 2 * (+m[1] + +m[2]);
  }
  if ((m = s.match(/^Périmètre d'un triangle de côtés (\d+), (\d+) et (\d+) cm$/)) ||
      (m = s.match(/^Perimeter of a triangle with sides (\d+), (\d+) and (\d+) cm$/))) {
    const sides = [+m[1], +m[2], +m[3]].sort((x, y) => x - y);
    if (sides[0] + sides[1] <= sides[2]) throw new Error('impossible triangle: ' + s);
    return sides[0] + sides[1] + sides[2];
  }
  if ((m = s.match(/^Aire d'un triangle rectangle de (\d+) cm sur (\d+) cm$/)) ||
      (m = s.match(/^Area of a right triangle (\d+) cm by (\d+) cm$/))) {
    return (+m[1]) * (+m[2]) / 2;
  }
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
