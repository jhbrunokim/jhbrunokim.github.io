// Follow the operating system's color-scheme preference.
// No manual toggle — theme mirrors the OS setting and reacts to live changes.
(function () {
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const apply = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
  };

  apply(media.matches);

  const listener = (e) => apply(e.matches);
  if (media.addEventListener) {
    media.addEventListener('change', listener);
  } else if (media.addListener) {
    // Safari < 14 fallback
    media.addListener(listener);
  }
})();
