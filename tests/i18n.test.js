import { describe, it, expect, beforeEach } from 'vitest';
import { t, setLanguage, getLanguage, toggleLanguage } from '../src/i18n.js';

beforeEach(() => {
  localStorage.clear();
  setLanguage('zh');
});

describe('t() translation', () => {
  it('returns Chinese string by default', () => {
    expect(t('nav_dashboard')).toBe('仪表盘');
  });

  it('returns English string after switching language', () => {
    setLanguage('en');
    expect(t('nav_dashboard')).toBe('Dashboard');
  });

  it('returns the key for missing translations', () => {
    expect(t('nonexistent_key')).toBe('nonexistent_key');
  });

  it('interpolates parameters', () => {
    const result = t('toast_lesson_complete', { xp: 50 });
    expect(result).toContain('50');
  });

  it('interpolates multiple parameters', () => {
    setLanguage('en');
    const result = t('toast_streak', { days: 7 });
    expect(result).toBe('7-day streak!');
  });
});

describe('setLanguage', () => {
  it('switches to English', () => {
    setLanguage('en');
    expect(getLanguage()).toBe('en');
  });

  it('ignores invalid language codes', () => {
    setLanguage('fr');
    expect(getLanguage()).toBe('zh');
  });

  it('sets document.documentElement.lang', () => {
    setLanguage('en');
    expect(document.documentElement.lang).toBe('en');

    setLanguage('zh');
    expect(document.documentElement.lang).toBe('zh-CN');
  });
});

describe('toggleLanguage', () => {
  it('toggles zh → en → zh', () => {
    expect(getLanguage()).toBe('zh');
    toggleLanguage();
    expect(getLanguage()).toBe('en');
    toggleLanguage();
    expect(getLanguage()).toBe('zh');
  });
});
