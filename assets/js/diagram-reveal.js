// Diagram reveal. Two modes on [data-reveal] containers:
// - "timed" (or a bare attribute): the steps play in order once the diagram
//   is 35 % in view (CSS transition delays), then stay.
// - "scroll": the reveal is scrubbed by scroll position. Progress --p runs
//   from 0 (diagram top at the viewport bottom) to 1 (top at 40 % of the
//   viewport height), never decreases, and each step gets its own --k
//   (0..1) from its --step slot out of --steps. At p = 1 the diagram gets
//   .is-in and stops updating. A diagram already past the threshold on
//   load plays the same progress on a timer instead (see play()).
// Hidden states only apply under the .js-reveal class added here, so
// diagrams are fully visible without JS; with reduced motion the class is
// never added and nothing animates.
(function () {
  const diagrams = document.querySelectorAll('[data-reveal]');
  if (!diagrams.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal');

  const timed = [];
  const scrubbed = [];
  diagrams.forEach(d => (d.dataset.reveal === 'scroll' ? scrubbed : timed).push(d));

  if (timed.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        observer.unobserve(e.target);
      });
    }, { threshold: 0.35 });
    timed.forEach(d => observer.observe(d));
  }

  if (!scrubbed.length) return;

  const stepOf = el => parseFloat(el.style.getPropertyValue('--step')) || 0;
  const items = scrubbed.map(el => {
    const steps = Array.from(el.querySelectorAll('[data-reveal-step], [data-reveal-line]'));
    const declared = parseFloat(el.style.getPropertyValue('--steps'));
    const n = declared > 0 ? declared : Math.max(0, ...steps.map(stepOf)) + 1;
    return { el, n, steps: steps.map(s => ({ s, start: stepOf(s) / n })) };
  });
  let pending = items.slice();
  let ticking = false;

  // Write progress p (kept monotonic) as --p and each step's --k.
  function apply(item, p) {
    p = item.el._p = Math.max(item.el._p || 0, p);
    item.el.style.setProperty('--p', p.toFixed(3));
    item.steps.forEach(({ s, start }) => {
      const k = Math.min(1, Math.max(0, (p - start) * item.n));
      s.style.setProperty('--k', k.toFixed(3));
    });
    if (p >= 1) item.el.classList.add('is-in');
    return p;
  }

  // A diagram already past the threshold on the first measure (e.g. in the
  // first screen on desktop) would otherwise appear at once. Play it
  // instead: tween p 0 -> 1 (ease-out, 2200 ms) starting 250 ms after load,
  // through the same --k path. Scroll updates skip it while it runs.
  function play(item) {
    const begin = () => setTimeout(() => {
      const t0 = performance.now();
      const frame = now => {
        const t = Math.min(1, (now - t0) / 2200);
        if (apply(item, 1 - Math.pow(1 - t, 3)) < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }, 250);
    if (document.readyState === 'complete') begin();
    else window.addEventListener('load', begin, { once: true });
  }

  function update(first) {
    ticking = false;
    const vh = window.innerHeight;
    pending = pending.filter(item => {
      const top = item.el.getBoundingClientRect().top;
      const raw = Math.min(1, Math.max(0, (vh - top) / (0.6 * vh)));
      if (first === true && raw >= 1) {
        play(item);
        return false;
      }
      return apply(item, raw) < 1;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update(true);
  // Layout (fonts, injected navbar) can still move the diagram after this
  // script runs; re-measure once everything has loaded.
  window.addEventListener('load', onScroll);
  document.addEventListener('layoutLoaded', onScroll);
})();
