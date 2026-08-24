import { APP_VERSION } from './version.js';
import { STR } from './i18n.js';
import { generateQuestion, fr } from './generate.js';
import { createFX } from './fx.js';

const $ = (id) => document.getElementById(id);
const LS_LANG = 'calcul-flash-lang';
const LS_PLAYER = 'calcul-flash-player';
const LS_RECORDS = 'calcul-flash-records';

let lang = 'fr';
let mode = 'tables', duration = 60, diff = 'moyen';
let player = { name: 'Paloma', age: 11 };
let records = {};

const AGE_BASE = { 8: 1, 9: 1, 10: 2, 11: 2, 12: 3, 13: 4, 14: 4 };
function D() {
  const b = AGE_BASE[player.age] || 2;
  const c = {
    facile: { start: Math.max(1, b - 1), max: Math.max(2, b + 1), penalty: 2, bonus: 1, step: 4 },
    moyen: { start: b, max: Math.min(6, b + 2), penalty: 3, bonus: 1.35, step: 4 },
    expert: { start: Math.min(6, b + 1), max: Math.min(6, b + (player.age <= 9 ? 2 : 3)), penalty: 4, bonus: 2, step: 3 }
  }[diff];
  c.min = Math.max(1, c.start - 1);
  c.name = S().diffName[diff];
  return c;
}
function S() { return STR[lang] || STR.fr; }

function detectLang() {
  try {
    const saved = localStorage.getItem(LS_LANG);
    if (saved === 'en' || saved === 'fr') return saved;
  } catch { /* ignore */ }
  const nav = (navigator.language || 'fr').toLowerCase();
  if (nav.startsWith('fr')) return 'fr';
  return 'fr';
}

function loadPersisted() {
  try {
    const rec = JSON.parse(localStorage.getItem(LS_RECORDS) || '{}');
    if (rec && typeof rec === 'object' && !Array.isArray(rec)) records = rec;
  } catch { records = {}; }
  try {
    const p = JSON.parse(localStorage.getItem(LS_PLAYER) || 'null');
    if (p && typeof p === 'object') {
      if (typeof p.name === 'string' && p.name.trim()) player.name = p.name.trim().slice(0, 14);
      const age = +p.age;
      if (age >= 8 && age <= 14) player.age = age;
    }
  } catch { /* keep defaults */ }
}

function savePlayer() {
  try { localStorage.setItem(LS_PLAYER, JSON.stringify({ name: player.name, age: player.age })); }
  catch { /* quota */ }
}
function saveRecords() {
  try { localStorage.setItem(LS_RECORDS, JSON.stringify(records)); }
  catch { /* quota */ }
}
function saveLang() {
  try { localStorage.setItem(LS_LANG, lang); }
  catch { /* quota */ }
}

function applyI18n() {
  const T = S();
  document.documentElement.lang = T.htmlLang;
  document.title = T.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', T.description);
  const skip = document.querySelector('.skip');
  if (skip) skip.textContent = T.skip;
  const ns = document.querySelector('.noscript-msg');
  if (ns) ns.textContent = T.noscript;
  $('updateText').textContent = T.update;
  $('reloadBtn').textContent = T.reload;
  document.querySelector('.lang').setAttribute('aria-label', T.langGroup);
  $('langFr').setAttribute('aria-pressed', lang === 'fr' ? 'true' : 'false');
  $('langEn').setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
  $('mute').setAttribute('aria-label', muted ? T.muteOff : T.muteOn);
  $('tagline').textContent = T.tagline(player.name);
  $('whoEyebrow').textContent = T.whoEyebrow;
  $('pname').placeholder = T.namePh;
  $('ageEyebrow').textContent = T.ageEyebrow;
  $('ageHint').textContent = T.ageHint[player.age] || T.ageHintFallback;
  $('toSetup').textContent = T.go;
  $('setup1').textContent = T.setup1;
  $('diffEyebrow').textContent = T.setup2(player.age);
  $('setup3').textContent = T.setup3;
  const modes = ['tables', 'addsub', 'comp', 'deci', 'frac', 'mes', 'malin', 'mix'];
  const ids = { tables: 'mTables', addsub: 'mAddsub', comp: 'mComp', deci: 'mDeci', frac: 'mFrac', mes: 'mMes', malin: 'mMalin', mix: 'mMix' };
  modes.forEach((k) => {
    $(ids[k]).textContent = T.fam[k];
    $(ids[k] + 'H').textContent = T.modeHint[k];
  });
  $('dFacile').textContent = T.diff.facile;
  $('dFacileH').textContent = T.diffHint.facile;
  $('dMoyen').textContent = T.diff.moyen;
  $('dMoyenH').textContent = T.diffHint.moyen;
  $('dExpert').textContent = T.diff.expert;
  $('dExpertH').textContent = T.diffHint.expert;
  $('dur2').textContent = T.dur2min;
  $('start').textContent = T.play;
  $('changePlayer').textContent = T.changePlayer;
  $('lblTime').textContent = T.time;
  $('lblScore').textContent = T.score;
  $('ans').textContent = T.typeAnswer;
  $('keyOk').textContent = T.ok;
  $('lblGood').textContent = T.justes;
  $('lblAcc').textContent = T.reussite;
  $('lblSpeed').textContent = T.perCalc;
  $('chalEyebrow').textContent = T.challenges;
  $('recapEyebrow').textContent = T.recap;
  $('again').textContent = T.again;
  $('back').textContent = T.back;
  $('verLabel').textContent = T.version;
  $('reloadLatest').textContent = T.reload;
  $('privacyLine').textContent = T.privacy;
  if (Sstate.running) paintLevel(false);
}

