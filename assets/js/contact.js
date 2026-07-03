// EmailJS Contact Form Handler
class ContactFormManager {
  constructor() {
    this.form = null;
    this.submitButton = null;
    this.statusMessage = null;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.form = document.getElementById('contact-form');
      this.submitButton = document.getElementById('contact-submit');
      this.statusMessage = document.getElementById('contact-status');

      if (this.form) {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      }

      // Add honeypot field for spam prevention (hidden from users)
      this.addHoneypot();
    });
  }

  t(key, fallback) {
    const lang = window.i18nManager?.currentLang || 'en';
    return window.i18nManager?.translations?.[lang]?.contactSection?.[key] || fallback;
  }

  addHoneypot() {
    if (!this.form) return;

    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'honeypot';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';

    this.form.appendChild(honeypot);
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Check honeypot (spam prevention)
    const honeypot = this.form.querySelector('[name="honeypot"]');
    if (honeypot && honeypot.value) {
      console.log('Spam detected');
      return;
    }

    // Get form data
    const formData = new FormData(this.form);
    const data = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    // Validate
    if (!this.validateForm(data)) {
      this.showStatus('error', this.t('validationError', 'Please fill in all fields.'));
      return;
    }

    // Show loading state
    this.setLoading(true);

    try {
      // EmailJS send
      // Replace these with your actual EmailJS credentials
      const serviceID = 'service_molk';
      const templateID = 'template_owc4fne';
      const publicKey = 'oxNyGY4Y3JcIsG6Ml';

      await emailjs.send(serviceID, templateID, data, publicKey);

      // Success
      this.showStatus('success', this.t('successMessage', 'Message sent successfully!'));

      this.form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.showStatus('error', this.t('errorMessage', 'Failed to send message. Please try again later.'));
    } finally {
      this.setLoading(false);
    }
  }

  validateForm(data) {
    return data.from_name &&
      data.from_email &&
      data.subject &&
      data.message &&
      this.validateEmail(data.from_email);
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  setLoading(isLoading) {
    if (!this.submitButton) return;

    if (isLoading) {
      const label = this.t('sending', 'Sending...');
      this.submitButton.disabled = true;
      this.submitButton.innerHTML =
        `<i data-lucide="loader" class="w-5 h-5 animate-spin inline mr-2"></i>${label}`;
    } else {
      const label = this.t('submitAgain', 'Send Message');
      this.submitButton.disabled = false;
      this.submitButton.innerHTML =
        `<i data-lucide="send" class="w-5 h-5 inline mr-2"></i>${label}`;
    }

    if (window.lucide) lucide.createIcons();
  }

  showStatus(type, message) {
    if (!this.statusMessage) return;

    this.statusMessage.textContent = message;
    this.statusMessage.className = `mt-4 p-4 rounded-lg text-sm font-medium ${type === 'success'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      }`;
    this.statusMessage.classList.remove('hidden');

    // Hide after 5 seconds
    setTimeout(() => {
      this.statusMessage.classList.add('hidden');
    }, 5000);
  }
}

// Initialize contact form manager
window.contactFormManager = new ContactFormManager();
