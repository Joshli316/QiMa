// ============================================
// CodeLaunch i18n — Bilingual Content System
// ============================================

let currentLang = 'zh';

const strings = {
  // --- Nav ---
  nav_dashboard:    { zh: '仪表盘', en: 'Dashboard' },
  nav_lessons:      { zh: '课程', en: 'Lessons' },
  nav_glossary:     { zh: '词汇表', en: 'Glossary' },
  nav_gallery:      { zh: '作品廊', en: 'Gallery' },
  nav_career:       { zh: '职业', en: 'Career' },
  nav_settings:     { zh: '设置', en: 'Settings' },

  // --- Landing ---
  landing_headline:     { zh: '零基础，用AI写出你的第一个网站', en: 'Build your first website from scratch with AI' },
  landing_subheadline:  { zh: '从零到部署，每一步都有AI陪你完成', en: 'From zero to deployed — AI guides every step' },
  landing_cta:          { zh: '免费开始学习', en: 'Start Learning Free' },
  landing_pain1:        { zh: '不知道从哪开始？', en: "Don't know where to start?" },
  landing_pain2:        { zh: '学了理论却做不出东西？', en: 'Learned theory but can\'t build anything?' },
  landing_pain3:        { zh: '教程太长，看不下去？', en: 'Tutorials too long to follow?' },
  landing_pricing_free: { zh: '免费', en: 'Free' },
  landing_pricing_desc: { zh: '所有课程完全免费开放', en: 'All lessons completely free' },

  // --- Dashboard ---
  dash_progress:       { zh: '学习进度', en: 'Progress' },
  dash_streak:         { zh: '连续学习', en: 'Streak' },
  dash_streak_days:    { zh: '天', en: 'days' },
  dash_xp:             { zh: '经验值', en: 'XP' },
  dash_badges:         { zh: '徽章', en: 'Badges' },
  dash_stats_lessons:  { zh: '已完成课程', en: 'Lessons Completed' },
  dash_stats_code:     { zh: '代码行数', en: 'Lines of Code' },
  dash_stats_time:     { zh: '学习时间', en: 'Time Spent' },
  dash_stats_quizzes:  { zh: '测验通过', en: 'Quizzes Passed' },
  dash_week_this:      { zh: '本周', en: 'This Week' },
  dash_week_last:      { zh: '上周', en: 'Last Week' },
  dash_week_all:       { zh: '全部', en: 'All Time' },

  // --- Lesson ---
  lesson_tryIt:        { zh: '动手试试', en: 'Try It' },
  lesson_copyCode:     { zh: '复制代码', en: 'Copy Code' },
  lesson_copied:       { zh: '已复制！', en: 'Copied!' },
  lesson_markComplete: { zh: '标记完成', en: 'Mark Complete' },
  lesson_nextLesson:   { zh: '下一课', en: 'Next Lesson' },
  lesson_prevLesson:   { zh: '上一课', en: 'Previous Lesson' },
  lesson_quiz:         { zh: '小测验', en: 'Quiz' },
  lesson_quiz_check:   { zh: '检查答案', en: 'Check Answer' },
  lesson_quiz_correct: { zh: '回答正确！', en: 'Correct!' },
  lesson_quiz_wrong:   { zh: '再试一次', en: 'Try Again' },
  lesson_quiz_score:   { zh: '得分', en: 'Score' },

  // --- Glossary ---
  glossary_search:     { zh: '搜索术语...', en: 'Search terms...' },
  glossary_cat_all:    { zh: '全部', en: 'All' },
  glossary_cat_html:   { zh: 'HTML', en: 'HTML' },
  glossary_cat_css:    { zh: 'CSS', en: 'CSS' },
  glossary_cat_js:     { zh: 'JavaScript', en: 'JavaScript' },
  glossary_cat_tools:  { zh: '工具', en: 'Tools' },
  glossary_cat_deploy: { zh: '部署', en: 'Deploy' },
  glossary_wordOfDay:  { zh: '今日词汇', en: 'Word of the Day' },

  // --- Gallery ---
  gallery_filterAll:   { zh: '全部作品', en: 'All Projects' },
  gallery_buildThis:   { zh: '我要做这个', en: 'Build This' },
  gallery_inspiration: { zh: '寻找灵感', en: 'Get Inspired' },

  // --- Career ---
  career_whyMatters:    { zh: '为什么编程重要？', en: 'Why Coding Matters' },
  career_resumeTips:    { zh: '简历加分技巧', en: 'Resume Tips' },
  career_interviewPrep: { zh: '面试准备', en: 'Interview Prep' },

  // --- Settings ---
  settings_language:       { zh: '语言', en: 'Language' },
  settings_theme:          { zh: '主题', en: 'Theme' },
  settings_theme_light:    { zh: '浅色', en: 'Light' },
  settings_theme_dark:     { zh: '深色', en: 'Dark' },
  settings_resetProgress:  { zh: '重置学习进度', en: 'Reset Progress' },
  settings_exportProgress: { zh: '导出学习数据', en: 'Export Progress' },

  // --- Gamification ---
  level_1:  { zh: '代码萌新', en: 'Code Newbie' },
  level_2:  { zh: 'HTML学徒', en: 'HTML Apprentice' },
  level_3:  { zh: 'CSS工匠', en: 'CSS Crafter' },
  level_4:  { zh: 'JS探索者', en: 'JS Explorer' },
  level_5:  { zh: '全栈新星', en: 'Full-Stack Rising Star' },

  // Curriculum lesson badges (keys must match: 'badge_' + curriculum badge ID)
  'badge_first-launch':     { zh: '首次启动', en: 'First Launch' },
  'badge_first-page':       { zh: '第一个页面', en: 'First Page' },
  'badge_style-master':     { zh: '样式大师', en: 'Style Master' },
  'badge_prompt-pro':       { zh: '提示词达人', en: 'Prompt Pro' },
  'badge_interactive':      { zh: '交互达人', en: 'Interactive' },
  'badge_portfolio-ready':  { zh: '作品集就绪', en: 'Portfolio Ready' },
  'badge_architect':        { zh: '架构师', en: 'Architect' },
  'badge_data-wizard':      { zh: '数据巫师', en: 'Data Wizard' },
  'badge_bug-squasher':     { zh: '除虫达人', en: 'Bug Squasher' },
  'badge_shipped-it':       { zh: '成功发布', en: 'Shipped It' },
  'badge_power-user':       { zh: '高级用户', en: 'Power User' },
  'badge_graduate':         { zh: '毕业啦', en: 'Graduate' },
  // Special badges
  'badge_streak-3':         { zh: '三天连续', en: '3-Day Streak' },
  'badge_streak-7':         { zh: '一周坚持', en: '7-Day Streak' },
  'badge_all-complete':     { zh: '全部通关', en: 'All Complete' },
  'badge_speedrun':         { zh: '极速通关', en: 'Speed Runner' },

  toast_lesson_complete:  { zh: '课程完成！经验 +{xp}', en: 'Lesson complete! +{xp} XP' },
  toast_badge_unlocked:   { zh: '解锁新徽章：{badge}', en: 'Badge unlocked: {badge}' },
  toast_level_up:         { zh: '升级了！你现在是 {level}', en: 'Level up! You are now {level}' },
  toast_streak:           { zh: '连续学习 {days} 天！', en: '{days}-day streak!' },

  // --- Common ---
  common_loading:  { zh: '加载中...', en: 'Loading...' },
  common_error:    { zh: '出错了，请重试', en: 'Something went wrong. Please try again.' },
  common_confirm:  { zh: '确认', en: 'Confirm' },
  common_cancel:   { zh: '取消', en: 'Cancel' },
  common_back:     { zh: '返回', en: 'Back' },
  common_viewAll:  { zh: '查看全部', en: 'View All' },
};

/**
 * Get a translated string by key.
 * Supports interpolation: t('toast_xp', { xp: 50 })
 */
export function t(key, params) {
  const entry = strings[key];
  if (!entry) {
    console.warn(`[i18n] Missing key: "${key}"`);
    return key;
  }
  let str = entry[currentLang] || entry['en'] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(`{${k}}`, v);
    }
  }
  return str;
}

/**
 * Set the active language and persist to localStorage.
 */
export function setLanguage(lang) {
  if (lang !== 'zh' && lang !== 'en') return;
  currentLang = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  try {
    const raw = localStorage.getItem('codelaunch_state');
    if (raw) {
      const state = JSON.parse(raw);
      state.language = lang;
      localStorage.setItem('codelaunch_state', JSON.stringify(state));
    }
  } catch { /* ignore */ }
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Get the current language code.
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Toggle between zh and en.
 */
export function toggleLanguage() {
  setLanguage(currentLang === 'zh' ? 'en' : 'zh');
}
