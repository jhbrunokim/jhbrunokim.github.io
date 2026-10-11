// Internationalization (i18n) Manager

// Pick the site locale from the browser's language preferences: the first
// tag whose primary subtag is ko, zh or ja wins (e.g. 'ko-KR' -> 'ko',
// 'zh-Hant-TW' -> 'zh'); anything else falls back to English. No network
// lookup. The inline <head> font script in each page carries a copy of this
// rule because it runs before any script file loads; keep them in sync.
function detectBrowserLanguage() {
  const SUPPORTED = ['ko', 'zh', 'ja'];
  const tags = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const tag of tags) {
    const primary = String(tag || '').toLowerCase().split('-')[0];
    if (SUPPORTED.includes(primary)) return primary;
  }
  return 'en';
}
window.detectBrowserLanguage = detectBrowserLanguage;

class I18nManager {
  constructor() {
    // Use 'preferredLanguage' key to match country-detector. With nothing
    // stored, follow the browser language so the first paint is localised.
    this.currentLang = localStorage.getItem('preferredLanguage') || detectBrowserLanguage();
    this.translations = null;
    this.init();
  }

  async init() {
    await this.loadTranslations();
    this.applyTranslations();
  }

  async loadTranslations() {
    try {
      const response = await fetch('./data/translations.json');
      this.translations = await response.json();
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  }

  applyTranslations() {
    if (!this.translations) return;

    const lang = this.translations[this.currentLang];
    if (!lang) return;

    // Keep <html lang> aligned with the active locale for a11y/SEO
    document.documentElement.setAttribute('lang', this.currentLang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const value = this.getNestedValue(lang, key);

      // An empty string is a real value (e.g. a service tag line that the
      // English UI leaves blank and hides with :empty), so apply it too.
      if (typeof value === 'string') {
        // Check if element has data-i18n-html attribute for HTML content
        if (element.hasAttribute('data-i18n-html')) {
          element.innerHTML = value;
        } else {
          element.textContent = value;
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const value = this.getNestedValue(lang, key);

      if (value) {
        element.placeholder = value;
      }
    });

    // Update accessible names of icon-only controls
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria-label');
      const value = this.getNestedValue(lang, key);

      if (value) {
        element.setAttribute('aria-label', value);
      }
    });

    // Update select option texts
    document.querySelectorAll('select option[data-i18n]').forEach(option => {
      const key = option.getAttribute('data-i18n');
      const value = this.getNestedValue(lang, key);

      if (value) {
        option.textContent = value;
      }
    });

    // Reinitialize icons after updating content
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Public method for changing language (called by country-detector)
  changeLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    this.ensureFontForLocale(lang);
    this.applyTranslations();
    // Let script-rendered content (e.g. articles) redraw in the new locale
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  // Load the CJK Google Font matching the newly selected locale so
  // switching languages doesn't leave the user staring at a fallback
  // system font. Idempotent — repeat calls with the same locale are
  // no-ops. Initial page load is handled by the inline <head> script.
  ensureFontForLocale(lang) {
    const CJK = { ko: 'Noto+Sans+KR', zh: 'Noto+Sans+SC', ja: 'Noto+Sans+JP' };
    const family = CJK[lang];
    if (!family) return;
    const id = `font-cjk-${lang}`;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;700&display=swap`;
    document.head.appendChild(link);
  }
}

// Initialize i18n manager when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  window.i18nManager = new I18nManager();
});
