import { t, getLanguage, setLanguage } from '../i18n.js';
import { getState, setState, resetState, toggleTheme } from '../state.js';

// ============================================
// CodeLaunch — Settings Component
// ============================================

/**
 * Render the Settings page HTML.
 * @returns {string} HTML string
 */
export function render() {
  const lang = getLanguage();
  const state = getState();
  const currentTheme = state.theme || 'light';

  return `
    <div class="max-w-2xl mx-auto px-4 py-6 space-y-6">

      <!-- ========== PAGE HEADER ========== -->
      <div>
        <h1 class="text-3xl font-extrabold text-gray-800 dark:text-white">
          ${lang === 'zh' ? '设置' : 'Settings'}
          <span class="text-gray-400 font-normal text-xl ml-2">${lang === 'zh' ? '/ Settings' : '/ 设置'}</span>
        </h1>
      </div>

      <!-- ========== LANGUAGE ========== -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 class="text-lg font-bold text-gray-800 dark:text-white mb-1">
          ${lang === 'zh' ? '语言 / Language' : 'Language / 语言'}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          ${lang === 'zh' ? '选择界面显示语言' : 'Choose display language'}
        </p>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="lang-radio" value="zh"
                   class="w-4 h-4 text-[#FF6B4A] focus:ring-[#FF6B4A] border-gray-300 dark:border-gray-600"
                   ${lang === 'zh' ? 'checked' : ''} />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">中文</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="lang-radio" value="en"
                   class="w-4 h-4 text-[#FF6B4A] focus:ring-[#FF6B4A] border-gray-300 dark:border-gray-600"
                   ${lang === 'en' ? 'checked' : ''} />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">English</span>
          </label>
        </div>
      </div>

      <!-- ========== THEME ========== -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 class="text-lg font-bold text-gray-800 dark:text-white mb-1">
          ${lang === 'zh' ? '主题 / Theme' : 'Theme / 主题'}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          ${lang === 'zh' ? '切换浅色或深色模式' : 'Switch between light and dark mode'}
        </p>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600 dark:text-gray-300">${lang === 'zh' ? '浅色' : 'Light'}</span>
          <button id="theme-toggle"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${currentTheme === 'dark' ? 'bg-[#FF6B4A]' : 'bg-gray-300 dark:bg-gray-600'}"
                  role="switch"
                  aria-checked="${currentTheme === 'dark'}">
            <span class="inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${currentTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'}"></span>
          </button>
          <span class="text-sm text-gray-600 dark:text-gray-300">${lang === 'zh' ? '深色' : 'Dark'}</span>
        </div>
      </div>

      <!-- ========== PROGRESS ========== -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 class="text-lg font-bold text-gray-800 dark:text-white mb-1">
          ${lang === 'zh' ? '学习进度 / Progress' : 'Progress / 学习进度'}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          ${lang === 'zh' ? '管理你的学习数据' : 'Manage your learning data'}
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button id="btn-reset-progress"
                  class="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200">
            ${lang === 'zh' ? '重置进度' : 'Reset Progress'}
          </button>
          <button id="btn-export-progress"
                  class="px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200">
            ${lang === 'zh' ? '导出进度 (JSON)' : 'Export Progress (JSON)'}
          </button>
        </div>
        <p class="mt-2 text-xs text-red-400 dark:text-red-500">
          ${lang === 'zh' ? '重置进度将清除所有学习记录、经验值和徽章，此操作不可撤销。' : 'Resetting progress will clear all learning records, XP, and badges. This action cannot be undone.'}
        </p>
      </div>

      <!-- ========== ABOUT ========== -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 class="text-lg font-bold text-gray-800 dark:text-white mb-1">
          ${lang === 'zh' ? '关于 / About' : 'About / 关于'}
        </h2>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p><span class="font-semibold">${lang === 'zh' ? '应用' : 'App'}:</span> CodeLaunch ${lang === 'zh' ? '码上出发' : ''}</p>
          <p><span class="font-semibold">${lang === 'zh' ? '版本' : 'Version'}:</span> 1.0.0</p>
          <p><span class="font-semibold">${lang === 'zh' ? '制作' : 'Built by'}:</span> Frontier Commons</p>
          <p>
            <a href="#/" class="text-[#FF6B4A] hover:text-[#e85d3f] font-semibold transition-colors">
              ${lang === 'zh' ? '加入社区 →' : 'Join the Community →'}
            </a>
          </p>
        </div>
      </div>

    </div>

    <!-- ========== RESET CONFIRMATION MODAL ========== -->
    <div id="reset-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 hidden transition-opacity">
      <div id="reset-modal-content" class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4 max-w-sm w-full text-center transform scale-95 transition-transform">
        <div class="text-4xl mb-3">&#x26A0;&#xFE0F;</div>
        <h3 class="text-lg font-bold text-gray-800 dark:text-white">
          ${lang === 'zh' ? '确认重置？' : 'Reset Progress?'}
        </h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          ${lang === 'zh'
            ? '这将清除你所有的学习记录、经验值、徽章和连续学习天数。此操作无法撤销！'
            : 'This will erase all your learning records, XP, badges, and streak. This cannot be undone!'}
        </p>
        <div class="flex gap-3 mt-5 justify-center">
          <button id="reset-cancel"
                  class="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            ${lang === 'zh' ? '取消' : 'Cancel'}
          </button>
          <button id="reset-confirm"
                  class="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">
            ${lang === 'zh' ? '确认重置' : 'Yes, Reset'}
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Attach event listeners for the Settings page.
 */
export function init() {
  // --- Language Radio ---
  document.querySelectorAll('input[name="lang-radio"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const newLang = e.target.value;
      setState({ language: newLang });
      setLanguage(newLang); // dispatches languageChanged event, triggering re-render
    });
  });

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      toggleTheme();

      // Update toggle visual state
      const newTheme = getState().theme;
      const knob = themeToggle.querySelector('span');
      if (newTheme === 'dark') {
        themeToggle.classList.remove('bg-gray-300', 'dark:bg-gray-600');
        themeToggle.classList.add('bg-[#FF6B4A]');
        themeToggle.setAttribute('aria-checked', 'true');
        if (knob) {
          knob.classList.remove('translate-x-1');
          knob.classList.add('translate-x-6');
        }
      } else {
        themeToggle.classList.remove('bg-[#FF6B4A]');
        themeToggle.classList.add('bg-gray-300', 'dark:bg-gray-600');
        themeToggle.setAttribute('aria-checked', 'false');
        if (knob) {
          knob.classList.remove('translate-x-6');
          knob.classList.add('translate-x-1');
        }
      }
    });
  }

  // --- Reset Progress ---
  const resetBtn = document.getElementById('btn-reset-progress');
  const resetModal = document.getElementById('reset-modal');
  const resetModalContent = document.getElementById('reset-modal-content');
  const resetCancel = document.getElementById('reset-cancel');
  const resetConfirm = document.getElementById('reset-confirm');

  function openResetModal() {
    if (!resetModal || !resetModalContent) return;
    resetModal.classList.remove('hidden');
    requestAnimationFrame(() => {
      resetModalContent.classList.remove('scale-95');
      resetModalContent.classList.add('scale-100');
    });
  }

  function closeResetModal() {
    if (!resetModal || !resetModalContent) return;
    resetModalContent.classList.remove('scale-100');
    resetModalContent.classList.add('scale-95');
    setTimeout(() => resetModal.classList.add('hidden'), 150);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', openResetModal);
  }

  if (resetCancel) {
    resetCancel.addEventListener('click', closeResetModal);
  }

  if (resetModal) {
    resetModal.addEventListener('click', (e) => {
      if (e.target === resetModal) closeResetModal();
    });
  }

  if (resetConfirm) {
    resetConfirm.addEventListener('click', () => {
      resetState();
      closeResetModal();
      // Reload to reflect reset state
      window.location.reload();
    });
  }

  // --- Export Progress ---
  const exportBtn = document.getElementById('btn-export-progress');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const state = getState();
      const json = JSON.stringify(state, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `codelaunch-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}
