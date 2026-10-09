// Language preference + language chooser modal.
// First visit: the locale follows the browser language (no network lookup,
// no modal). Visitors switch language through the navbar globe buttons,
// which call reopenModal(). The file and element ids keep their historical
// "country" names because layout.js and the navbar reference them.
const SUPPORTED_LANGUAGES = ['ko', 'en', 'zh', 'ja'];

class CountryDetector {
  constructor() {
    this.modal = null;
    this.languageSelect = null;
    this.listenersAttached = false;
    this.onKeydown = (event) => {
      if (event.key === 'Escape') this.closeModal();
    };

    this.init();
  }

  init() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const language = savedLanguage || window.detectBrowserLanguage?.() || 'en';

    // Returning visitors keep their choice; first-time visitors get the
    // browser language, which changeLanguage() also persists.
    if (window.i18nManager) {
      window.i18nManager.changeLanguage(language);
    }
  }

  showModal() {
    this.modal = document.getElementById('country-modal');
    if (!this.modal) {
      console.error('Language modal not found');
      return;
    }

    this.languageSelect = document.getElementById('country-select');
    if (this.languageSelect) {
      const current = window.i18nManager?.currentLang
        || localStorage.getItem('preferredLanguage')
        || 'en';
      this.languageSelect.value = SUPPORTED_LANGUAGES.includes(current) ? current : 'en';
    }

    this.attachEventListeners();
    document.addEventListener('keydown', this.onKeydown);

    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
  }

  // The modal markup is injected once by layout.js, so bind its listeners once.
  attachEventListeners() {
    if (this.listenersAttached) return;
    this.listenersAttached = true;

    document.getElementById('modal-continue')
      ?.addEventListener('click', () => this.handleContinue());
    document.getElementById('modal-close')
      ?.addEventListener('click', () => this.closeModal());

    // Clicking the backdrop (outside the panel) closes the modal
    this.modal.addEventListener('click', (event) => {
      if (event.target === this.modal) this.closeModal();
    });
  }

  handleContinue() {
    const selected = this.languageSelect?.value;
    const targetLanguage = SUPPORTED_LANGUAGES.includes(selected) ? selected : 'en';

    if (window.i18nManager) {
      window.i18nManager.changeLanguage(targetLanguage);
    } else {
      localStorage.setItem('preferredLanguage', targetLanguage);
    }

    this.closeModal();
  }

  closeModal() {
    document.removeEventListener('keydown', this.onKeydown);
    if (this.modal) {
      this.modal.classList.add('hidden');
      this.modal.classList.remove('flex');
    }
  }

  // Public method to open the language chooser (navbar globe buttons)
  reopenModal() {
    this.showModal();
  }
}

// Initialize when DOM is ready (after i18n.js has created i18nManager)
document.addEventListener('DOMContentLoaded', () => {
  window.countryDetector = new CountryDetector();
});
