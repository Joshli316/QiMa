// ============================================
// CodeLaunch — Lesson Viewer Component
// ============================================

import { t, getLanguage } from '../i18n.js';
import { getState, addXP, unlockBadge, completeLesson } from '../state.js';
import { getCurriculum } from '../content/curriculum.js';

// ── Helpers ──

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function bilingual(zh, en) {
  return `
    <span class="lesson-zh">${zh}</span>
    <span class="lesson-en">${en}</span>
  `;
}

// ── Section Renderers ──

function renderTextSection(section) {
  return `
    <div class="lesson-section lesson-section--text animate-slide-up">
      <p class="lesson-text-zh">${section.zh}</p>
      <p class="lesson-text-en">${section.en}</p>
    </div>
  `;
}

function renderConceptSection(section) {
  return `
    <div class="lesson-section lesson-section--concept animate-slide-up">
      <div class="concept-card">
        <div class="concept-term">${escapeHtml(section.term)}</div>
        <p class="concept-zh">${section.zh}</p>
        <p class="concept-en">${section.en}</p>
      </div>
    </div>
  `;
}

function renderStepsSection(section) {
  // Support both { steps: [{zh,en}] } and { zh: string[], en: string[] }
  let steps;
  if (section.steps) {
    steps = section.steps;
  } else if (Array.isArray(section.zh)) {
    steps = section.zh.map((zhText, i) => ({
      zh: zhText,
      en: (section.en && section.en[i]) || ''
    }));
  } else {
    steps = [];
  }

  const stepsHtml = steps.map((step, i) => `
    <li class="step-item">
      <span class="step-number">${i + 1}</span>
      <div class="step-content">
        <p class="step-zh">${step.zh}</p>
        <p class="step-en">${step.en}</p>
      </div>
    </li>
  `).join('');

  return `
    <div class="lesson-section lesson-section--steps animate-slide-up">
      ${section.title ? `<h3 class="section-title">${bilingual(section.title.zh, section.title.en)}</h3>` : ''}
      <ol class="step-list">${stepsHtml}</ol>
    </div>
  `;
}