function setLang(next) {
  lang = next === 'en' ? 'en' : 'fr';
  saveLang();
  applyI18n();
}

/* ---------- sound ---------- */
let muted = false, actx = null, master = null;
function unlockAudio() {
  try {
    if (navigator.audioSession) navigator.audioSession.type = 'playback';
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (!master) { master = actx.createGain(); master.gain.value = 0.9; master.connect(actx.destination); }
    if (actx.state === 'suspended') actx.resume();
  } catch { /* no audio */ }
}
document.addEventListener('pointerdown', unlockAudio, { passive: true });
document.addEventListener('touchend', unlockAudio, { passive: true });
document.addEventListener('click', unlockAudio);
function beep(freq, dur, type) {
  if (muted) return;
  try {
    unlockAudio();
    if (!actx) return;
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type || 'triangle'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.28, actx.currentTime + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
    o.connect(g); g.connect(master || actx.destination); o.start(); o.stop(actx.currentTime + dur + 0.02);
  } catch { /* ignore */ }
}
const sGood = () => { beep(880, 0.09); setTimeout(() => beep(1320, 0.10), 70); };
const sBad = () => beep(150, 0.22, 'sawtooth');
const sUp = () => { beep(660, 0.08); setTimeout(() => beep(990, 0.08), 60); setTimeout(() => beep(1480, 0.14), 120); };
const sFanfare = () => { [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => beep(f, 0.16), i * 110)); };
$('mute').addEventListener('click', function () {
  muted = !muted;
  this.textContent = muted ? '🔇' : '🔊';
  this.setAttribute('aria-label', muted ? S().muteOff : S().muteOn);
  if (!muted) { unlockAudio(); sGood(); }
});

const FX = createFX($('fx'));

/* ---------- state ---------- */
let Sstate = {};
function reset() {
  Sstate = {
    running: false, left: duration, score: 0, streak: 0, bestStreak: 0, good: 0, total: 0,
    level: D().start, topLevel: D().start, q: null, typed: '', qStart: 0, log: [], recent: [], shownScore: 0
  };
}

function paintScore() {
  const target = Sstate.score;
  const step = () => {
    const d = target - Sstate.shownScore;
    if (Math.abs(d) < 1) { Sstate.shownScore = target; $('score').textContent = target; return; }
    Sstate.shownScore += d * 0.30;
    $('score').textContent = Math.round(Sstate.shownScore);
    requestAnimationFrame(step);
  };
  step();
}
function paintBumpers() {
  const s = Sstate.streak;
  for (let i = 0; i < 3; i++) $('b' + i).classList.toggle('on', (s % 3 === 0 && s > 0) ? true : (s % 3) > i);
  const m = $('multi');
  if (s >= 9) { m.textContent = '×3'; m.classList.add('on'); }
  else if (s >= 5) { m.textContent = '×2'; m.classList.add('on'); }
  else m.classList.remove('on');
}
function mult() { return Sstate.streak >= 9 ? 3 : Sstate.streak >= 5 ? 2 : 1; }
function paintLevel(up) {
  const el = $('lvl');
  el.textContent = S().level(Sstate.level);
  if (up) { el.classList.add('up'); setTimeout(() => el.classList.remove('up'), 700); }
}
function paintAnswer(bad) {
  const el = $('ans');
  el.classList.toggle('bad', !!bad);
  if (Sstate.typed === '') { el.classList.add('empty'); el.textContent = S().typeAnswer; }
  else { el.classList.remove('empty'); el.textContent = Sstate.typed; }
}
function drawQ() {
  let q, tries = 0;
  do {
    q = generateQuestion(Sstate.level, { mode, diff, age: player.age, lang });
    tries++;
  } while (tries < 40 && Sstate.recent.indexOf(q.t) !== -1);
  Sstate.recent.push(q.t);
  if (Sstate.recent.length > 14) Sstate.recent.shift();
  return q;
}
function nextQ() {
  Sstate.q = drawQ(); Sstate.typed = ''; Sstate.qStart = performance.now();
  $('qtext').textContent = Sstate.q.t; $('qtag').textContent = Sstate.q.tag;
  const c = $('qcard'); c.classList.remove('in', 'good', 'bad'); void c.offsetWidth; c.classList.add('in');
  paintAnswer(false);
}

