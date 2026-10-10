// Diagram reveal. Two modes on [data-reveal] containers:
// - "timed" (or a bare attribute): the steps play in order once the diagram
//   is 35 % in view (CSS transition delays), then stay.
// - "scroll": the reveal is scrubbed by scroll position. Progress --p runs
//   from 0 (diagram top at the viewport bottom) to 1 (top at 40 % of the
//   viewport height), never decreases, and each step gets its own --k
//   (0..1) from its --step slot out of --steps. At p = 1 the diagram gets
//   .is-in and stops updating.
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

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    pending = pending.filter(item => {
      const top = item.el.getBoundingClientRect().top;
      const raw = Math.min(1, Math.max(0, (vh - top) / (0.6 * vh)));
      const p = item.el._p = Math.max(item.el._p || 0, raw);
      item.el.style.setProperty('--p', p.toFixed(3));
      const w = 1 / item.n;
      item.steps.forEach(({ s, start }) => {
        const k = Math.min(1, Math.max(0, (p - start) / w));
        s.style.setProperty('--k', k.toFixed(3));
      });
      if (p >= 1) {
        item.el.classList.add('is-in');
        return false;
      }
      return true;
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
  update();
  // Layout (fonts, injected navbar) can still move the diagram after this
  // script runs; re-measure once everything has loaded.
  window.addEventListener('load', onScroll);
  document.addEventListener('layoutLoaded', onScroll);
})();
