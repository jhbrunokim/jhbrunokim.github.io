// Layout Manager - Loads navbar and footer components
class LayoutManager {
  constructor() {
    this.init();
  }

  async init() {
    await Promise.all([
      this.loadComponent('navbar-placeholder', 'components/navbar.html'),
      this.loadComponent('footer-placeholder', 'components/footer.html'),
      this.loadComponent('country-modal-placeholder', 'components/country-modal.html')
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

  onComponentsLoaded() {
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

    // Dispatch custom event for other scripts
    document.dispatchEvent(new CustomEvent('layoutLoaded'));
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
    const isCompetitivenessPage = /\/(system-integration|maritime-cybersecurity|compliance)\.html$/.test(window.location.pathname);
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
        navbar.classList.add('bg-slate-800/95', 'backdrop-blur-sm', 'py-3');
        navbar.classList.remove('py-5', 'bg-transparent');
      } else {
        navbar.classList.remove('bg-slate-800/95', 'backdrop-blur-sm', 'py-3');
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
