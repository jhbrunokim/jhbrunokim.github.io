// EmailJS Contact Form Handler
// Handles every form marked [data-contact-form]: the inline form on the home
// page and the contact modal injected on every page by layout.js.
class ContactFormManager {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      // EmailJS SDK is loaded with defer, so it's ready by the time
      // DOMContentLoaded fires. Init here instead of inline in <head>.
      if (window.emailjs) {
        emailjs.init('oxNyGY4Y3JcIsG6Ml');
      }

      this.bindForms();
    });

    // The modal form arrives with the layout components
    document.addEventListener('layoutLoaded', () => this.bindForms());
  }

  bindForms() {
    document.querySelectorAll('form[data-contact-form]').forEach(form => {
      if (form.dataset.contactBound) return;
      form.dataset.contactBound = 'true';

      form.addEventListener('submit', (e) => this.handleSubmit(e, form));

      // Add honeypot field for spam prevention (hidden from users)
      this.addHoneypot(form);
    });
  }

  t(key, fallback) {
    const lang = window.i18nManager?.currentLang || 'en';
    return window.i18nManager?.translations?.[lang]?.contactSection?.[key] || fallback;
  }

  addHoneypot(form) {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'honeypot';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';

    form.appendChild(honeypot);
  }

  // Which page and which link the enquiry came from. Only added to the
  // outgoing email; nothing is shown to the visitor.
  getSource(form) {
    const dialog = form.closest('dialog');
    const entry = dialog ? (dialog.dataset.source || 'unknown') : 'index-inline-form';
    const page = `${document.title} (${window.location.pathname}${window.location.search}${window.location.hash})`;
    const lang = window.i18nManager?.currentLang || 'unknown';
    return { page, entry, lang };
  }

  async handleSubmit(e, form) {
    e.preventDefault();

    // Check honeypot (spam prevention)
    const honeypot = form.querySelector('[name="honeypot"]');
    if (honeypot && honeypot.value) {
      console.log('Spam detected');
      return;
    }

    // Get form data
    const formData = new FormData(form);
    const data = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    // Consent gate (PIPA): checked first so the message is specific. The
    // value is never added to `data`, so it is not sent to EmailJS.
    const consent = form.querySelector('[name="privacyConsent"]');
    if (!consent?.checked) {
      consent?.setAttribute('aria-invalid', 'true');
      consent?.addEventListener('change', () => consent.removeAttribute('aria-invalid'), { once: true });
      consent?.focus();
      this.showStatus(form, 'error', this.t('consentRequired', '개인정보 수집 및 이용에 동의해 주세요.'));
      return;
    }

    // Validate
    if (!this.validateForm(data)) {
      this.showStatus(form, 'error', this.t('validationError', 'Please fill in all fields.'));
      return;
    }

    // Append the enquiry source to the message so it shows up even with the
    // current EmailJS template; also send it as separate template variables.
    const source = this.getSource(form);
    data.message += `\n\n──────────\n[문의 출처] ${source.page}\n[진입 지점] ${source.entry} · [언어] ${source.lang}`;
    data.source_page = source.page;
    data.source_entry = source.entry;
    data.source_lang = source.lang;

    // Show loading state
    this.setLoading(form, true);

    try {
      // EmailJS send
      // Replace these with your actual EmailJS credentials
      const serviceID = 'service_molk';
      const templateID = 'template_owc4fne';
      const publicKey = 'oxNyGY4Y3JcIsG6Ml';

      await emailjs.send(serviceID, templateID, data, publicKey);

      // Success
      this.showStatus(form, 'success', this.t('successMessage', 'Message sent successfully!'));

      form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.showStatus(form, 'error', this.t('errorMessage', 'Failed to send message. Please try again later.'));
    } finally {
      this.setLoading(form, false);
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

  setLoading(form, isLoading) {
    const submitButton = form.querySelector('[data-contact-submit]');
    if (!submitButton) return;

    if (isLoading) {
      const label = this.t('sending', 'Sending...');
      submitButton.disabled = true;
      submitButton.innerHTML =
        `<i data-lucide="loader" class="w-5 h-5 animate-spin inline mr-2"></i>${label}`;
    } else {
      const label = this.t('submitAgain', 'Send Message');
      submitButton.disabled = false;
      submitButton.innerHTML =
        `<i data-lucide="send" class="w-5 h-5 inline mr-2"></i>${label}`;
    }

    if (window.lucide) lucide.createIcons();
  }

  showStatus(form, type, message) {
    const statusMessage = form.querySelector('[data-contact-status]');
    if (!statusMessage) return;

    statusMessage.textContent = message;
    statusMessage.className = `mt-4 p-4 rounded-lg text-sm font-medium ${type === 'success'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      }`;
    statusMessage.classList.remove('hidden');

    // Hide after 5 seconds
    setTimeout(() => {
      statusMessage.classList.add('hidden');
    }, 5000);
  }
}

// Initialize contact form manager
window.contactFormManager = new ContactFormManager();