function renderTerminalSection(section, index) {
  // On mobile we render inline; on desktop this goes to the right panel.
  // We render a mobile-only version here and a desktop version in the terminal panel.
  return `
    <div class="lesson-section lesson-section--terminal-inline show-mobile animate-slide-up">
      <div class="terminal-block" data-terminal-index="${index}">
        <div class="terminal-block__header">
          <span class="terminal-block__dots">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
          </span>
          <span class="terminal-block__title">Terminal</span>
          <button class="terminal-copy-btn" data-command="${escapeHtml(section.command)}" title="${t('lesson_copyCode')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="copy-label">${t('lesson_copyCode')}</span>
          </button>
        </div>
        <div class="terminal-block__body">
          <div class="terminal-prompt"><span class="terminal-prompt__symbol">$</span> <span class="terminal-prompt__cmd">${escapeHtml(section.command)}</span></div>
          ${section.output ? `<div class="terminal-output-text">${Array.isArray(section.output) ? section.output.map(l => escapeHtml(l)).join('\n') : escapeHtml(section.output)}</div>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderQuizSection(section, sectionIndex) {
  // Support both single question (from curriculum) and array of questions
  const questions = section.questions || [section];
  const lang = getLanguage();

  const questionsHtml = questions.map((q, qi) => {
    const opts = q.options || {};
    const optsArr = Array.isArray(opts) ? opts : (opts[lang] || opts.zh || []);
    const optionsHtml = optsArr.map((opt, oi) => `
      <button class="quiz-option" data-section="${sectionIndex}" data-question="${qi}" data-option="${oi}">
        <span class="quiz-option__letter">${String.fromCharCode(65 + oi)}</span>
        <span class="quiz-option__text">${typeof opt === 'object' ? bilingual(opt.zh, opt.en) : opt}</span>
      </button>
    `).join('');

    const questionText = q.question || q.text || { zh: '', en: '' };

    return `
      <div class="quiz-question" data-section="${sectionIndex}" data-question="${qi}">
        <h4 class="quiz-question__title">
          <span class="quiz-icon">&#x1F4DD;</span>
          ${bilingual(questionText.zh, questionText.en)}
        </h4>
        <div class="quiz-options">${optionsHtml}</div>
        <div class="quiz-explanation" style="display:none;">
          ${q.explanation ? bilingual(q.explanation.zh, q.explanation.en) : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="lesson-section lesson-section--quiz animate-slide-up">
      <div class="quiz-header">
        <span class="quiz-badge">${t('lesson_quiz')}</span>
      </div>
      ${questionsHtml}
    </div>
  `;
}

function renderTipSection(section) {
  return `
    <div class="lesson-section lesson-section--tip animate-slide-up">
      <div class="callout callout--tip">
        <span class="callout__icon">&#x1F4A1;</span>
        <div class="callout__content">
          <p class="callout__zh">${section.zh}</p>
          <p class="callout__en">${section.en}</p>
        </div>
      </div>
    </div>
  `;
}

function renderWarningSection(section) {
  return `
    <div class="lesson-section lesson-section--warning animate-slide-up">
      <div class="callout callout--warning">
        <span class="callout__icon">&#x26A0;&#xFE0F;</span>
        <div class="callout__content">
          <p class="callout__zh">${section.zh}</p>
          <p class="callout__en">${section.en}</p>
        </div>
      </div>
    </div>
  `;
}

function renderImageSection(section) {
  return `
    <div class="lesson-section lesson-section--image animate-slide-up">
      <div class="image-placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <p class="image-placeholder__text">${bilingual(section.zh || section.description, section.en || section.description)}</p>
      </div>
    </div>
  `;
}

// ── Terminal Panel (desktop right side) ──

function renderTerminalPanel(sections) {
  const terminalSections = sections
    .map((s, i) => ({ ...(s.content || s), _index: i, type: s.type }))
    .filter(s => s.type === 'terminal');

  if (terminalSections.length === 0) {
    return `
      <div class="terminal-panel__empty">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3;margin-bottom:12px">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
        <p style="color:#8B949E;font-size:13px;text-align:center;">
          &#x672C;&#x8BFE;&#x7EC8;&#x7AEF;&#x793A;&#x4F8B;&#x5C06;&#x663E;&#x793A;&#x5728;&#x8FD9;&#x91CC;
          <br><span style="font-size:11px;opacity:0.6;">Terminal examples for this lesson will appear here</span>
        </p>
      </div>
    `;
  }

  const blocksHtml = terminalSections.map(section => `
    <div class="terminal-block" data-terminal-index="${section._index}">
      <div class="terminal-block__copy-row">
        <button class="terminal-copy-btn" data-command="${escapeHtml(section.command)}" title="${t('lesson_copyCode')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="copy-label">${t('lesson_copyCode')}</span>
        </button>
      </div>
      <div class="terminal-prompt"><span class="terminal-prompt__symbol">$</span> <span class="terminal-prompt__cmd">${escapeHtml(section.command)}</span></div>
      ${section.output ? `<div class="terminal-output-text">${Array.isArray(section.output) ? section.output.map(l => escapeHtml(l)).join('\n') : escapeHtml(section.output)}</div>` : ''}
    </div>
  `).join('');

  return blocksHtml;
}

// ── Main Render ──

export function render(params) {
  const day = parseInt(params.day, 10);
  if (isNaN(day) || day < 1 || day > 14) {
    return `<div class="lesson-page" style="padding:120px 20px;text-align:center;">
    <h2 style="font-size:1.3rem;font-weight:700;color:var(--text);">课程未找到 / Lesson not found</h2>
    <a href="#/dashboard" style="color:var(--coral);margin-top:20px;display:inline-block;">返回仪表盘 / Back to Dashboard</a>
  </div>`;
  }
  const lesson = getCurriculum(day);

  if (!lesson) {
    return `
      <div class="lesson-page" style="padding:80px 20px;text-align:center;">
        <h2 style="color:var(--text);">&#x8BFE;&#x7A0B;&#x672A;&#x627E;&#x5230; / Lesson not found</h2>
        <p style="color:var(--text-muted);margin-top:12px;">Day ${day}</p>
        <a href="#/dashboard" style="color:var(--coral);margin-top:20px;display:inline-block;">${t('common_back')}</a>
      </div>
    `;
  }

  const state = getState();
  const isCompleted = state.completedLessons.includes(day);
  // Build content sections
  const contentHtml = lesson.sections.map((section, i) => {
    const c = section.content || section;
    switch (section.type) {
      case 'text':     return renderTextSection(c);
      case 'concept':  return renderConceptSection(c);
      case 'steps':    return renderStepsSection(c);
      case 'terminal': return renderTerminalSection(c, i);
      case 'quiz':     return renderQuizSection(c, i);
      case 'tip':      return renderTipSection(c);
      case 'warning':  return renderWarningSection(c);
      case 'image':    return renderImageSection(c);
      default:         return '';
    }
  }).join('');

  // Terminal panel content
  const terminalPanelHtml = renderTerminalPanel(lesson.sections);

  return `
    <div class="lesson-page" data-day="${day}">

      <!-- Progress Bar -->
      <div class="lesson-progress-bar" id="lesson-progress-bar">
        <div class="lesson-progress-bar__fill" id="lesson-progress-fill" style="width:0%"></div>
      </div>

      <!-- Header -->
      <div class="lesson-header">
        <div class="lesson-header__inner">
          <a href="#/dashboard" class="lesson-back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
          <div class="lesson-header__text">
            <span class="lesson-day-badge">Day ${day}</span>
            <h1 class="lesson-title">
              <span class="lesson-title__zh">${lesson.title.zh}</span>
              <span class="lesson-title__en">${lesson.title.en}</span>
            </h1>
          </div>
          ${isCompleted ? '<span class="lesson-completed-badge">&#x2705;</span>' : ''}
        </div>
      </div>

      <!-- Split Layout -->
      <div class="lesson-layout">

        <!-- Left: Content Panel -->
        <div class="lesson-content" id="lesson-content">
          ${contentHtml}
        </div>

        <!-- Right: Terminal Panel (desktop only) -->
        <div class="lesson-terminal-panel hide-mobile" id="lesson-terminal-panel">
          <div class="terminal-panel-wrapper">
            <div class="terminal-panel__topbar">
              <span class="terminal-panel__dots">
                <span class="terminal-dot red"></span>
                <span class="terminal-dot yellow"></span>
                <span class="terminal-dot green"></span>
              </span>
              <span class="terminal-panel__label">Terminal</span>
            </div>
            <div class="terminal-panel__body" id="terminal-panel-body">
              ${terminalPanelHtml}
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Navigation -->
      <div class="lesson-bottom-nav">
        <div class="lesson-bottom-nav__inner">
          ${day > 1 ? `
            <button class="lesson-nav-btn lesson-nav-btn--prev" data-nav="prev">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              ${t('lesson_prevLesson')}
            </button>
          ` : '<div></div>'}

          ${!isCompleted ? `
            <button class="lesson-nav-btn lesson-nav-btn--complete" id="btn-mark-complete" data-day="${day}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              ${t('lesson_markComplete')}
            </button>
          ` : `
            <span class="lesson-completed-label">&#x2705; ${t('lesson_markComplete')}</span>
          `}

          ${day < 14 ? `
            <button class="lesson-nav-btn lesson-nav-btn--next" data-nav="next">
              ${t('lesson_nextLesson')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ` : '<div></div>'}
        </div>
      </div>

    </div>
  `;
}

// ── Cleanup previous scroll listener ──
let _scrollHandler = null;

// ── Init ──

export function init(navigate) {
  // Remove previous scroll listener to prevent leaks
  if (_scrollHandler) {
    window.removeEventListener('scroll', _scrollHandler);
    _scrollHandler = null;
  }
  const page = document.querySelector('.lesson-page');
  if (!page) return;

  const day = parseInt(page.dataset.day, 10);
  const lesson = getCurriculum(day);
  if (!lesson) return;

  // ── Quiz answer clicks ──
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionIdx = parseInt(btn.dataset.section, 10);
      const questionIdx = parseInt(btn.dataset.question, 10);
      const optionIdx = parseInt(btn.dataset.option, 10);

      const section = lesson.sections[sectionIdx];
      if (!section || section.type !== 'quiz') return;

      const sectionContent = section.content || section;
      const question = sectionContent.questions ? sectionContent.questions[questionIdx] : sectionContent;
      if (!question) return;

      // Get all options for this question
      const questionEl = btn.closest('.quiz-question');
      if (!questionEl) return;
      const allOptions = questionEl.querySelectorAll('.quiz-option');

      // Check if already answered
      if (questionEl.dataset.answered === 'true') return;

      const correctIdx = question.correctIndex;
      const isCorrect = optionIdx === correctIdx;

      if (isCorrect) {
        btn.classList.add('quiz-option--correct', 'quiz-option--answered');
        questionEl.dataset.answered = 'true';

        // Dim other options
        allOptions.forEach(o => {
          if (o !== btn) o.classList.add('quiz-option--dimmed', 'quiz-option--answered');
        });

        // Add XP
        addXP(25);
        if (window.showToast) {
          window.showToast(t('lesson_quiz_correct') + ' +25 XP', 'xp');
        }

        // Show explanation
        const explanation = questionEl.querySelector('.quiz-explanation');
        if (explanation && explanation.textContent.trim()) {
          explanation.style.display = 'block';
        }
      } else {
        btn.classList.add('quiz-option--wrong');
        setTimeout(() => {
          btn.classList.remove('quiz-option--wrong');
        }, 600);
      }
    });
  });

  // ── Copy button clicks ──
  document.querySelectorAll('.terminal-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const command = btn.dataset.command;
      if (!command) return;

      try {
        await navigator.clipboard.writeText(command);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = command;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      const label = btn.querySelector('.copy-label');
      const originalText = label ? label.textContent : '';
      if (label) label.textContent = t('lesson_copied');
      btn.classList.add('copied');

      setTimeout(() => {
        if (label) label.textContent = originalText;
        btn.classList.remove('copied');
      }, 2000);
    });
  });

  // ── Mark complete ──
  const completeBtn = document.getElementById('btn-mark-complete');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      const lessonDay = parseInt(completeBtn.dataset.day, 10);

      // Complete the lesson
      completeLesson(lessonDay);

      // Add XP
      const xpAmount = lesson.xp || 50;
      addXP(xpAmount);

      // Show XP toast
      if (window.showToast) {
        window.showToast(t('toast_lesson_complete', { xp: xpAmount }), 'xp');
      }

      // Check for badge
      if (lesson.badge) {
        const isNew = unlockBadge(lesson.badge);
        if (isNew) {
          if (window.triggerConfetti) window.triggerConfetti();
          if (window.showToast) {
            const badgeName = t('badge_' + lesson.badge) || lesson.badge;
            setTimeout(() => {
              window.showToast(t('toast_badge_unlocked', { badge: badgeName }), 'badge');
            }, 500);
          }
        }
      }

      // Re-render to update UI
      navigate('/lesson/' + lessonDay);
    });
  }

  // ── Previous / Next navigation ──
  document.querySelectorAll('.lesson-nav-btn[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const direction = btn.dataset.nav;
      if (direction === 'prev' && day > 1) {
        navigate('/lesson/' + (day - 1));
      } else if (direction === 'next' && day < 14) {
        const st = getState();
        if (st.completedLessons.includes(day)) {
          navigate('/lesson/' + (day + 1));
        } else {
          if (window.showToast) {
            window.showToast(getLanguage() === 'zh' ? '请先完成当前课程' : 'Complete this lesson first', 'streak');
          }
        }
      }
    });
  });

  // ── Scroll progress tracking ──
  const contentEl = document.getElementById('lesson-content');
  const progressFill = document.getElementById('lesson-progress-fill');

  if (contentEl && progressFill) {
    function updateScrollProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      progressFill.style.width = (progress * 100) + '%';
    }

    _scrollHandler = updateScrollProgress;
    window.addEventListener('scroll', _scrollHandler, { passive: true });
    _scrollHandler();
  }
}
