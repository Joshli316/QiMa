// ============================================
// CodeLaunch — Project Showcase Gallery
// ============================================

import { getLanguage } from '../i18n.js';
import { projects } from '../content/projects.js';

// ── State ──

let currentCategory = 'all';

// ── Categories ──

const categories = [
  { id: 'all',       label: { zh: '全部',         en: 'All' } },
  { id: 'portfolio', label: { zh: '个人网站',     en: 'Portfolio' } },
  { id: 'data',      label: { zh: '数据应用',     en: 'Data Apps' } },
  { id: 'tools',     label: { zh: '工具',         en: 'Tools' } },
  { id: 'creative',  label: { zh: '创意项目',     en: 'Creative' } },
];

// ── Idea Starters ──

const ideaStarters = [
  {
    icon: '&#127912;',
    title: { zh: '个人作品集', en: 'Personal Portfolio' },
    desc:  { zh: '展示你的技能和项目', en: 'Showcase your skills and projects' },
  },
  {
    icon: '&#128202;',
    title: { zh: '数据仪表盘', en: 'Data Dashboard' },
    desc:  { zh: '把数据变成漂亮的图表', en: 'Turn data into beautiful charts' },
  },
  {
    icon: '&#9200;',
    title: { zh: '效率工具', en: 'Productivity Tool' },
    desc:  { zh: '自动化你的日常任务', en: 'Automate your daily tasks' },
  },
  {
    icon: '&#127918;',
    title: { zh: '互动小游戏', en: 'Mini Game' },
    desc:  { zh: '用代码创造乐趣', en: 'Create fun with code' },
  },
];

// ── Helpers ──

function getFilteredProjects() {
  if (currentCategory === 'all') return projects;
  return projects.filter(p => p.category === currentCategory);
}

// ── Gradient backgrounds for thumbnails ──

const gradients = [
  'linear-gradient(135deg, #FF6B4A 0%, #FF8E72 100%)',
  'linear-gradient(135deg, #4ECDC4 0%, #44B09E 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

// ── Renderers ──

function renderCategoryFilters() {
  return categories.map(cat => {
    const label = `${cat.label.zh} / ${cat.label.en}`;
    const active = cat.id === currentCategory ? 'gallery-filter--active' : '';
    return `<button class="gallery-filter ${active}" data-category="${cat.id}">${label}</button>`;
  }).join('');
}

function renderProjectCard(project, index) {
  const lang = getLanguage();
  const title = `${project.title.zh} / ${project.title.en}`;
  const description = lang === 'zh' ? project.description.zh : project.description.en;
  const gradient = gradients[index % gradients.length];
  const icon = project.icon || '&#128187;';

  const tags = (project.tags || []).map(tag =>
    `<span class="gallery-tag">${tag}</span>`
  ).join('');

  return `
    <div class="gallery-card animate-slide-up">
      <div class="gallery-card__thumb" style="background: ${gradient}">
        <span class="gallery-card__icon">${icon}</span>
      </div>
      <div class="gallery-card__body">
        <h3 class="gallery-card__title">${title}</h3>
        <p class="gallery-card__desc">${description}</p>
        <div class="gallery-card__tags">${tags}</div>
        <button class="gallery-card__btn" data-lesson="${project.relatedDay || 1}">
          ${lang === 'zh' ? '学习构建' : 'Learn to Build'}
        </button>
      </div>
    </div>
  `;
}

function renderGrid() {
  const filtered = getFilteredProjects();

  if (filtered.length === 0) {
    return `
      <div class="gallery-empty">
        <p>&#128269; 没有找到项目 / No projects found</p>
      </div>
    `;
  }

  return `
    <div class="gallery-grid">
      ${filtered.map((p, i) => renderProjectCard(p, i)).join('')}
    </div>
  `;
}

function renderInspirationSection() {
  const lang = getLanguage();
  return `
    <div class="gallery-inspiration">
      <h2 class="gallery-inspiration__title">
        ${lang === 'zh' ? '你会构建什么？' : 'What will YOU build?'}
        <span class="gallery-inspiration__sub">
          / ${lang === 'zh' ? 'What will YOU build?' : '你会构建什么？'}
        </span>
      </h2>
      <div class="gallery-inspiration__grid">
        ${ideaStarters.map(idea => `
          <div class="gallery-idea-card">
            <div class="gallery-idea-card__icon">${idea.icon}</div>
            <h4 class="gallery-idea-card__title">${idea.title[lang]}</h4>
            <p class="gallery-idea-card__desc">${idea.desc[lang]}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ── Public API ──

export function render() {
  currentCategory = 'all';

  return `
    <section class="gallery-page">
      <div class="gallery-header">
        <h1 class="gallery-title">
          <span class="gallery-title__zh">作品展示</span>
          <span class="gallery-title__separator"> / </span>
          <span class="gallery-title__en">Project Gallery</span>
        </h1>
        <p class="gallery-subtitle">
          看看你能用Claude Code做什么 / See what you can build with Claude Code
        </p>
      </div>

      <div class="gallery-filters" id="gallery-filters">
        ${renderCategoryFilters()}
      </div>

      <div id="gallery-grid-container">
        ${renderGrid()}
      </div>

      ${renderInspirationSection()}
    </section>
  `;
}

export function init(navigate) {
  const filtersContainer = document.getElementById('gallery-filters');
  const gridContainer = document.getElementById('gallery-grid-container');

  if (!filtersContainer || !gridContainer) return;

  // Category filter clicks
  filtersContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-filter');
    if (!btn) return;

    currentCategory = btn.dataset.category;

    // Update active state
    filtersContainer.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('gallery-filter--active'));
    btn.classList.add('gallery-filter--active');

    // Re-render grid only
    gridContainer.innerHTML = renderGrid();

    // Re-bind learn buttons in new grid
    bindLearnButtons(navigate);
  });

  // Bind "Learn to Build" buttons
  bindLearnButtons(navigate);
}

function bindLearnButtons(navigate) {
  if (!navigate) return;

  document.querySelectorAll('.gallery-card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.lesson || '1';
      navigate(`/lesson/${day}`);
    });
  });
}
