// ============================================
// 起码 QiMa — Bilingual Tech Glossary
// ============================================

import { getLanguage } from '../i18n.js';
import { glossaryTerms } from '../content/glossary-data.js';
import { initAudioPlayback } from '../audio.js';

// ── State ──

let currentSearch = '';
let currentCategory = 'all';
let wordOfTheDay = null;

function pickWordOfTheDay() {
  // Use the date as seed so it stays consistent within a day
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % glossaryTerms.length;
  wordOfTheDay = glossaryTerms[index];
}

// ── Filtering ──

function getFilteredTerms() {
  return glossaryTerms.filter(term => {
    // Category filter
    if (currentCategory !== 'all' && term.category !== currentCategory) return false;

    // Search filter
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      const matchEn = term.en.toLowerCase().includes(q);
      const matchZh = term.zh.includes(q);
      const matchPinyin = term.pinyin.toLowerCase().includes(q);
      if (!matchEn && !matchZh && !matchPinyin) return false;
    }

    return true;
  });
}

// ── Card Renderer ──

function renderTermCard(term) {
  const lang = getLanguage();
  const definition = lang === 'zh' ? term.definition.zh : term.definition.en;
  const example = term.example || '';

  return `
    <div class="glossary-card animate-slide-up">
      <div class="glossary-card__term">${term.en}</div>
      <div class="glossary-card__zh">${term.zh}</div>
      <div class="glossary-card__pinyin">${term.pinyin}</div>
      <p class="glossary-card__def">${definition}</p>
      ${example ? `<div class="glossary-card__example glossary-audio" role="button" tabindex="0" data-example="${example.replace(/"/g, '&quot;')}" title="Click to hear pronunciation">
        <code>${example}</code>
        <span class="glossary-audio__icon">&#128264;</span>
      </div>` : ''}
    </div>
  `;
}

// ── Word of the Day ──

function renderWordOfTheDay() {
  if (!wordOfTheDay) return '';
  const lang = getLanguage();
  const definition = lang === 'zh' ? wordOfTheDay.definition.zh : wordOfTheDay.definition.en;
  const example = wordOfTheDay.example || '';

  return `
    <div class="glossary-wotd animate-slide-up">
      <div class="glossary-wotd__label">
        <span class="glossary-wotd__star">&#11088;</span>
        ${lang === 'zh' ? '今日词汇' : 'Word of the Day'}
      </div>
      <div class="glossary-wotd__term">${wordOfTheDay.en}</div>
      <div class="glossary-wotd__zh">${wordOfTheDay.zh}</div>
      <div class="glossary-wotd__pinyin">${wordOfTheDay.pinyin}</div>
      <p class="glossary-wotd__def">${definition}</p>
      ${example ? `<div class="glossary-wotd__example glossary-audio" role="button" tabindex="0" data-example="${example.replace(/"/g, '&quot;')}" title="Click to hear pronunciation">
        <code>${example}</code>
        <span class="glossary-audio__icon">&#128264;</span>
      </div>` : ''}
    </div>
  `;
}

// ── Category Tabs ──

const categories = [
  { id: 'all',        label: { zh: '全部',         en: 'All' } },
  { id: 'basics',     label: { zh: '基础概念',     en: 'Basics' } },
  { id: 'claude-code', label: { zh: 'Claude Code',  en: 'Claude Code' } },
  { id: 'html-css',   label: { zh: 'HTML/CSS',     en: 'HTML/CSS' } },
  { id: 'javascript', label: { zh: 'JavaScript',   en: 'JavaScript' } },
  { id: 'deployment', label: { zh: '部署',         en: 'Deployment' } },
  { id: 'career',     label: { zh: '职业',         en: 'Career' } },
];

function renderCategoryTabs() {
  const lang = getLanguage();
  return categories.map(cat => {
    const label = lang === 'zh'
      ? `${cat.label.zh}${cat.label.en !== cat.label.zh ? ' / ' + cat.label.en : ''}`
      : `${cat.label.en}${cat.label.zh !== cat.label.en ? ' / ' + cat.label.zh : ''}`;
    const active = cat.id === currentCategory ? 'glossary-tab--active' : '';
    return `<button class="glossary-tab ${active}" data-category="${cat.id}">${label}</button>`;
  }).join('');
}

// ── Grid ──

function renderGrid() {
  const filtered = getFilteredTerms();

  if (filtered.length === 0) {
    return `
      <div class="glossary-empty">
        <p>&#128269; 没有找到结果 / No results found</p>
      </div>
    `;
  }

  return `
    <div class="glossary-grid">
      ${filtered.map(renderTermCard).join('')}
    </div>
  `;
}

// ── Public API ──

export function render() {
  pickWordOfTheDay();
  currentSearch = '';
  currentCategory = 'all';

  return `
    <section class="glossary-page">
      <div class="glossary-header">
        <h1 class="glossary-title">
          <span class="glossary-title__zh">双语技术词典</span>
          <span class="glossary-title__separator"> / </span>
          <span class="glossary-title__en">Bilingual Tech Glossary</span>
        </h1>
      </div>

      ${renderWordOfTheDay()}

      <div class="glossary-controls">
        <input
          type="text"
          id="glossary-search"
          class="glossary-search"
          placeholder="搜索 / Search..."
          aria-label="Search glossary terms"
          autocomplete="off"
        />
        <div class="glossary-tabs" id="glossary-tabs">
          ${renderCategoryTabs()}
        </div>
      </div>

      <div id="glossary-grid-container">
        ${renderGrid()}
      </div>
    </section>
  `;
}

export function init() {
  const searchInput = document.getElementById('glossary-search');
  const tabsContainer = document.getElementById('glossary-tabs');
  const gridContainer = document.getElementById('glossary-grid-container');

  if (!searchInput || !tabsContainer || !gridContainer) return;

  initAudioPlayback(
    document.querySelector('.glossary-page'),
    '.glossary-audio',
    'glossary-audio--playing'
  );

  // Search — real-time filtering on keyup
  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim();
    gridContainer.innerHTML = renderGrid();
  });

  // Category tabs
  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.glossary-tab');
    if (!btn) return;

    currentCategory = btn.dataset.category;

    // Update active state
    tabsContainer.querySelectorAll('.glossary-tab').forEach(tab => tab.classList.remove('glossary-tab--active'));
    btn.classList.add('glossary-tab--active');

    // Re-render grid only
    gridContainer.innerHTML = renderGrid();
  });
}
