// Internationalization (i18n) Manager
class I18nManager {
  constructor() {
    // Use 'preferredLanguage' key to match country-detector
    // Default to English ('en')
    this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
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
    this.applyTranslations();
  }
}

// Initialize i18n manager when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  window.i18nManager = new I18nManager();
});
