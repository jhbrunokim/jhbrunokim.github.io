// Internationalization (i18n) Manager
class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'ko';
    this.translations = null;
    this.init();
  }

  async init() {
    await this.loadTranslations();
    this.createLanguageToggle();
    this.applyTranslations();
  }

  async loadTranslations() {
    try {
      const response = await fetch('/data/translations.json');
      this.translations = await response.json();
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  }

  applyTranslations() {
    if (!this.translations) return;

    const lang = this.translations[this.currentLang];
    if (!lang) return;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const value = this.getNestedValue(lang, key);

      if (value) {
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

    // Reinitialize icons after updating content
    lucide.createIcons();
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  switchLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.applyTranslations();
    this.updateLanguageToggle();
  }

  createLanguageToggle() {
    const desktopNav = document.querySelector('nav .hidden.md\\:flex');
    const mobileNav = document.querySelector('#mobile-menu .flex.flex-col');

    if (desktopNav) {
      const toggle = this.createToggle('desktop');
      desktopNav.appendChild(toggle);
    }

    if (mobileNav) {
      const toggle = this.createToggle('mobile');
      mobileNav.appendChild(toggle);
    }
  }

  createToggle(type) {
    const button = document.createElement('button');
    button.id = `lang-toggle-${type}`;
    button.className = type === 'desktop'
      ? 'text-slate-300 hover:text-blue-400 text-sm font-medium transition-colors'
      : 'mobile-link text-slate-300 hover:text-blue-400 text-base font-medium text-left';

    button.textContent = this.currentLang === 'ko' ? 'EN' : 'KO';

    button.addEventListener('click', () => {
      const newLang = this.currentLang === 'ko' ? 'en' : 'ko';
      this.switchLanguage(newLang);
    });

    return button;
  }

  updateLanguageToggle() {
    const buttons = document.querySelectorAll('[id^="lang-toggle-"]');
    buttons.forEach(button => {
      button.textContent = this.currentLang === 'ko' ? 'EN' : 'KO';
    });
  }
}

// Initialize i18n manager when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  window.i18nManager = new I18nManager();
});
