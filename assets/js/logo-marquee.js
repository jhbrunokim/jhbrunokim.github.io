// Support-scope logo marquee: pause/play control. Hover and keyboard focus
// also pause it (CSS); reduced-motion shows a static wrap and no control.
(function () {
  const marquee = document.querySelector('[data-marquee]');
  const toggle = document.querySelector('[data-marquee-toggle]');
  if (!marquee || !toggle) return;

  // Under reduced motion the CSS stops the track and hides the toggle.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  toggle.addEventListener('click', () => {
    const paused = marquee.classList.toggle('is-paused');
    const key = paused ? 'about.marqueePlay' : 'about.marqueePause';
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('data-i18n-aria-label', key);

    const i18n = window.i18nManager;
    const label = i18n && i18n.translations
      ? i18n.getNestedValue(i18n.translations[i18n.currentLang], key)
      : null;
    if (label) toggle.setAttribute('aria-label', label);

    toggle.innerHTML = `<i data-lucide="${paused ? 'play' : 'pause'}" class="w-4 h-4"></i>`;
    if (window.lucide) lucide.createIcons();
  });
})();
