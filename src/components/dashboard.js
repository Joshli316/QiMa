import { t, getLanguage } from '../i18n.js';
import { getState, getLevel, getProgress } from '../state.js';
import { getCurriculumOverview } from '../content/curriculum.js';

// ============================================
// CodeLaunch Dashboard — Progress & Gamification
// ============================================

// Build dayTitles lookup from curriculum (single source of truth)
const dayTitles = {};
getCurriculumOverview().forEach(d => { dayTitles[d.day] = d.title; });

const badges = [
  // Curriculum lesson badges (source of truth: curriculum.js)
  { id: 'first-launch',     emoji: '\u{1F680}', name: { zh: '首次启动', en: 'First Launch' },        desc: { zh: '完成第1天课程', en: 'Completed Day 1' } },
  { id: 'first-page',       emoji: '\u{1F4BB}', name: { zh: '第一个页面', en: 'First Page' },        desc: { zh: '完成第2天课程', en: 'Completed Day 2' } },
  { id: 'style-master',     emoji: '\u{1F3A8}', name: { zh: '样式大师', en: 'Style Master' },        desc: { zh: '完成第3天课程', en: 'Completed Day 3' } },
  { id: 'prompt-pro',       emoji: '\u{1F4AC}', name: { zh: '提示词达人', en: 'Prompt Pro' },        desc: { zh: '完成第4天课程', en: 'Completed Day 4' } },
  { id: 'interactive',      emoji: '\u{1F579}\uFE0F', name: { zh: '交互达人', en: 'Interactive' },   desc: { zh: '完成第5天课程', en: 'Completed Day 5' } },
  { id: 'portfolio-ready',  emoji: '\u{1F4C1}', name: { zh: '作品集就绪', en: 'Portfolio Ready' },   desc: { zh: '完成第6天课程', en: 'Completed Day 6' } },
  { id: 'architect',        emoji: '\u{1F3D7}\uFE0F', name: { zh: '架构师', en: 'Architect' },       desc: { zh: '完成第8天课程', en: 'Completed Day 8' } },
  { id: 'data-wizard',      emoji: '\u{1F9D9}', name: { zh: '数据巫师', en: 'Data Wizard' },         desc: { zh: '完成第9天课程', en: 'Completed Day 9' } },
  { id: 'bug-squasher',     emoji: '\u{1F41B}', name: { zh: '除虫达人', en: 'Bug Squasher' },        desc: { zh: '完成第11天课程', en: 'Completed Day 11' } },
  { id: 'shipped-it',       emoji: '\u{1F30D}', name: { zh: '成功发布', en: 'Shipped It' },          desc: { zh: '完成第12天课程', en: 'Completed Day 12' } },
  { id: 'power-user',       emoji: '\u{26A1}',  name: { zh: '高级用户', en: 'Power User' },          desc: { zh: '完成第13天课程', en: 'Completed Day 13' } },
  { id: 'graduate',         emoji: '\u{1F393}', name: { zh: '毕业啦', en: 'Graduate' },              desc: { zh: '完成第14天课程', en: 'Completed Day 14' } },
  // Special badges (non-lesson)
  { id: 'streak-3',         emoji: '\u{1F525}', name: { zh: '三天连续', en: '3-Day Streak' },        desc: { zh: '连续学习三天', en: '3 consecutive days of learning' } },
  { id: 'streak-7',         emoji: '\u{2699}\uFE0F', name: { zh: '一周坚持', en: '7-Day Streak' },   desc: { zh: '连续学习一周', en: 'A full week of learning' } },
  { id: 'all-complete',     emoji: '\u{1F3C6}', name: { zh: '全部通关', en: 'All Complete' },         desc: { zh: '完成所有14天课程', en: 'Finished all 14 days' } },
  { id: 'speedrun',         emoji: '\u{23F1}\uFE0F', name: { zh: '极速通关', en: 'Speed Runner' },   desc: { zh: '一天内完成3课以上', en: 'Completed 3+ lessons in one day' } },
];

/**
 * Render the progress dashboard HTML.
 * @returns {string} HTML string
 */
