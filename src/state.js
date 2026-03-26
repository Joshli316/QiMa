/**
 * CodeLaunch 码上出发 — State Management
 * localStorage-based state with defaults and helper functions.
 */

const STORAGE_KEY = 'codelaunch_state';

const LEVELS = [
  { level: 1, name: { zh: '新手', en: 'Beginner' }, minXP: 0, nextXP: 300 },
  { level: 2, name: { zh: '学徒', en: 'Apprentice' }, minXP: 300, nextXP: 800 },
  { level: 3, name: { zh: '探索者', en: 'Explorer' }, minXP: 800, nextXP: 1500 },
  { level: 4, name: { zh: '建造者', en: 'Builder' }, minXP: 1500, nextXP: 2500 },
  { level: 5, name: { zh: '创造者', en: 'Creator' }, minXP: 2500, nextXP: 4000 },
  { level: 6, name: { zh: '发布者', en: 'Shipper' }, minXP: 4000, nextXP: null },
];

const TOTAL_LESSONS = 14;

function getDefaults() {
  return {
    currentDay: 1,
    completedLessons: [],
    xp: 0,
    streak: 0,
    lastVisit: null,
    badges: [],
    quizScores: {},
    language: 'zh',
    theme: 'light',
    started: false,
  };
}

/**
 * Reads state from localStorage, returning defaults for any missing fields.
 */
export function getState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaults();
    const saved = JSON.parse(raw);
    return { ...getDefaults(), ...saved };
  } catch {
    return getDefaults();
  }
}

/**
 * Merges a partial update into state and persists to localStorage.
 */
export function setState(partial) {
  const state = { ...getState(), ...partial };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* storage full — silently continue */ }
  return state;
}

/**
 * Resets state to defaults.
 */
export function resetState() {
  const defaults = getDefaults();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
}

/**
 * Adds XP, saves, and returns the new total.
 */
export function addXP(amount) {
  const state = getState();
  const newXP = state.xp + amount;
  setState({ xp: newXP });
  return newXP;
}

/**
 * Adds a badge if not already earned. Returns true if newly unlocked.
 */
export function unlockBadge(id) {
  const state = getState();
  if (state.badges.includes(id)) return false;
  setState({ badges: [...state.badges, id] });
  return true;
}

/**
 * Marks a lesson day as complete. Adds to completedLessons if not already there.
 */
export function completeLesson(day) {
  const d = Number(day);
  const state = getState();
  if (state.completedLessons.includes(d)) return;
  setState({ completedLessons: [...state.completedLessons, d] });
}

/**
 * Computes the current level from XP.
 * Returns { level, name: {zh, en}, minXP, nextXP }.
 */
export function getLevel() {
  const { xp } = getState();
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return { ...LEVELS[i] };
    }
  }
  return { ...LEVELS[0] };
}

/**
 * Updates the daily streak based on lastVisit.
 * - Yesterday: increment streak.
 * - Today: no change.
 * - Older / null: reset streak to 1.
 * Saves lastVisit as today's ISO date string.
 */
export function updateStreak() {
  const state = getState();
  const today = new Date().toISOString().slice(0, 10);

  if (state.lastVisit === today) {
    return state.streak;
  }

  let newStreak;

  if (state.lastVisit) {
    const lastDate = new Date(state.lastVisit);
    const todayDate = new Date(today);
    const diffMs = todayDate - lastDate;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak = state.streak + 1;
    } else {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  setState({ streak: newStreak, lastVisit: today });
  return newStreak;
}

/**
 * Apply a theme to the document and persist to state.
 * Single source of truth for theme changes — call this instead of
 * manipulating classList/dataset directly.
 */
export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  setState({ theme });
}

/**
 * Toggle between light and dark theme.
 */
export function toggleTheme() {
  const { theme } = getState();
  applyTheme(theme === 'dark' ? 'light' : 'dark');
}

/**
 * Returns progress summary: completed count, total, and percentage.
 */
export function getProgress() {
  const { completedLessons } = getState();
  const completed = completedLessons.length;
  return {
    completed,
    total: TOTAL_LESSONS,
    percentage: Math.round((completed / TOTAL_LESSONS) * 100),
  };
}
