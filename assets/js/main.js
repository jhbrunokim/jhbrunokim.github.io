// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const navLogoText = document.getElementById('nav-logo-text');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('bg-slate-900/95', 'backdrop-blur-md', 'shadow-lg', 'py-3');
    navbar.classList.remove('py-5', 'bg-transparent');
  } else {
    navbar.classList.add('py-5', 'bg-transparent');
    navbar.classList.remove('bg-slate-900/95', 'backdrop-blur-md', 'shadow-lg', 'py-3');
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Tab Switching Logic
function switchTab(tabId) {
  // Reset buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-blue-600', 'text-white', 'shadow-lg');
    btn.classList.add('bg-slate-800', 'text-slate-400', 'hover:bg-slate-700');
  });

  // Activate current button
  const activeBtn = document.getElementById('tab-btn-' + tabId);
  activeBtn.classList.remove('bg-slate-800', 'text-slate-400', 'hover:bg-slate-700');
  activeBtn.classList.add('bg-blue-600', 'text-white', 'shadow-lg');

  // Hide all content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.add('hidden');
  });

  // Show current content
  document.getElementById('content-' + tabId).classList.remove('hidden');
}

// Make switchTab available globally
window.switchTab = switchTab;
