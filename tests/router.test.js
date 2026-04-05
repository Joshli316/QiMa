import { describe, it, expect, beforeEach } from 'vitest';
import { getCurrentRoute, routes } from '../src/router.js';

beforeEach(() => {
  window.location.hash = '';
});

describe('getCurrentRoute', () => {
  it('returns landing for empty hash', () => {
    window.location.hash = '';
    const r = getCurrentRoute();
    expect(r.name).toBe('landing');
    expect(r.params).toEqual({});
  });

  it('matches static routes', () => {
    window.location.hash = '#/dashboard';
    expect(getCurrentRoute().name).toBe('dashboard');

    window.location.hash = '#/glossary';
    expect(getCurrentRoute().name).toBe('glossary');

    window.location.hash = '#/settings';
    expect(getCurrentRoute().name).toBe('settings');
  });

  it('matches parameterised lesson route', () => {
    window.location.hash = '#/lesson/5';
    const r = getCurrentRoute();
    expect(r.name).toBe('lesson');
    expect(r.params).toEqual({ day: '5' });
  });

  it('decodes URI-encoded params', () => {
    window.location.hash = '#/lesson/hello%20world';
    const r = getCurrentRoute();
    expect(r.params.day).toBe('hello world');
  });

  it('falls back to landing for unknown routes', () => {
    window.location.hash = '#/nonexistent';
    expect(getCurrentRoute().name).toBe('landing');
  });

  it('falls back for too-deep paths', () => {
    window.location.hash = '#/lesson/5/extra';
    expect(getCurrentRoute().name).toBe('landing');
  });
});

describe('routes table', () => {
  it('has all expected routes defined', () => {
    const names = Object.values(routes);
    expect(names).toContain('landing');
    expect(names).toContain('dashboard');
    expect(names).toContain('lesson');
    expect(names).toContain('glossary');
    expect(names).toContain('commands');
    expect(names).toContain('gallery');
    expect(names).toContain('career');
    expect(names).toContain('settings');
  });
});