function answerString() { return fr(Sstate.q.a); }
function ready() {
  return Sstate.typed !== '' && Sstate.typed !== '-' && !Sstate.typed.endsWith(',');
}
function submit() {
  if (!Sstate.running || !ready()) return;
  const given = parseFloat(Sstate.typed.replace(',', '.'));
  const ok = Math.abs(given - Sstate.q.a) < 1e-9;
  const secs = (performance.now() - Sstate.qStart) / 1000;
  Sstate.total++;
  const c = $('qcard');
  if (ok) {
    Sstate.good++; Sstate.streak++; Sstate.bestStreak = Math.max(Sstate.bestStreak, Sstate.streak);
    const speedBonus = secs < 2 ? 60 : secs < 4 ? 40 : secs < 7 ? 25 : 15;
    Sstate.score += Math.round((speedBonus + Sstate.level * 5) * mult() * D().bonus);
    Sstate.log.push({ t: Sstate.q.t, a: answerString(), ok: true, s: secs, fam: Sstate.q.fam, famKey: Sstate.q.famKey, tag: Sstate.q.tag });
    if (Sstate.streak === 5 || Sstate.streak === 9) sUp(); else sGood();
    c.classList.remove('in'); void c.offsetWidth; c.classList.add('good');
    paintScore(); paintBumpers();
    if (Sstate.streak > 0 && Sstate.streak % D().step === 0 && Sstate.level < D().max) {
      Sstate.level++; Sstate.topLevel = Math.max(Sstate.topLevel, Sstate.level); paintLevel(true);
    }
    setTimeout(nextQ, 150);
  } else {
    Sstate.streak = 0; Sstate.left = Math.max(0, Sstate.left - D().penalty);
    Sstate.log.push({ t: Sstate.q.t, a: answerString(), ok: false, given: Sstate.typed, s: secs, fam: Sstate.q.fam, famKey: Sstate.q.famKey, tag: Sstate.q.tag });
    sBad();
    c.classList.remove('in'); void c.offsetWidth; c.classList.add('bad');
    Sstate.typed = ''; paintAnswer(true); paintBumpers();
    if (Sstate.level > D().min && Sstate.total > 3 && Sstate.good / Sstate.total < 0.6) { Sstate.level--; paintLevel(false); }
    setTimeout(() => { if (Sstate.running) nextQ(); }, 420);
  }
}
function autoCheck() {
  if (ready() && Sstate.typed.length >= answerString().length) setTimeout(submit, 60);
}
function press(k) {
  if (!Sstate.running) return;
  if (k === 'ok') return submit();
  if (k === 'del') { Sstate.typed = Sstate.typed.slice(0, -1); return paintAnswer(false); }
  if (k === 'neg') {
    Sstate.typed = Sstate.typed.startsWith('-') ? Sstate.typed.slice(1) : '-' + Sstate.typed;
    paintAnswer(false); return autoCheck();
  }
  if (k === ',') {
    if (Sstate.typed === '' || Sstate.typed === '-' || Sstate.typed.includes(',')) return;
    Sstate.typed += ','; return paintAnswer(false);
  }
  if (Sstate.typed.replace('-', '').length >= 6) return;
  Sstate.typed += k; paintAnswer(false);
  autoCheck();
}
$('pad').addEventListener('click', (e) => {
  const b = e.target.closest('.key'); if (b) press(b.dataset.k);
});
document.addEventListener('keydown', (e) => {
  if (!Sstate.running) return;
  if (e.key >= '0' && e.key <= '9') press(e.key);
  else if (e.key === ',' || e.key === '.') press(',');
  else if (e.key === '-') press('neg');
  else if (e.key === 'Backspace') { e.preventDefault(); press('del'); }
  else if (e.key === 'Enter') press('ok');
});

