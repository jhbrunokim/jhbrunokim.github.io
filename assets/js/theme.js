// Dark Mode Toggle
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Apply saved theme on page load
    this.applyTheme();

    // Create theme toggle button
    this.createToggleButton();
  }

  applyTheme() {
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
    this.updateToggleButton();
  }

  createToggleButton() {
    const desktopNav = document.querySelector('nav .hidden.md\\:flex');
    const mobileNav = document.querySelector('#mobile-menu .flex.flex-col');

    if (desktopNav) {
      const button = this.createButton('desktop');
      desktopNav.appendChild(button);
    }

    if (mobileNav) {
      const button = this.createButton('mobile');
      mobileNav.appendChild(button);
    }
  }

  createButton(type) {
    const button = document.createElement('button');
    button.id = `theme-toggle-${type}`;
    button.className = type === 'desktop'
      ? 'text-slate-300 hover:text-blue-400 transition-colors'
      : 'mobile-link text-slate-300 hover:text-blue-400 text-base font-medium text-left';

    button.innerHTML = this.theme === 'dark'
      ? '<i data-lucide="sun" class="w-5 h-5 inline"></i> <span class="ml-2">Light Mode</span>'
      : '<i data-lucide="moon" class="w-5 h-5 inline"></i> <span class="ml-2">Dark Mode</span>';

    button.addEventListener('click', () => this.toggleTheme());

    return button;
  }

  updateToggleButton() {
    const buttons = document.querySelectorAll('[id^="theme-toggle-"]');
    buttons.forEach(button => {
      button.innerHTML = this.theme === 'dark'
        ? '<i data-lucide="sun" class="w-5 h-5 inline"></i> <span class="ml-2">Light Mode</span>'
        : '<i data-lucide="moon" class="w-5 h-5 inline"></i> <span class="ml-2">Dark Mode</span>';

      // Reinitialize icons
      lucide.createIcons();
    });
  }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});
