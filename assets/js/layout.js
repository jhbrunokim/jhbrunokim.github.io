// Layout Manager - Loads navbar and footer components
class LayoutManager {
  constructor() {
    this.init();
  }

  async init() {
    await Promise.all([
      this.loadComponent('navbar-placeholder', 'components/navbar.html'),
      this.loadComponent('footer-placeholder', 'components/footer.html'),
      this.loadComponent('country-modal-placeholder', 'components/country-modal.html'),
      this.appendComponent('components/contact-modal.html')
    ]);

    // After components are loaded, initialize other scripts
    this.onComponentsLoaded();
  }

  async loadComponent(placeholderId, componentPath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
      const response = await fetch(componentPath);
      if (!response.ok) throw new Error(`Failed to load ${componentPath}`);

      const html = await response.text();
      placeholder.innerHTML = html;
    } catch (error) {
      console.error(`Error loading component: ${error.message}`);
    }
  }

  // Like loadComponent, but appends to <body> so pages need no placeholder
  async appendComponent(componentPath) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) throw new Error(`Failed to load ${componentPath}`);

      document.body.insertAdjacentHTML('beforeend', await response.text());
    } catch (error) {
      console.error(`Error loading component: ${error.message}`);
    }
  }

  updateFooterYear() {
    document.querySelectorAll('[data-footer-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  onComponentsLoaded() {
    this.updateFooterYear();

    // Reinitialize Lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }

    // Reinitialize i18n if available
    if (window.i18nManager) {
      window.i18nManager.applyTranslations();
    }

    // Initialize mobile menu
    this.initMobileMenu();

    // Initialize navbar scroll behavior
    this.initNavbarScroll();

    // Highlight the active page/section in the navbar
    this.initActiveState();

    // Keyboard support for the Competitiveness dropdown
    this.initDropdown();

    // Open the contact form in a modal from any "#contact" link
    this.initContactModal();

    // Keep index.html#section arrivals aligned while content loads
    this.initHashAnchor();

    // Dispatch custom event for other scripts
    document.dispatchEvent(new CustomEvent('layoutLoaded'));
  }

  // Every Contact link points at index.html#contact. Jumping there from
  // another page lands in the wrong place because content above the form
  // loads asynchronously, so the links open this modal instead. The href
  // stays as a fallback when JS is unavailable.
  initContactModal() {
    const dialog = document.getElementById('contact-modal');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const open = (source) => {
      dialog.dataset.source = source;
      if (dialog.open) return;
      dialog.showModal();
      document.documentElement.classList.add('overflow-hidden');
      dialog.querySelector('input:not([type="hidden"])')?.focus();
    };

    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('overflow-hidden');
    });

    dialog.addEventListener('click', (e) => {
      // A click on the dialog element itself is a click on the backdrop
      if (e.target === dialog || e.target.closest('[data-contact-close]')) {
        dialog.close();
      }
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href$="#contact"]');
      if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      open(this.contactSource(link));
    });

    // Direct visits to index.html#contact (e.g. shared links)
    if (window.location.hash === '#contact') open('direct-link');
  }

  // Arriving from another page (e.g. index.html#about), the browser jumps to
  // the section once, then the navbar, translations, article list and images
  // load above it and push it down. Re-align on every layout change until
  // the page has settled or the visitor scrolls on their own.
  initHashAnchor() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || id === 'contact') return;
    const target = document.getElementById(id);
    if (!target) return;

    const align = () => target.scrollIntoView({ block: 'start', behavior: 'instant' });
    const observer = new ResizeObserver(align);
    const userEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'];
    const stop = () => {
      observer.disconnect();
      userEvents.forEach(type => window.removeEventListener(type, stop));
    };

    userEvents.forEach(type => window.addEventListener(type, stop, { passive: true }));
    observer.observe(document.body);
    align();

    const settle = () => setTimeout(stop, 1500);
    if (document.readyState === 'complete') settle();
    else window.addEventListener('load', settle, { once: true });
  }

  // Where the visitor clicked Contact, recorded with the enquiry
  contactSource(link) {
    if (link.closest('#mobile-menu')) return 'mobile-menu';
    if (link.closest('#navbar')) return 'navbar';
    if (link.closest('#article-cta')) return 'article-cta';
    if (link.closest('#footer-placeholder')) return 'footer';
    // Service pages have unnamed sections: name them hero / section-N
    const section = link.closest('section');
    if (!section) return 'page-cta';
    const index = Array.from(document.querySelectorAll('section')).indexOf(section);
    return `page-cta#${section.id || (index === 0 ? 'hero' : `section-${index + 1}`)}`;
  }

  initDropdown() {
    const wrapper = document.querySelector('[data-dropdown]');
    if (!wrapper) return;
    const toggle = wrapper.querySelector('[data-dropdown-toggle]');
    const menu = wrapper.querySelector('[data-dropdown-menu]');
    if (!toggle || !menu) return;

    const items = () => Array.from(menu.querySelectorAll('a[role="menuitem"]'));

    // CSS group-hover / group-focus-within handles show/hide.
    // JS keeps aria-expanded in sync and adds arrow-key navigation for
    // keyboard users once focus enters the menu.
    const setExpanded = (v) => toggle.setAttribute('aria-expanded', v ? 'true' : 'false');

    wrapper.addEventListener('focusin', () => setExpanded(true));
    wrapper.addEventListener('focusout', (e) => {
      if (!wrapper.contains(e.relatedTarget)) setExpanded(false);
    });
    wrapper.addEventListener('mouseenter', () => setExpanded(true));
    wrapper.addEventListener('mouseleave', () => setExpanded(false));

    menu.addEventListener('keydown', (e) => {
      const list = items();
      const idx = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        list[(idx + 1) % list.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        list[(idx - 1 + list.length) % list.length]?.focus();
      } else if (e.key === 'Escape') {
        toggle.focus();
      }
    });
  }

  initActiveState() {
    const links = document.querySelectorAll('#navbar .nav-link, #mobile-menu .mobile-link');
    if (!links.length) return;

    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    const currentHash = window.location.hash;
    const isIndex = currentPath === '/' || currentPath.endsWith('/');

    const compBtn = document.querySelector('[data-dropdown-toggle]');
    const isCompetitivenessPage = /\/(system-integration|maritime-cybersecurity|compliance|ai-cybersecurity-consulting)\.html$/.test(window.location.pathname);
    // Matches on pathname only, so article.html?slug=... still highlights Articles
    const isArticlesPage = /\/(articles|article)\.html$/.test(window.location.pathname);

    const setActive = (linkHref) => {
      links.forEach(l => {
        const href = l.getAttribute('href') || '';
        const match = href === linkHref;
        l.classList.toggle('is-active', match);
      });
      if (compBtn) compBtn.classList.toggle('is-active', isCompetitivenessPage);
    };

    if (!isIndex) {
      // Sub-page: highlight the matching link and (if applicable) the dropdown toggle
      const fileName = window.location.pathname.split('/').pop();
      setActive(fileName);
      if (isArticlesPage) {
        document.querySelectorAll('a[href="index.html#articles"]').forEach(l => l.classList.add('is-active'));
      }
      return;
    }

    // Index page: track section in view
    const sections = ['home', 'expertise', 'vision', 'business', 'competitiveness', 'articles', 'about', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const highlight = (id) => {
      const targetHref = `index.html#${id}`;
      links.forEach(l => {
        const href = l.getAttribute('href') || '';
        l.classList.toggle('is-active', href === targetHref);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        .slice(0, 1)
        .forEach(e => highlight(e.target.id));
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(s => observer.observe(s));
    highlight(currentHash.replace('#', '') || 'home');
  }

  initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      // Helper function to update aria-expanded
      const updateAriaExpanded = () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', !isHidden);
      };

      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        updateAriaExpanded();
      });

      // Close menu when clicking a link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          updateAriaExpanded();
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden') &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
          mobileMenu.classList.add('hidden');
          updateAriaExpanded();
        }
      });
    }
  }

  initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-ocean-950/95', 'backdrop-blur-sm', 'py-3');
        navbar.classList.remove('py-5', 'bg-transparent');
      } else {
        navbar.classList.remove('bg-ocean-950/95', 'backdrop-blur-sm', 'py-3');
        navbar.classList.add('py-5', 'bg-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.layoutManager = new LayoutManager();
});
