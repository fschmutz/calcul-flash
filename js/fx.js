/** Canvas fireworks / stars / confetti. CSP-safe: no element.style writes. */

export function createFX(cv) {
  const cx = cv.getContext('2d');
  let parts = [], raf = 0, stop = 0, launcher = 0;
  const COL = ['#FF3E8A', '#FFC93C', '#3EE7B8', '#7A5CFF', '#FF8A3D', '#FFF4E8'];
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  function size() {
    cv.width = innerWidth * devicePixelRatio;
    cv.height = innerHeight * devicePixelRatio;
    cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  addEventListener('resize', size);

  function boom(x, y) {
    const c = pick(COL), n = 42 + Math.floor(Math.random() * 20);
    for (let i = 0; i < n; i++) {
      const a = Math.PI * 2 * i / n + Math.random() * 0.2, v = 1.6 + Math.random() * 3.4;
      parts.push({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 0.045,
        r: 2 + Math.random() * 2, c: Math.random() < 0.2 ? '#FFF4E8' : c,
        life: 1, dec: 0.011 + Math.random() * 0.012, shape: 'dot'
      });
    }
  }
  function star() {
    parts.push({
      x: Math.random() * innerWidth, y: -20,
      vx: (Math.random() - 0.5) * 0.8, vy: 1.4 + Math.random() * 2.2,
      g: 0.012, r: 5 + Math.random() * 7, c: pick(['#FFC93C', '#FFF4E8', '#3EE7B8']),
      life: 1, dec: 0.010, shape: 'star', rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.15
    });
  }
  function conf() {
    parts.push({
      x: Math.random() * innerWidth, y: -15,
      vx: (Math.random() - 0.5) * 1.6, vy: 1.2 + Math.random() * 2,
      g: 0.02, r: 4 + Math.random() * 4, c: pick(COL),
      life: 1, dec: 0.009, shape: 'rect', rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3
    });
  }
  function drawStar(p) {
    cx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? p.r * 0.45 : p.r, a = Math.PI / 5 * i + p.rot;
      cx[i ? 'lineTo' : 'moveTo'](p.x + Math.cos(a) * rr, p.y + Math.sin(a) * rr);
    }
    cx.closePath();
    cx.fill();
  }
  function frame() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.life -= p.dec;
      if (p.rot !== undefined) p.rot += p.vr;
      if (p.life <= 0 || p.y > innerHeight + 40) { parts.splice(i, 1); continue; }
      cx.globalAlpha = Math.max(0, Math.min(1, p.life));
      cx.fillStyle = p.c;
      if (p.shape === 'rect') {
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
        cx.fillRect(-p.r, -p.r * 0.6, p.r * 2, p.r * 1.2); cx.restore();
      } else if (p.shape === 'star') drawStar(p);
      else { cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.3); cx.fill(); }
    }
    cx.globalAlpha = 1;
    if (parts.length || Date.now() < stop) raf = requestAnimationFrame(frame);
    else { cancelAnimationFrame(raf); raf = 0; cx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  function play(kind, ms) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    size(); clearInterval(launcher); parts = []; stop = Date.now() + ms;
    const tickers = {
      feu: () => boom(innerWidth * (0.15 + Math.random() * 0.7), innerHeight * (0.12 + Math.random() * 0.38)),
      etoiles: () => { for (let i = 0; i < 3; i++) star(); },
      confettis: () => { for (let i = 0; i < 4; i++) conf(); }
    };
    const every = kind === 'feu' ? 300 : 100;
    tickers[kind]();
    launcher = setInterval(() => {
      if (Date.now() > stop) return clearInterval(launcher);
      tickers[kind]();
    }, every);
    if (!raf) frame();
  }
  function clear() {
    clearInterval(launcher); stop = 0; parts = [];
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    cx.clearRect(0, 0, innerWidth, innerHeight);
  }
  return { play, clear };
}
