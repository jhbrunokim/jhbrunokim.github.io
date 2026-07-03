// Cookie / analytics consent banner (PIPA / GDPR-compatible)
//
// Behavior:
// - On first visit, show a fixed bottom banner asking to allow analytics.
// - "Accept" → sets localStorage.analyticsConsent = 'granted' and loads GA
//   with the page's data-ga-id.
// - "Decline" → sets it to 'denied' and does not load GA.
// - Returning visitors: silently apply the stored choice.
//
// GA loading strategy:
// The page marks its GA config with a <meta name="ga-id" content="G-XXXX"> tag.
// If the tag is present and consent is granted, gtag.js is injected on the fly.
(function () {
  const STORAGE_KEY = 'analyticsConsent';

  function loadAnalytics() {
    const meta = document.querySelector('meta[name="ga-id"]');
    const gaId = meta?.getAttribute('content');
    if (!gaId || window.__gaLoaded) return;
    window.__gaLoaded = true;

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', gaId);
  }

  function getLabel(key, fallback) {
    const lang = window.i18nManager?.currentLang || 'en';
    return window.i18nManager?.translations?.[lang]?.consent?.[key] || fallback;
  }

  function build() {
    const wrap = document.createElement('div');
    wrap.id = 'consent-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Cookie consent');
    wrap.className = 'fixed bottom-0 left-0 right-0 z-[70] bg-slate-900/95 backdrop-blur-md border-t border-slate-700 text-slate-100 px-6 py-4 shadow-2xl';
    wrap.innerHTML = `
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <p class="text-sm leading-relaxed flex-1" data-i18n="consent.message">
          이 사이트는 서비스 개선을 위해 Google Analytics 쿠키를 사용합니다. 동의하시면 분석 도구를 사용합니다.
        </p>
        <div class="flex gap-2 shrink-0">
          <button type="button" id="consent-decline"
            class="px-4 py-2 text-sm font-medium rounded-md border border-slate-600 hover:bg-slate-800 transition-colors"
            data-i18n="consent.decline">거부</button>
          <button type="button" id="consent-accept"
            class="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-500 transition-colors"
            data-i18n="consent.accept">동의</button>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);
    if (window.i18nManager) window.i18nManager.applyTranslations();

    const done = (choice) => {
      localStorage.setItem(STORAGE_KEY, choice);
      wrap.remove();
      if (choice === 'granted') loadAnalytics();
    };
    document.getElementById('consent-accept').addEventListener('click', () => done('granted'));
    document.getElementById('consent-decline').addEventListener('click', () => done('denied'));
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'granted') {
    loadAnalytics();
    return;
  }
  if (stored === 'denied') return;

  // First visit: wait until layout is ready so the banner styling can apply
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build, { once: true });
  } else {
    build();
  }
})();
