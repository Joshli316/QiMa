import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getState, setState, resetState,
  addXP, unlockBadge, completeLesson,
  getLevel, updateStreak, getProgress,
} from '../src/state.js';

beforeEach(() => {
  localStorage.clear();
});

describe('getState / setState', () => {
  it('returns defaults when localStorage is empty', () => {
    const s = getState();
    expect(s.currentDay).toBe(1);
    expect(s.completedLessons).toEqual([]);
    expect(s.xp).toBe(0);
    expect(s.language).toBe('zh');
    expect(s.started).toBe(false);
  });

  it('merges partial updates and persists', () => {
    setState({ xp: 100, started: true });
    const s = getState();
    expect(s.xp).toBe(100);
    expect(s.started).toBe(true);
    expect(s.language).toBe('zh'); // untouched default
  });

  it('survives corrupted localStorage gracefully', () => {
    localStorage.setItem('codelaunch_state', 'not json');
    const s = getState();
    expect(s.currentDay).toBe(1); // falls back to defaults
  });
});

describe('resetState', () => {
  it('clears all progress back to defaults', () => {
    setState({ xp: 500, completedLessons: [1, 2, 3] });
    const s = resetState();
    expect(s.xp).toBe(0);
    expect(s.completedLessons).toEqual([]);
  });
});

describe('addXP', () => {
  it('adds XP cumulatively', () => {
    addXP(100);
    addXP(50);
    expect(getState().xp).toBe(150);
  });

  it('returns the new total', () => {
    const total = addXP(200);
    expect(total).toBe(200);
  });
});

describe('unlockBadge', () => {
  it('adds a new badge and returns true', () => {
    expect(unlockBadge('first-launch')).toBe(true);
    expect(getState().badges).toContain('first-launch');
  });

  it('returns false for already earned badge', () => {
    unlockBadge('first-launch');
    expect(unlockBadge('first-launch')).toBe(false);
  });
});

describe('completeLesson', () => {
  it('marks a lesson as complete', () => {
    completeLesson(3);
    expect(getState().completedLessons).toContain(3);
  });

  it('does not duplicate a lesson', () => {
    completeLesson(3);
    completeLesson(3);
    expect(getState().completedLessons.filter(d => d === 3)).toHaveLength(1);
  });

  it('handles string day numbers', () => {
    completeLesson('5');
    expect(getState().completedLessons).toContain(5);
  });
});

describe('getLevel', () => {
  it('starts at level 1 with 0 XP', () => {
    expect(getLevel().level).toBe(1);
  });

  it('levels up at XP thresholds', () => {
    setState({ xp: 300 });
    expect(getLevel().level).toBe(2);

    setState({ xp: 4000 });
    expect(getLevel().level).toBe(6);
  });

  it('returns bilingual level name', () => {
    const lvl = getLevel();
    expect(lvl.name.zh).toBe('新手');
    expect(lvl.name.en).toBe('Beginner');
  });
});

describe('updateStreak', () => {
  it('starts streak at 1 on first visit', () => {
    const streak = updateStreak();
    expect(streak).toBe(1);
  });

  it('does not change streak on same-day visit', () => {
    updateStreak();
    const streak = updateStreak();
    expect(streak).toBe(1);
  });

  it('increments streak for consecutive days', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setState({ lastVisit: yesterday.toISOString().slice(0, 10), streak: 3 });

    const streak = updateStreak();
    expect(streak).toBe(4);
  });

  it('resets streak after gap', () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    setState({ lastVisit: threeDaysAgo.toISOString().slice(0, 10), streak: 5 });

    const streak = updateStreak();
    expect(streak).toBe(1);
  });
});

describe('getProgress', () => {
  it('returns 0% with no completed lessons', () => {
    const p = getProgress();
    expect(p.completed).toBe(0);
    expect(p.total).toBe(14);
    expect(p.percentage).toBe(0);
  });

  it('calculates percentage correctly', () => {
    setState({ completedLessons: [1, 2, 3, 4, 5, 6, 7] });
    const p = getProgress();
    expect(p.completed).toBe(7);
    expect(p.percentage).toBe(50);
  });
});