export function render() {
  const lang = getLanguage();
  const state = getState();
  const level = getLevel();
  const progress = getProgress();

  const { completedLessons, xp, streak, currentDay } = state;
  const pct = progress.percentage;
  const allDone = progress.completed >= 14;

  // SVG progress ring calculations
  const ringRadius = 62;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (pct / 100) * ringCircumference;

  // Level progress within current level
  const levelXPProgress = level.nextXP
    ? ((xp - level.minXP) / (level.nextXP - level.minXP)) * 100
    : 100;

  // Determine which day is "current" (next incomplete day)
  let nextDay = currentDay;
  for (let d = 1; d <= 14; d++) {
    if (!completedLessons.includes(d)) {
      nextDay = d;
      break;
    }
    if (d === 14) nextDay = 14;
  }

  // Streak glow class
  const streakGlow = streak >= 3 ? 'animate-pulse' : '';

  return `
    <div class="max-w-5xl mx-auto px-4 pt-20 pb-6 space-y-6">

      <!-- ========== TOP ROW ========== -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <!-- Progress Ring -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <div class="relative">
            <svg width="150" height="150" class="transform -rotate-90" role="img" aria-label="${lang === 'zh' ? `课程进度：${pct}%` : `Course progress: ${pct}%`}">
              <circle cx="75" cy="75" r="${ringRadius}"
                      fill="none" stroke-width="10"
                      class="stroke-gray-200 dark:stroke-gray-700" />
              <circle cx="75" cy="75" r="${ringRadius}"
                      fill="none" stroke-width="10"
                      stroke="#FF6B4A"
                      stroke-dasharray="${ringCircumference}"
                      stroke-dashoffset="${ringOffset}"
                      stroke-linecap="round"
                      class="transition-all duration-1000 ease-out" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-2xl font-bold text-gray-800 dark:text-white">${progress.completed}/14</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">${lang === 'zh' ? '天' : 'days'}</span>
            </div>
          </div>
          <p class="mt-3 text-lg font-semibold text-[#FF6B4A]">${pct}%</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">${t('dash_progress')}</p>
        </div>

        <!-- Streak Counter -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <div class="${streakGlow}">
            <span class="text-5xl">\u{1F525}</span>
          </div>
          <p class="mt-2 text-4xl font-extrabold text-gray-800 dark:text-white">${streak}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            ${lang === 'zh' ? '天连续' : 'day streak'}
          </p>
          ${streak >= 3 ? `
            <span class="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
              ${lang === 'zh' ? '太棒了，继续保持!' : 'Awesome, keep it up!'}
            </span>
          ` : ''}
        </div>

        <!-- XP & Level -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <div class="text-3xl mb-1">\u{2B50}</div>
          <p class="text-3xl font-extrabold text-gray-800 dark:text-white">${xp} <span class="text-base font-normal text-gray-500">XP</span></p>
          <p class="mt-1 text-sm font-semibold text-[#4ECDC4]">
            Lv.${level.level} ${level.name[lang] || level.name.en}
          </p>
          <div class="w-full mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#FF6B4A] transition-all duration-700 ease-out"
                 style="width: ${levelXPProgress}%"></div>
          </div>
          <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
            ${level.nextXP ? `${xp - level.minXP} / ${level.nextXP - level.minXP} XP` : (lang === 'zh' ? '已满级!' : 'Max level!')}
          </p>
        </div>
      </div>

      <!-- ========== CURRENT DAY CARD ========== -->
      ${allDone ? `
        <div class="bg-gradient-to-r from-[#4ECDC4]/10 to-[#FF6B4A]/10 dark:from-[#4ECDC4]/5 dark:to-[#FF6B4A]/5 border border-[#4ECDC4]/30 rounded-2xl p-8 text-center">
          <div class="text-5xl mb-4">\u{1F393}</div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
            ${lang === 'zh' ? '恭喜毕业!' : 'Congratulations, Graduate!'}
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-300">
            ${lang === 'zh' ? '你已完成所有14天课程。你现在是一名创造者!' : "You've completed all 14 days. You're a creator now!"}
          </p>
        </div>
      ` : `
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#FF6B4A] to-[#FF8F6B]"></div>
          <div class="pl-6 pr-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex-1">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B4A] text-white mb-2">
                Day ${nextDay}
              </span>
              <h2 class="text-xl font-bold text-gray-800 dark:text-white">
                ${lang === 'zh' ? (dayTitles[nextDay]?.zh || '') : (dayTitles[nextDay]?.en || '')} <span class="text-gray-400 font-normal text-base">/ ${lang === 'zh' ? (dayTitles[nextDay]?.en || '') : (dayTitles[nextDay]?.zh || '')}</span>
              </h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                \u{23F0} ${lang === 'zh' ? '约30分钟' : '~30 min'}
              </p>
            </div>
            <button id="btn-start-learning"
                    data-day="${nextDay}"
                    class="shrink-0 px-6 py-3 rounded-xl bg-[#FF6B4A] hover:bg-[#e85d3f] text-white font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              ${lang === 'zh' ? '开始学习' : 'Start Learning'} \u{1F680}
            </button>
          </div>
        </div>
      `}

      <!-- ========== BADGE SHELF ========== -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">
          ${lang === 'zh' ? '成就徽章' : 'Badges'} <span class="text-sm font-normal text-gray-400">(${state.badges.length}/${badges.length})</span>
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          ${badges.map(b => {
            const unlocked = state.badges.includes(b.id);
            return `
              <button class="badge-item flex flex-col items-center p-3 rounded-xl transition-all duration-200 cursor-pointer
                ${unlocked
                  ? 'bg-gradient-to-b from-white to-orange-50 dark:from-gray-700 dark:to-gray-700 shadow-sm hover:shadow-md ring-1 ring-orange-200/50 dark:ring-orange-500/20'
                  : 'bg-gray-100 dark:bg-gray-700/50 opacity-50 hover:opacity-70'}"
                data-badge-id="${b.id}"
                data-badge-name-zh="${b.name.zh}"
                data-badge-name-en="${b.name.en}"
                data-badge-desc-zh="${b.desc.zh}"
                data-badge-desc-en="${b.desc.en}"
                data-badge-emoji="${b.emoji}"
                data-badge-unlocked="${unlocked}">
                <span class="text-2xl sm:text-3xl ${unlocked ? '' : 'grayscale'} relative">
                  ${b.emoji}
                  ${!unlocked ? '<span class="absolute -bottom-1 -right-1 text-xs">\u{1F512}</span>' : ''}
                </span>
                <span class="mt-1 text-xs font-medium text-center text-gray-700 dark:text-gray-300 leading-tight">
                  ${b.name[lang] || b.name.en}
                </span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- ========== WEEK TABS + DAY CARDS ========== -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <!-- Tab Buttons -->
        <div class="flex gap-2 mb-5">
          <button id="tab-week-1" class="week-tab flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-200 bg-[#FF6B4A] text-white shadow-md">
            ${lang === 'zh' ? '第一周 基础篇' : 'Week 1 Foundations'}
          </button>
          <button id="tab-week-2" class="week-tab flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
            ${lang === 'zh' ? '第二周 实战篇' : 'Week 2 Real-World'}
          </button>
        </div>

        <!-- Week 1 Grid -->
        <div id="week-1-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          ${renderDayCards(1, 7, completedLessons, lang)}
        </div>

        <!-- Week 2 Grid (hidden by default) -->
        <div id="week-2-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 hidden">
          ${renderDayCards(8, 14, completedLessons, lang)}
        </div>
      </div>

      <!-- ========== STATS ROW ========== -->
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 text-center">
          <p class="text-2xl font-extrabold text-[#FF6B4A]">${progress.completed}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ${lang === 'zh' ? '已完成天数' : 'Days Done'}
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 text-center">
          <p class="text-2xl font-extrabold text-[#4ECDC4]">${xp}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ${lang === 'zh' ? '获得 XP' : 'XP Earned'}
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 text-center">
          <p class="text-2xl font-extrabold text-purple-500">${completedLessons.length * 7}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ${lang === 'zh' ? '学会词汇' : 'Terms Learned'}
          </p>
        </div>
      </div>

    </div>

    <!-- Badge Tooltip Modal -->
    <div id="badge-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 hidden transition-opacity">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4 max-w-xs w-full text-center transform scale-95 transition-transform" id="badge-modal-content">
        <div class="text-5xl mb-3" id="badge-modal-emoji"></div>
        <h4 class="text-lg font-bold text-gray-800 dark:text-white" id="badge-modal-name"></h4>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1" id="badge-modal-desc"></p>
        <p class="text-xs mt-2 font-semibold" id="badge-modal-status"></p>
        <button id="badge-modal-close" class="mt-4 px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          ${lang === 'zh' ? '关闭' : 'Close'}
        </button>
      </div>
    </div>
  `;
}

/**
 * Render day cards for a given range.
 */
function renderDayCards(start, end, completedLessons, lang) {
  let html = '';
  for (let day = start; day <= end; day++) {
    const completed = completedLessons.includes(day);
    const available = day === 1 || completedLessons.includes(day - 1);
    const title = dayTitles[day] || { zh: '', en: '' };

    let borderClass, statusIcon, cursorClass, bgClass;
    if (completed) {
      borderClass = 'border-[#4ECDC4] border-2';
      statusIcon = '\u2705';
      cursorClass = 'cursor-pointer hover:shadow-md';
      bgClass = 'bg-gradient-to-b from-white to-emerald-50/50 dark:from-gray-700 dark:to-emerald-900/10';
    } else if (available) {
      borderClass = 'border-[#FF6B4A] border-2';
      statusIcon = '\u{1F513}';
      cursorClass = 'cursor-pointer hover:shadow-md hover:scale-[1.02]';
      bgClass = 'bg-white dark:bg-gray-700';
    } else {
      borderClass = 'border-gray-200 dark:border-gray-600 border';
      statusIcon = '\u{1F512}';
      cursorClass = 'cursor-not-allowed';
      bgClass = 'bg-gray-50 dark:bg-gray-800 opacity-60';
    }

    html += `
      <div class="day-card ${bgClass} ${borderClass} rounded-xl p-3 transition-all duration-200 ${cursorClass} relative"
           role="button"
           tabindex="${(completed || available) ? '0' : '-1'}"
           data-day="${day}"
           data-available="${completed || available}">
        <div class="flex items-center justify-between mb-2">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold
            ${completed ? 'bg-[#4ECDC4] text-white' : available ? 'bg-[#FF6B4A] text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'}">
            ${day}
          </span>
          <span class="text-base">${statusIcon}</span>
        </div>
        <p class="text-sm font-semibold text-gray-800 dark:text-white leading-tight">${lang === 'zh' ? title.zh : title.en}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 leading-tight mt-0.5">${lang === 'zh' ? title.en : title.zh}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">\u{23F0} ~30 min</p>
      </div>
    `;
  }
  return html;
}

/**
 * Attach event listeners after the dashboard is rendered.
 * @param {function} navigate - Router's navigate function
 */
export function init(navigate) {
  const lang = getLanguage();

  // --- Start Learning Button ---
  const startBtn = document.getElementById('btn-start-learning');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const day = startBtn.dataset.day;
      if (day) navigate('/lesson/' + day);
    });
  }

  // --- Day Cards ---
  document.querySelectorAll('.day-card').forEach(card => {
    card.addEventListener('click', () => {
      const available = card.dataset.available === 'true';
      const day = card.dataset.day;
      if (available && day) {
        navigate('/lesson/' + day);
      } else if (!available) {
        if (window.showToast) { const lang = getLanguage(); window.showToast(lang === 'zh' ? '请先完成前面的课程' : 'Complete previous lessons first', 'streak'); }
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // --- Week Tab Toggle ---
  const tabWeek1 = document.getElementById('tab-week-1');
  const tabWeek2 = document.getElementById('tab-week-2');
  const grid1 = document.getElementById('week-1-grid');
  const grid2 = document.getElementById('week-2-grid');

  if (tabWeek1 && tabWeek2 && grid1 && grid2) {
    tabWeek1.addEventListener('click', () => {
      tabWeek1.className = 'week-tab flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-200 bg-[#FF6B4A] text-white shadow-md';
      tabWeek2.className = 'week-tab flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
      grid1.classList.remove('hidden');
      grid2.classList.add('hidden');
    });

    tabWeek2.addEventListener('click', () => {
      tabWeek2.className = 'week-tab flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-200 bg-[#FF6B4A] text-white shadow-md';
      tabWeek1.className = 'week-tab flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
      grid2.classList.remove('hidden');
      grid1.classList.add('hidden');
    });
  }

  // --- Badge Modal ---
  const modal = document.getElementById('badge-modal');
  const modalContent = document.getElementById('badge-modal-content');
  const modalEmoji = document.getElementById('badge-modal-emoji');
  const modalName = document.getElementById('badge-modal-name');
  const modalDesc = document.getElementById('badge-modal-desc');
  const modalStatus = document.getElementById('badge-modal-status');
  const modalClose = document.getElementById('badge-modal-close');

  document.querySelectorAll('.badge-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!modal || !modalEmoji || !modalName || !modalDesc || !modalStatus) return;

      const unlocked = item.dataset.badgeUnlocked === 'true';
      modalEmoji.textContent = item.dataset.badgeEmoji;
      modalName.textContent = lang === 'zh' ? item.dataset.badgeNameZh : item.dataset.badgeNameEn;
      modalDesc.textContent = lang === 'zh' ? item.dataset.badgeDescZh : item.dataset.badgeDescEn;

      if (unlocked) {
        modalStatus.textContent = lang === 'zh' ? '\u2705 \u5DF2\u89E3\u9501' : '\u2705 Unlocked';
        modalStatus.className = 'text-xs mt-2 font-semibold text-[#4ECDC4]';
      } else {
        modalStatus.textContent = lang === 'zh' ? '\u{1F512} \u672A\u89E3\u9501' : '\u{1F512} Locked';
        modalStatus.className = 'text-xs mt-2 font-semibold text-gray-400';
      }

      modal.classList.remove('hidden');
      // Animate in
      requestAnimationFrame(() => {
        if (modalContent) modalContent.classList.remove('scale-95');
        modalContent?.classList.add('scale-100');
      });
    });
  });

  function closeBadgeModal() {
    if (!modal || !modalContent) return;
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 150);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeBadgeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBadgeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeBadgeModal();
  });
}
