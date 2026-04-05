// ============================================
// 起码 QiMa — Claude Code Commands Reference
// ============================================

import { getLanguage } from '../i18n.js';
import { commands, commandCategories } from '../content/commands-data.js';
import { initAudioPlayback } from '../audio.js';

// ── State ──

let currentSearch = '';
let currentCategory = 'all';

// ── Filtering ──

function getFilteredCommands() {
  return commands.filter(cmd => {
    if (currentCategory !== 'all' && cmd.category !== currentCategory) return false;

    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchCmd = cmd.command.toLowerCase().includes(q);
      const matchZh = cmd.description.zh.includes(q);
      const matchEn = cmd.description.en.toLowerCase().includes(q);
      if (!matchCmd && !matchZh && !matchEn) return false;
    }

    return true;
  });
}

// ── Renderers ──

function getCategoryMeta(categoryId) {
  return commandCategories.find(c => c.id === categoryId) || { color: '#999', label: { zh: '', en: '' } };
}

function renderCommandCard(cmd) {
  const lang = getLanguage();
  const cat = getCategoryMeta(cmd.category);
  const catLabel = lang === 'zh' ? cat.label.zh : cat.label.en;

  const audioText = `${cmd.description.en} / ${cmd.description.zh}`;

  return `
    <div class="commands-card animate-slide-up">
      <div class="commands-card__command"><code>${cmd.command}</code></div>
      <div class="commands-card__zh">${cmd.description.zh}</div>
      <p class="commands-card__desc">${cmd.description.en}</p>
      <div class="commands-card__example commands-audio" role="button" tabindex="0" data-example="${audioText.replace(/"/g, '&quot;')}" title="Click to hear pronunciation">
        <code>${cmd.description.en} / ${cmd.description.zh}</code>
        <span class="glossary-audio__icon">&#128264;</span>
      </div>
    </div>
  `;
}

function renderCategoryTabs() {
  const lang = getLanguage();
  const allLabel = lang === 'zh' ? '全部 / All' : 'All / 全部';
  const allActive = currentCategory === 'all' ? 'commands-tab--active' : '';

  const tabs = commandCategories.map(cat => {
    const label = lang === 'zh' ? cat.label.zh : cat.label.en;
    const active = cat.id === currentCategory ? 'commands-tab--active' : '';
    return `<button class="commands-tab ${active}" data-category="${cat.id}" style="${cat.id === currentCategory ? `background:${cat.color};color:#fff;border-color:${cat.color}` : ''}">${label}</button>`;
  }).join('');

  return `<button class="commands-tab ${allActive}" data-category="all">${allLabel}</button>${tabs}`;
}

function renderContent() {
  const filtered = getFilteredCommands();

  if (filtered.length === 0) {
    return `
      <div class="commands-empty">
        <p>&#128269; 没有找到命令 / No commands found</p>
      </div>
    `;
  }

  return `
    <div class="commands-grid">
      ${filtered.map(cmd => renderCommandCard(cmd)).join('')}
    </div>
  `;
}

// ── Public API ──

export function render() {
  const lang = getLanguage();
  currentSearch = '';
  currentCategory = 'all';

  return `
    <section class="commands-page">
      <div class="commands-header">
        <h1 class="commands-header__title">
          <span class="commands-header__zh">Claude Code 命令速查</span>
          <span class="commands-header__sep"> / </span>
          <span class="commands-header__en">Command Reference</span>
        </h1>
        <p class="commands-header__subtitle">
          ${lang === 'zh' ? `${commands.length} 个常用命令 · 双语解释` : `${commands.length} Essential Commands · Bilingual`}
        </p>
      </div>

      <div class="commands-controls">
        <input
          type="text"
          id="commands-search"
          class="commands-search"
          placeholder="${lang === 'zh' ? '搜索命令... / Search commands...' : 'Search commands... / 搜索命令...'}"
          aria-label="Search commands"
          autocomplete="off"
        />
        <div class="commands-tabs" id="commands-tabs">
          ${renderCategoryTabs()}
        </div>
      </div>

      <div id="commands-content">
        ${renderContent()}
      </div>

      <div class="commands-tip">
        <div class="commands-tip__icon">&#128161;</div>
        <div>
          <p class="commands-tip__text">
            ${lang === 'zh'
              ? '在 Claude Code 中输入 <code>/help</code> 可以查看所有可用命令。'
              : 'Type <code>/help</code> in Claude Code to see all available commands.'}
          </p>
          <p class="commands-tip__text commands-tip__text--secondary">
            ${lang === 'zh'
              ? 'Type <code>/help</code> in Claude Code to see all available commands.'
              : '在 Claude Code 中输入 <code>/help</code> 可以查看所有可用命令。'}
          </p>
        </div>
      </div>
    </section>
  `;
}

export function init() {
  const searchInput = document.getElementById('commands-search');
  const tabsContainer = document.getElementById('commands-tabs');
  const contentContainer = document.getElementById('commands-content');

  if (!searchInput || !tabsContainer || !contentContainer) return;

  initAudioPlayback(
    document.querySelector('.commands-page'),
    '.commands-audio',
    'commands-audio--playing'
  );

  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim();
    contentContainer.innerHTML = renderContent();
  });

  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.commands-tab');
    if (!btn) return;

    currentCategory = btn.dataset.category;
    tabsContainer.innerHTML = renderCategoryTabs();
    contentContainer.innerHTML = renderContent();
  });
}