let timer = null;
function tick() {
  Sstate.left -= 0.1;
  if (Sstate.left <= 0) { Sstate.left = 0; renderHud(); return finish(); }
  renderHud();
}
function renderHud() {
  const t = Math.ceil(Sstate.left);
  $('time').textContent = t;
  $('time').classList.toggle('low', t <= 10);
  $('bar').value = Math.round(Sstate.left / duration * 1000);
  $('bar').classList.toggle('low', t <= 10);
}
function begin() {
  reset(); Sstate.running = true;
  $('setup').classList.add('hide'); $('over').classList.add('hide'); $('play').classList.remove('hide');
  $('score').textContent = '0'; paintBumpers(); paintLevel(false); renderHud(); nextQ();
  clearInterval(timer); timer = setInterval(tick, 100);
}
function finish() {
  Sstate.running = false; clearInterval(timer);
  $('play').classList.add('hide'); $('over').classList.remove('hide');
  const T = S();
  const acc = Sstate.total ? Math.round(Sstate.good / Sstate.total * 100) : 0;
  const times = Sstate.log.filter((l) => l.ok).map((l) => l.s);
  const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  $('finalScore').textContent = Sstate.score;
  $('sGood').textContent = Sstate.good;
  $('sAcc').textContent = acc + '%';
  $('sSpeed').textContent = fr(Math.round(avg * 10) / 10) + 's';
  const rec = records[player.name] = records[player.name] || { facile: 0, moyen: 0, expert: 0 };
  const record = Sstate.score > rec[diff];
  rec[diff] = Math.max(rec[diff], Sstate.score);
  saveRecords();
  $('finalCap').textContent = record
    ? T.newRecord + '  ·  ' + T.level(Sstate.topLevel)
    : T.recordLine(D().name, rec[diff], Sstate.topLevel);
  if (record) sUp();

  const tags = $('chalTags'); tags.replaceChildren();
  const famLabel = T.fam[mode] || mode;
  const badges = [
    [famLabel, true],
    [D().name, true],
    [T.years(player.age), false],
    [T.levelOf(Sstate.topLevel, D().max), false],
    [duration < 120 ? T.durS(duration) : T.dur2min, false],
    [T.nCalcs(Sstate.total), false]
  ];
  badges.forEach(([txt, hi]) => {
    const s = document.createElement('span'); s.textContent = txt; if (hi) s.className = 'hi'; tags.appendChild(s);
  });
  const byFam = {};
  Sstate.log.forEach((l) => {
    const f = T.fam[l.famKey] || l.fam || '—';
    byFam[f] = byFam[f] || { ok: 0, n: 0, t: 0 };
    byFam[f].n++; byFam[f].t += l.s; if (l.ok) byFam[f].ok++;
  });
  const fl = $('famList'); fl.replaceChildren();
  Object.entries(byFam).sort((a, b) => b[1].n - a[1].n).forEach(([f, v]) => {
    const pct = Math.round(v.ok / v.n * 100), cls = pct >= 90 ? 'ok' : pct >= 70 ? 'mid' : 'ko';
    const li = document.createElement('li');
    const name = document.createElement('span'); name.textContent = f;
    const b = document.createElement('b'); b.className = cls;
    b.append(document.createTextNode(v.ok + '/' + v.n + ' '));
    const dim = document.createElement('span'); dim.className = 'dim-sm';
    dim.textContent = '· ' + fr(Math.round(v.t / v.n * 10) / 10) + ' s';
    b.append(dim);
    li.append(name, b);
    fl.appendChild(li);
  });

  FX.clear();
  const cb = $('celeb'); cb.className = 'celeb hide';
  if (Sstate.total >= 8) {
    let tier = null;
    if (acc >= 95) tier = { cls: 'or', icon: '🎆', fx: 'feu' };
    else if (acc >= 90) tier = { cls: 'arg', icon: '🌟', fx: 'etoiles' };
    else if (acc >= 80) tier = { cls: 'bro', icon: '🎉', fx: 'confettis' };
    if (tier) {
      cb.classList.remove('hide'); cb.classList.add(tier.cls);
      $('celebIcon').textContent = tier.icon;
      $('celebTitle').textContent = T.celeb[tier.fx].title;
      $('celebSub').textContent = T.celeb[tier.fx].sub(acc);
      FX.play(tier.fx, tier.fx === 'feu' ? 3400 : 2000);
      if (tier.fx === 'feu') sFanfare(); else sUp();
    }
  }

  let msg;
  if (acc >= 90 && avg < 3) msg = T.praise.fast(player.name);
  else if (acc >= 90) msg = T.praise.accurate(player.name);
  else if (acc >= 70) msg = T.praise.ok;
  else msg = T.praise.slow(player.name);
  if (acc >= 90 && avg < 3.5 && diff !== 'expert') msg += T.praise.next;
  $('praise').textContent = msg + (Sstate.bestStreak >= 5 ? T.praise.streak(Sstate.bestStreak) : '');

  const wrong = Sstate.log.filter((l) => !l.ok);
  const slow = Sstate.log.filter((l) => l.ok).sort((a, b) => b.s - a.s).slice(0, 3).filter((l) => l.s > 4);
  const list = $('recapList'); list.replaceChildren();
  wrong.slice(0, 6).forEach((l) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.append(document.createTextNode(l.t + ' = '));
    const b = document.createElement('b'); b.textContent = l.a;
    const s = document.createElement('s'); s.textContent = l.given;
    span.append(b, document.createTextNode(' '), s);
    li.append(span);
    list.appendChild(li);
  });
  slow.forEach((l) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.append(document.createTextNode(l.t + ' = '));
    const b = document.createElement('b'); b.textContent = l.a;
    span.append(b);
    const em = document.createElement('em'); em.textContent = fr(Math.round(l.s * 10) / 10) + ' s';
    li.append(span, em);
    list.appendChild(li);
  });
  $('recap').classList.toggle('hide', list.children.length === 0);
}

