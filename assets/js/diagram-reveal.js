// Diagram reveal. Two modes on [data-reveal] containers:
// - "timed" (or a bare attribute): the steps play in order once the diagram
//   is 35 % in view (CSS transition delays), then stay.
// - "scroll": the reveal is scrubbed by scroll position in both directions.
//   Progress --p runs from 0 (diagram top at 63 % of the viewport) to 1 (top
//   at the viewport top, or once a tall diagram has fully passed through),
//   and each step gets its own --k (0..1) from its --step slot out of
//   --steps. Scrolling back up undoes the steps again. A diagram already
//   past the threshold on load plays the progress on a timer instead and
//   then stays complete (see play()).
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
    return { el, n, steps: steps.map(s => ({ s, start: stepOf(s) / n })), state: 'scrub' };
  });
  let ticking = false;

  // Write progress p as --p and each step's --k; .is-in pins the end state
  // while p is 1 and is removed again when the reader scrolls back up.
  function apply(item, p) {
    item.el.style.setProperty('--p', p.toFixed(3));
    item.steps.forEach(({ s, start }) => {
      const k = Math.min(1, Math.max(0, (p - start) * item.n));
      s.style.setProperty('--k', k.toFixed(3));
    });
    item.el.classList.toggle('is-in', p >= 1);
  }

  // Progress window: 0 when the diagram's top is at 63 % of the viewport
  // (about a third of the way up), 1 when its top reaches the top of the
  // viewport, or later if the diagram is taller than the viewport, so the
  // whole diagram has been on screen (bottom within 92 %) by the time it finishes.
  function progressOf(el, vh) {
    const rect = el.getBoundingClientRect();
    const startTop = 0.63 * vh;
    const endTop = Math.min(0, 0.92 * vh - rect.height);
    return Math.min(1, Math.max(0, (startTop - rect.top) / (startTop - endTop)));
  }

  // A diagram already on screen at the first measure (e.g. in the first
  // screen on desktop) would otherwise sit half-drawn. Play it instead:
  // tween p 0 -> 1 (ease-out, 2200 ms) starting 250 ms after load, through
  // the same --k path, then leave it complete.
  function play(item) {
    item.state = 'playing';
    const begin = () => setTimeout(() => {
      const t0 = performance.now();
      const frame = now => {
        const t = Math.min(1, (now - t0) / 2200);
        apply(item, 1 - Math.pow(1 - t, 3));
        if (t < 1) requestAnimationFrame(frame);
        else item.state = 'done';
      };
      requestAnimationFrame(frame);
    }, 250);
    if (document.readyState === 'complete') begin();
    else window.addEventListener('load', begin, { once: true });
  }

  function update(first) {
    ticking = false;
    const vh = window.innerHeight;
    items.forEach(item => {
      if (item.state !== 'scrub') return;
      // Already on screen when the page opens (first screen on desktop, or a
      // restored scroll position): play it instead of leaving it half-drawn.
      if (first === true && item.el.getBoundingClientRect().top < 0.88 * vh) play(item);
      else apply(item, progressOf(item.el, vh));
    });
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
