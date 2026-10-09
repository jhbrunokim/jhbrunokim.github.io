// Diagram reveal: each [data-reveal] diagram plays its steps in order once
// it is 35 % in view, then stays. Hidden states only apply under the
// .js-reveal class added here, so diagrams are fully visible without JS;
// with reduced motion the class is never added and nothing animates.
(function () {
  const diagrams = document.querySelectorAll('[data-reveal]');
  if (!diagrams.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      observer.unobserve(e.target);
    });
  }, { threshold: 0.35 });
  diagrams.forEach(d => observer.observe(d));
})();
