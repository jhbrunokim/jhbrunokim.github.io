// Contact Form Handler
// Handles every form marked [data-contact-form]: the inline form on the home
// page and the contact modal injected on every page by layout.js.
//
// Submissions go to POST /api/contact (src/worker.js), which checks the
// Turnstile token and sends the email. No email credentials live in the
// browser. The Turnstile script is loaded with ?render=explicit so this file
// controls when each widget is drawn (the modal's widget waits until the
// dialog opens, because a widget rendered inside a hidden <dialog> has no size).

// Public site key of the Turnstile widget for gmmaritime.com (Cloudflare
// dashboard → Turnstile). It is safe to expose; the secret stays in the Worker.
const TURNSTILE_SITE_KEY = '0x4AAAAAAFZRR1oE7iN5VgMi';
const TURNSTILE_ACTION = 'contact';
const CONTACT_ENDPOINT = '/api/contact';

// Turnstile language codes for the site's i18n languages.
const TURNSTILE_LANG = { ko: 'ko', en: 'en', zh: 'zh-cn', ja: 'ja' };

class ContactFormManager {
  constructor() {
    this.widgets = new WeakMap(); // form -> turnstile widget id
    this.pendingRenders = [];
    this.init();
  }

  init() {
    // api.js calls this once it has loaded (see ?onload=__turnstileReady in the
    // <script> tag). If api.js loaded before this file, window.turnstile already
    // exists and renders run immediately.
    window.__turnstileReady = () => this.flushRenders();

    document.addEventListener('DOMContentLoaded', () => this.bindForms());

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

      const dialog = form.closest('dialog');
      if (dialog) {
        // Render when the dialog first opens. <dialog> has no "open" event, so
        // watch the attribute.
        const observer = new MutationObserver(() => {
          if (dialog.open) {
            observer.disconnect();
            this.renderWidget(form);
          }
        });
        observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
        if (dialog.open) {
          observer.disconnect();
          this.renderWidget(form);
        }
      } else {
        this.renderWidget(form);
      }
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

  // ── Turnstile ──────────────────────────────────────────────────────────

  renderWidget(form) {
    if (this.widgets.has(form)) return;
    if (!window.turnstile) {
      this.pendingRenders.push(form);
      return;
    }
    const container = form.querySelector('[data-turnstile]');
    if (!container) return;

    const lang = window.i18nManager?.currentLang || 'en';
    const widgetId = window.turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      action: TURNSTILE_ACTION,
      theme: 'auto',
      size: 'flexible',
      language: TURNSTILE_LANG[lang] || 'auto',
    });
    this.widgets.set(form, widgetId);
  }

  flushRenders() {
    const forms = this.pendingRenders.splice(0);
    forms.forEach(form => this.renderWidget(form));
  }

  getToken(form) {
    const widgetId = this.widgets.get(form);
    if (widgetId === undefined || !window.turnstile) return '';
    try {
      return window.turnstile.getResponse(widgetId) || '';
    } catch {
      return '';
    }
  }

  // Tokens are single-use: reset after every attempt so a retry gets a new one.
  resetWidget(form) {
    const widgetId = this.widgets.get(form);
    if (widgetId === undefined || !window.turnstile) return;
    try {
      window.turnstile.reset(widgetId);
    } catch {
      // Widget may have been removed from the DOM; nothing to reset.
    }
  }

  // ── Submission ─────────────────────────────────────────────────────────

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
      name: (formData.get('name') || '').trim(),
      email: (formData.get('email') || '').trim(),
      subject: (formData.get('subject') || '').trim(),
      message: (formData.get('message') || '').trim(),
      // Optional fields (home form and modal). Role values are English
      // whatever the UI language, so the email reads the same for the owner.
      company: (formData.get('company') || '').trim(),
      role: formData.get('role') || '',
    };

    // Consent gate (PIPA): checked first so the message is specific. The
    // value is never sent to the server.
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

    // Turnstile must have produced a token (the widget shows its own
    // progress; usually this is done before the visitor finishes typing).
    const turnstileToken = this.getToken(form);
    if (!turnstileToken) {
      this.showStatus(form, 'error', this.t('captchaRequired', 'Please wait for the security check to finish, then try again.'));
      return;
    }

    // Show loading state
    this.setLoading(form, true);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: this.getSource(form), turnstileToken }),
      });

      let result = null;
      try {
        result = await response.json();
      } catch {
        // Non-JSON body (e.g. an HTML error page); handled as a failure below.
      }

      if (!response.ok || !result?.ok) {
        const key = result?.error === 'captcha' ? 'captchaRequired' : 'errorMessage';
        throw Object.assign(new Error(`Contact API error: ${response.status} ${result?.error || ''}`), { key });
      }

      // Success
      this.showStatus(form, 'success', this.t('successMessage', 'Message sent successfully!'));

      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      const key = error?.key || 'errorMessage';
      this.showStatus(form, 'error', this.t(key, 'Failed to send message. Please try again later.'));
    } finally {
      this.setLoading(form, false);
      this.resetWidget(form);
    }
  }

  validateForm(data) {
    return data.name &&
      data.email &&
      data.subject &&
      data.message &&
      this.validateEmail(data.email);
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
