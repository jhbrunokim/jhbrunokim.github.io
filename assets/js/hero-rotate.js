// Home hero collage: rotate the five photos through three sets (A → B → C → A)
// while the page is open. Set A is the markup's own src (preloaded, first
// paint); sets B and C come from each <img>'s data-rotate JSON array.
// Each change fades frame by frame (opacity only, see .hero-rotate__img in
// styles.css) so the collage never hard-cuts, and nothing runs where the
// collage is hidden (< lg) or the visitor prefers reduced motion.
(function () {
  const wrap = document.querySelector('[data-hero-rotate]');
  if (!wrap) return;

  const PERIOD = 60000; // ms between set changes; the first one is 60 s after load
  const STAGGER = 150;  // ms between consecutive frames within one change
  const FADE = 500;     // ms; matches the CSS opacity transition

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const parse = (value, fallback) => {
    try { return value ? JSON.parse(value) : fallback; } catch (e) { return fallback; }
  };

  // One entry per <img>: its three sources in set order. Set A keeps the
  // markup's width/height; alternates use data-rotate-sizes, else the
  // standard 800×1056 crop, so the attributes always describe the file shown.
  const frames = Array.from(wrap.querySelectorAll('img[data-rotate]')).map((img) => {
    const alts = parse(img.getAttribute('data-rotate'), []);
    const sizes = parse(img.getAttribute('data-rotate-sizes'), []);
    const sources = [{ src: img.getAttribute('src'), w: img.getAttribute('width'), h: img.getAttribute('height') }];
    alts.forEach((src, i) => {
      const size = sizes[i] || [800, 1056];
      sources.push({ src, w: String(size[0]), h: String(size[1]) });
    });
    return { img, sources, token: 0 };
  });
  if (!frames.length) return;
  const SETS = Math.min(...frames.map(f => f.sources.length));
  if (SETS < 2) return;

  // Warm cache: url → Promise<boolean> (true once fetched and decoded). The
  // Image objects stay referenced so the decoded bitmaps are not dropped.
  const warmed = new Map();
  const warmOne = (src) => {
    if (!warmed.has(src)) {
      const probe = new Image();
      probe.decoding = 'async';
      probe.src = src;
      const ready = (probe.decode ? probe.decode() : new Promise((ok, fail) => {
        probe.onload = ok; probe.onerror = fail;
      })).then(() => true, () => false);
      warmed.set(src, { probe, ready });
    }
    return warmed.get(src).ready;
  };
  const warmSet = (set) => Promise.all(frames.map(f => warmOne(f.sources[set].src)));

  let current = 0;      // set index on screen
  let started = false;  // warming has begun (only once the collage is visible)
  let timer = null;

  const isShown = () => window.getComputedStyle(wrap).display !== 'none';
  const canRun = () => started && !reduce.matches && !document.hidden && isShown();

  const swapFrame = (frame, source, delay) => {
    const token = ++frame.token;
    const { img } = frame;
    setTimeout(() => {
      if (token !== frame.token) return;
      img.classList.add('is-fading');
      setTimeout(() => {
        if (token !== frame.token) return;
        img.setAttribute('width', source.w);
        img.setAttribute('height', source.h);
        img.setAttribute('src', source.src);
        const reveal = () => { if (token === frame.token) img.classList.remove('is-fading'); };
        (img.decode ? img.decode() : Promise.resolve()).then(reveal, reveal);
      }, FADE);
    }, delay);
  };

  const schedule = () => {
    clearTimeout(timer);
    timer = canRun() ? setTimeout(tick, PERIOD) : null;
  };

  const tick = async () => {
    timer = null;
    const next = (current + 1) % SETS;
    const ok = await warmSet(next);
    if (!canRun()) return; // paused or hidden while warming; resume restarts the timer
    // A file that failed to warm keeps its frame on the previous photo for
    // this change rather than fading to a broken image.
    frames.forEach((frame, i) => {
      if (ok[i]) swapFrame(frame, frame.sources[next], i * STAGGER);
    });
    current = next;
    warmSet((next + 1) % SETS); // ready before the following change
    schedule();
  };

  const start = () => {
    if (reduce.matches || !isShown()) return;
    if (!started) {
      started = true;
      warmSet(1);
    }
    if (!timer) schedule();
  };

  const stop = () => {
    clearTimeout(timer);
    timer = null;
  };

  // Re-check visibility of the collage when the viewport crosses lg.
  let resizeFrame = 0;
  const onResize = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => (isShown() ? start() : stop()));
  };

  const init = () => {
    start();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    const onMotion = () => (reduce.matches ? stop() : start());
    if (reduce.addEventListener) reduce.addEventListener('change', onMotion);
  };

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });
})();
