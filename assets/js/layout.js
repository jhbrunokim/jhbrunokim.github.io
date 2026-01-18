// Layout Manager - Loads navbar and footer components
class LayoutManager {
  constructor() {
    this.init();
  }

  async init() {
    await Promise.all([
      this.loadComponent('navbar-placeholder', 'components/navbar.html'),
      this.loadComponent('footer-placeholder', 'components/footer.html')
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

    // Dispatch custom event for other scripts
    document.dispatchEvent(new CustomEvent('layoutLoaded'));
  }

  initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      // Close menu when clicking a link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
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
