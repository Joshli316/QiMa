import { t, getLanguage, toggleLanguage } from '../i18n.js';
import { getState, getProgress, toggleTheme } from '../state.js';

/**
 * Render the navigation bar HTML.
 * @param {string} currentRoute - The active route path (e.g. 'dashboard')
 * @returns {string} HTML string
 */
export function render(currentRoute = 'dashboard') {
  const lang = getLanguage();
  const progress = getProgress();
  const state = getState();
  const isDark = state.theme === 'dark';
  const pct = Math.round(progress.percentage || 0);

  // SVG progress ring params
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress.percentage / 100) * circumference;

  const navItems = [
    { route: 'dashboard', labelKey: 'nav_dashboard' },
    { route: 'glossary',  labelKey: 'nav_glossary' },
    { route: 'gallery',   labelKey: 'nav_gallery' },
    { route: 'career',    labelKey: 'nav_career' },
    { route: 'settings',  labelKey: 'nav_settings' },
  ];

  const navLinks = navItems.map(({ route, labelKey }) => {
    const isActive = currentRoute === route;
    const activeClasses = isActive
      ? 'text-[#FF6B4A] border-b-2 border-[#FF6B4A]'
      : 'text-gray-600 dark:text-gray-300 hover:text-[#FF6B4A]';
    return `
      <a href="#/${route}"
         class="nav-link px-3 py-2 text-sm font-medium transition-colors ${activeClasses}"
         data-route="${route}">
        ${t(labelKey)}
      </a>`;
  }).join('');

  const drawerLinks = navItems.map(({ route, labelKey }) => {
    const isActive = currentRoute === route;
    const activeClasses = isActive
      ? 'text-[#FF6B4A] bg-orange-50 dark:bg-orange-900/20'
      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700';
    return `
      <a href="#/${route}"
         class="drawer-link block px-4 py-3 text-base font-medium rounded-lg transition-colors ${activeClasses}"
         data-route="${route}">
        ${t(labelKey)}
      </a>`;
  }).join('');

  return `
    <!-- Overlay -->
    <div id="nav-overlay"
         class="fixed inset-0 bg-black/40 z-40 hidden transition-opacity"></div>

    <nav class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">

          <!-- Left: Logo -->
          <a href="#/" class="flex items-center gap-2 shrink-0" id="nav-logo">
            <svg class="w-6 h-6 text-[#FF6B4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3"/>
            </svg>
            <span class="text-lg font-bold text-gray-900 dark:text-white">
              CodeLaunch<span class="text-xs font-normal text-gray-400 dark:text-gray-500 ml-1">码上出发</span>
            </span>
          </a>

          <!-- Center: Desktop nav links -->
          <div class="hidden md:flex items-center gap-1">
            ${navLinks}
          </div>

          <!-- Right: Actions -->
          <div class="flex items-center gap-2">

            <!-- Progress Ring -->
            <div class="relative" title="${pct}% complete">
              <svg width="28" height="28" class="transform -rotate-90" role="img" aria-label="${pct}% complete">
                <circle cx="14" cy="14" r="${radius}"
                        fill="none" stroke-width="2.5"
                        class="stroke-gray-200 dark:stroke-gray-700"/>
                <circle cx="14" cy="14" r="${radius}"
                        fill="none" stroke-width="2.5"
                        stroke="#FF6B4A"
                        stroke-dasharray="${circumference}"
                        stroke-dashoffset="${offset}"
                        stroke-linecap="round"/>
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-gray-600 dark:text-gray-300">
                ${pct}
              </span>
            </div>

            <!-- Language Toggle -->
            <button id="lang-toggle"
                    class="px-2 py-1 text-xs font-semibold rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle language">
              ${lang === 'en' ? '中' : 'EN'}
            </button>

            <!-- Dark Mode Toggle -->
            <button id="theme-toggle"
                    class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle dark mode">
              ${isDark
                ? `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                     <circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                   </svg>`
                : `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                   </svg>`
              }
            </button>

            <!-- Mobile Hamburger -->
            <button id="menu-toggle"
                    class="md:hidden p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Open menu">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <aside id="mobile-drawer"
           class="fixed top-0 right-0 h-full w-64 z-50 bg-white dark:bg-gray-900 shadow-xl transform translate-x-full transition-transform duration-300 ease-in-out">
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">${getLanguage() === 'zh' ? '菜单' : 'Menu'}</span>
        <button id="drawer-close"
                class="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close menu">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="p-3 flex flex-col gap-1">
        <a href="#/"
           class="drawer-link block px-4 py-3 text-base font-medium rounded-lg transition-colors ${currentRoute === 'landing' ? 'text-[#FF6B4A] bg-orange-50 dark:bg-orange-900/20' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}"
           data-route="landing">
          ${lang === 'zh' ? '首页' : 'Home'}
        </a>
        ${drawerLinks}
      </div>
    </aside>
  `;
}

/**
 * Attach event listeners after the nav is rendered in the DOM.
 * @param {function} navigate - Router's navigate function
 */
export function init(navigate) {
  // --- Logo link (goes to landing page) ---
  const logo = document.getElementById('nav-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('/');
      closeDrawer();
    });
  }

  // --- Desktop & drawer nav links ---
  document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.dataset.route;
      if (route) {
        if (route === 'landing') {
          navigate('/');
        } else {
          navigate('/' + route);
        }
        closeDrawer();
      }
    });
  });

  // --- Language toggle ---
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      toggleLanguage();
    });
  }

  // --- Dark mode toggle ---
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
      document.dispatchEvent(new CustomEvent('themeChanged'));
    });
  }

  // --- Mobile menu ---
  const menuToggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('nav-overlay');
  const drawerClose = document.getElementById('drawer-close');

  if (menuToggle) {
    menuToggle.addEventListener('click', openDrawer);
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }
  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  // Escape key closes mobile drawer
  document.addEventListener('keydown', (e) => {
    const drawer = document.getElementById('mobile-drawer');
    if (e.key === 'Escape' && drawer && !drawer.classList.contains('translate-x-full')) closeDrawer();
  });
}

// --- Drawer helpers ---

function openDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('nav-overlay');
  if (drawer) drawer.classList.remove('translate-x-full');
  if (overlay) overlay.classList.remove('hidden');
}

function closeDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('nav-overlay');
  if (drawer) drawer.classList.add('translate-x-full');
  if (overlay) overlay.classList.add('hidden');
}
