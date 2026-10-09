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
    this.opener = null;
    this.onKeydown = (event) => {
      if (event.key === 'Escape') {
        this.closeModal();
      } else if (event.key === 'Tab') {
        this.trapFocus(event);
      }
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

    this.opener = document.activeElement;
    this.attachEventListeners();
    document.addEventListener('keydown', this.onKeydown);

    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    document.getElementById('country-modal-panel')?.focus();
  }

  // Keep Tab / Shift+Tab inside the dialog while it is open
  trapFocus(event) {
    const panel = document.getElementById('country-modal-panel');
    const focusable = panel
      ? Array.from(panel.querySelectorAll('button, select, [href], input, [tabindex]:not([tabindex="-1"])'))
      : [];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
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
    if (this.opener?.isConnected) this.opener.focus();
    this.opener = null;
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
