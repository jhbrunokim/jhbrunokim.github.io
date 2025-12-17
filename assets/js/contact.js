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
      this.showStatus('error', window.i18nManager?.currentLang === 'ko'
        ? '모든 필드를 입력해주세요.'
        : 'Please fill in all fields.');
      return;
    }

    // Show loading state
    this.setLoading(true);

    try {
      // EmailJS send
      // Replace these with your actual EmailJS credentials
      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      await emailjs.send(serviceID, templateID, data, publicKey);

      // Success
      this.showStatus('success', window.i18nManager?.currentLang === 'ko'
        ? '메시지가 성공적으로 전송되었습니다!'
        : 'Message sent successfully!');

      this.form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.showStatus('error', window.i18nManager?.currentLang === 'ko'
        ? '전송에 실패했습니다. 나중에 다시 시도해주세요.'
        : 'Failed to send message. Please try again later.');
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
      this.submitButton.disabled = true;
      this.submitButton.innerHTML = window.i18nManager?.currentLang === 'ko'
        ? '<i data-lucide="loader" class="w-5 h-5 animate-spin inline mr-2"></i>전송 중...'
        : '<i data-lucide="loader" class="w-5 h-5 animate-spin inline mr-2"></i>Sending...';
    } else {
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = window.i18nManager?.currentLang === 'ko'
        ? '<i data-lucide="send" class="w-5 h-5 inline mr-2"></i>전송하기'
        : '<i data-lucide="send" class="w-5 h-5 inline mr-2"></i>Send Message';
    }

    lucide.createIcons();
  }

  showStatus(type, message) {
    if (!this.statusMessage) return;

    this.statusMessage.textContent = message;
    this.statusMessage.className = `mt-4 p-4 rounded-lg text-sm font-medium ${
      type === 'success'
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
