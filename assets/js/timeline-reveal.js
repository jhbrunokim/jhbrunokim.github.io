// Home timeline: reveal each year as it scrolls into view and grow the
// rail fill down to the latest revealed dot. Plays once, like a progress rail.
(function () {
  const timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;

  const items = Array.from(timeline.querySelectorAll('[data-timeline-item]'));
  const fill = timeline.querySelector('[data-timeline-fill]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fill reaches the centre of the last revealed dot (items are positioned
  // relative to the timeline; dots are positioned relative to their item).
  const updateFill = () => {
    if (!fill) return;
    const shown = items.filter(i => i.classList.contains('is-in'));
    const last = shown[shown.length - 1];
    const dot = last && last.querySelector('.tl-dot');
    fill.style.height = dot ? `${last.offsetTop + dot.offsetTop}px` : '0px';
  };

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(i => i.classList.add('is-in'));
    updateFill();
  } else {
    document.documentElement.classList.add('js-timeline');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        observer.unobserve(e.target);
      });
      updateFill();
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
    items.forEach(i => observer.observe(i));
  }

  // Card heights change with fonts, language and viewport width.
  if ('ResizeObserver' in window) new ResizeObserver(updateFill).observe(timeline);
  window.addEventListener('resize', updateFill);
})();
