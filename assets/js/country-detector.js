// Country Detection and Language Modal Manager
class CountryDetector {
  constructor() {
    this.modal = null;
    this.countryDropdown = null;
    this.continueButton = null;
    this.selectOtherButton = null;
    this.detectedCountry = null;

    // Country to language mapping
    this.countryToLanguage = {
      'KR': 'ko',
      'CN': 'zh',
      'JP': 'ja',
      'US': 'en'
    };

    this.init();
  }

  async init() {
    // Check if user has already selected a language
    const savedLanguage = localStorage.getItem('preferredLanguage');

    if (savedLanguage) {
      // Returning user: load saved language without showing modal
      if (window.i18nManager) {
        window.i18nManager.changeLanguage(savedLanguage);
      }
      return;
    }

    // First-time visitor: detect country and show modal
    this.detectedCountry = await this.detectCountry();
    this.showModal(this.detectedCountry);
  }

  async detectCountry() {
    try {
      const response = await fetch('https://get.geojs.io/v1/ip/country.json');
      const data = await response.json();
      return data.country; // Returns 'KR', 'CN', 'JP', 'US', etc.
    } catch (error) {
      console.error('Country detection failed:', error);
      return 'US'; // Default to US (English) if detection fails
    }
  }

  showModal(countryCode) {
    // Get modal element
    this.modal = document.getElementById('country-modal');
    if (!this.modal) {
      console.error('Country modal not found');
      return;
    }

    // Get modal UI elements
    this.countryDropdown = document.getElementById('country-select');
    this.continueButton = document.getElementById('modal-continue');
    this.selectOtherButton = document.getElementById('select-other');

    // Set detected country in dropdown
    if (this.countryDropdown) {
      this.countryDropdown.value = countryCode;
      this.updateModalText(countryCode);
    }

    // Attach event listeners
    this.attachEventListeners();

    // Show modal
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
  }

  attachEventListeners() {
    // Continue button
    if (this.continueButton) {
      this.continueButton.addEventListener('click', () => this.handleContinue());
    }

    // Country dropdown change
    if (this.countryDropdown) {
      this.countryDropdown.addEventListener('change', (e) => {
        this.updateModalText(e.target.value);
      });
    }

    // Select other button (show dropdown)
    if (this.selectOtherButton) {
      this.selectOtherButton.addEventListener('click', () => this.toggleDropdown());
    }
  }

  updateModalText(countryCode) {
    const countryNameElement = document.getElementById('detected-country-name');
    if (!countryNameElement) return;

    // Get current language from i18nManager or default to 'en'
    const currentLang = window.i18nManager?.currentLang || 'en';

    // Update modal text with selected country name
    fetch('./data/translations.json')
      .then(res => res.json())
      .then(translations => {
        const countryName = translations[currentLang]?.countryModal?.countries[countryCode] || countryCode;
        countryNameElement.textContent = countryName;
      })
      .catch(err => {
        console.error('Failed to load translations:', err);
        countryNameElement.textContent = countryCode;
      });
  }

  toggleDropdown() {
    const dropdownContainer = document.getElementById('country-dropdown-container');
    if (dropdownContainer) {
      dropdownContainer.classList.toggle('hidden');
    }
  }

  handleContinue() {
    const selectedCountry = this.countryDropdown?.value || this.detectedCountry;
    const targetLanguage = this.countryToLanguage[selectedCountry] || 'en';

    // Save language to localStorage
    localStorage.setItem('preferredLanguage', targetLanguage);

    // Change language
    if (window.i18nManager) {
      window.i18nManager.changeLanguage(targetLanguage);
    }

    // Close modal
    this.closeModal();
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.add('hidden');
      this.modal.classList.remove('flex');
    }
  }

  // Public method to reopen modal (for language change button)
  reopenModal() {
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

    // Map language back to country code
    const languageToCountry = {
      'ko': 'KR',
      'zh': 'CN',
      'ja': 'JP',
      'en': 'US'
    };

    const currentCountry = languageToCountry[currentLanguage] || 'US';
    this.showModal(currentCountry);
  }
}

// Initialize country detector when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.countryDetector = new CountryDetector();
});