function restorePlayerUI() {
  $('pname').value = player.name;
  [...$('ages').children].forEach((c) => {
    c.setAttribute('aria-pressed', String(+c.dataset.age === player.age));
  });
}

$('ages').addEventListener('click', (e) => {
  const b = e.target.closest('.chip'); if (!b) return;
  [...$('ages').children].forEach((c) => c.setAttribute('aria-pressed', 'false'));
  b.setAttribute('aria-pressed', 'true'); player.age = +b.dataset.age;
  $('ageHint').textContent = S().ageHint[player.age];
  savePlayer();
});
$('toSetup').addEventListener('click', () => {
  const n = $('pname').value.trim();
  player.name = n === '' ? S().champ : n.charAt(0).toUpperCase() + n.slice(1);
  records[player.name] = records[player.name] || { facile: 0, moyen: 0, expert: 0 };
  savePlayer(); saveRecords();
  applyI18n();
  $('who').classList.add('hide'); $('setup').classList.remove('hide');
});
$('pname').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('toSetup').click(); });
$('changePlayer').addEventListener('click', () => {
  $('setup').classList.add('hide'); $('who').classList.remove('hide');
});

$('modes').addEventListener('click', (e) => {
  const b = e.target.closest('.chip'); if (!b) return;
  [...$('modes').children].forEach((c) => c.setAttribute('aria-pressed', 'false'));
  b.setAttribute('aria-pressed', 'true'); mode = b.dataset.mode;
});
$('diffs').addEventListener('click', (e) => {
  const b = e.target.closest('.chip'); if (!b) return;
  [...$('diffs').children].forEach((c) => c.setAttribute('aria-pressed', 'false'));
  b.setAttribute('aria-pressed', 'true'); diff = b.dataset.diff;
});
$('durs').addEventListener('click', (e) => {
  const b = e.target.closest('.chip'); if (!b) return;
  [...$('durs').children].forEach((c) => c.setAttribute('aria-pressed', 'false'));
  b.setAttribute('aria-pressed', 'true'); duration = +b.dataset.dur;
});
$('start').addEventListener('click', begin);
$('again').addEventListener('click', () => { FX.clear(); begin(); });
$('back').addEventListener('click', () => { FX.clear(); $('over').classList.add('hide'); $('setup').classList.remove('hide'); });

$('langFr').addEventListener('click', () => setLang('fr'));
$('langEn').addEventListener('click', () => setLang('en'));

function hardReload() {
  const go = () => location.reload();
  if (!navigator.serviceWorker) return go();
  navigator.serviceWorker.getRegistrations()
    .then((rs) => Promise.all(rs.map((r) => r.unregister())))
    .then(go)
    .catch(go);
}
$('reloadBtn').addEventListener('click', hardReload);
$('reloadLatest').addEventListener('click', hardReload);

async function checkVersion() {
  try {
    const r = await fetch('version.json', { cache: 'no-store' });
    const j = await r.json();
    if (j.version && j.version !== APP_VERSION) $('updateBanner').classList.remove('hide');
  } catch { /* offline */ }
}

$('verNum').textContent = APP_VERSION;
lang = detectLang();
loadPersisted();
restorePlayerUI();
applyI18n();
reset();
checkVersion();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
