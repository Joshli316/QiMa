/**
 * app.js — Main app controller for CodeLaunch 码上出发
 */

import { initRouter, navigate, getCurrentRoute } from './router.js';
import { getState, setState, updateStreak, applyTheme } from './state.js';
import { setLanguage, getLanguage } from './i18n.js';
import { render as renderNav, init as initNav } from './components/nav.js';
import * as landing from './components/landing.js';
import * as dashboard from './components/dashboard.js';
import * as lesson from './components/lesson.js';
import * as glossary from './components/glossary.js';
import * as gallery from './components/gallery.js';
import * as career from './components/career.js';
import * as settings from './components/settings.js';

const components = { landing, dashboard, lesson, glossary, gallery, career, settings };

/* ── Page render callback ── */

function renderPage(route) {
  if (!route) route = getCurrentRoute();
  const { name, params } = route;

  // Render nav
  const navEl = document.getElementById('nav');
  if (navEl) {
    navEl.innerHTML = renderNav(name);
    initNav(navigate);
  }

  // Render matched component
  const appEl = document.getElementById('app');
  const component = components[name];
  if (appEl && component) {
    try {
      appEl.innerHTML = component.render(params);
      if (component.init) component.init(navigate);
    } catch (err) {
      console.error(`[CodeLaunch] Error rendering "${name}":`, err);
      appEl.innerHTML = `
        <div style="padding:120px 20px;text-align:center;max-width:480px;margin:0 auto;">
          <div style="font-size:3rem;margin-bottom:16px;">⚠️</div>
          <h2 style="font-size:1.3rem;font-weight:700;color:var(--text);margin-bottom:8px;">页面加载出错 / Page Error</h2>
          <p style="color:var(--text-muted);margin-bottom:20px;">请刷新页面重试。If this persists, try clearing your browser data.</p>
          <a href="#/dashboard" style="color:var(--coral);font-weight:600;">返回仪表盘 / Back to Dashboard</a>
        </div>`;
    }
    // Move focus to #app so screen readers announce the new page content
    appEl.setAttribute('tabindex', '-1');
    appEl.focus({ preventScroll: true });
  }

  // Scroll to top on route change
  window.scrollTo(0, 0);

  // Page transition animation
  if (appEl) {
    appEl.classList.remove('page-enter');
    // Force reflow so the class removal takes effect before re-adding
    void appEl.offsetWidth;
    appEl.classList.add('page-enter');
  }
}

/* ── Bootstrap ── */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Restore language
  const state = getState();
  setLanguage(state.language);

  // 2. Apply theme (no setState needed — just apply what's saved)
  const theme = state.theme || 'light';
  document.documentElement.dataset.theme = theme;
  if (theme === 'dark') document.documentElement.classList.add('dark');

  // 3. Update streak
  updateStreak();

  // 4. Redirect to dashboard if already started (before router init to avoid double render)
  if (state.started && (!location.hash || location.hash === '#' || location.hash === '#/')) {
    location.hash = '#/dashboard';
  }

  // 5. Initialize router with render callback
  initRouter(renderPage);

  // 6. Re-render on language or theme change
  document.addEventListener('languageChanged', () => renderPage());
  document.addEventListener('themeChanged', () => renderPage());
});

/* ── Confetti ── */

function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const brandColors = [
    '#FF6B4A', // coral
    '#4ECDC4', // mint
    '#1A1A2E', // navy
    '#FFD93D', // gold
  ];

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * -1,
    vx: (Math.random() - 0.5) * 8,
    vy: Math.random() * 3 + 2,
    color: brandColors[Math.floor(Math.random() * brandColors.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.2,
  }));

  const gravity = 0.15;
  const startTime = performance.now();
  const duration = 3000;

  function animate(now) {
    const elapsed = now - startTime;
    if (elapsed > duration) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* ── Toast ── */

function showToast(message, type = 'success') {
  const bgMap = {
    success: '#4ECDC4', // mint
    xp: '#FF6B6B',      // coral
    badge: '#FFD93D',    // gold
    streak: '#FF8C42',   // orange
  };

  // Create container if it doesn't exist
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.style.cssText = 'position:fixed;top:64px;right:16px;z-index:10000;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
    document.body.appendChild(container);
  }

  // Limit to 3 visible toasts — remove oldest if needed
  while (container.children.length >= 3) {
    container.removeChild(container.firstChild);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background:${bgMap[type] || bgMap.success};
    color:#1A1A2E;
    padding:12px 20px;
    border-radius:8px;
    font-weight:600;
    font-size:0.95rem;
    box-shadow:0 4px 12px rgba(0,0,0,0.15);
    transform:translateX(120%);
    transition:transform 0.3s ease, opacity 0.3s ease;
    pointer-events:auto;
    max-width:320px;
    word-break:break-word;
  `;
  toast.textContent = message;
  container.appendChild(toast);

  // Slide in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 4000);
}

/* ── Expose globals ── */

window.triggerConfetti = triggerConfetti;
window.showToast = showToast;

export { triggerConfetti, showToast };
