import { vi } from 'vitest';

// Node 25 ships a broken built-in localStorage that overrides jsdom's.
// Replace it with a proper in-memory implementation.
const store = {};
const mockStorage = {
  getItem: vi.fn((key) => store[key] ?? null),
  setItem: vi.fn((key, value) => { store[key] = String(value); }),
  removeItem: vi.fn((key) => { delete store[key]; }),
  clear: vi.fn(() => { for (const k in store) delete store[k]; }),
  get length() { return Object.keys(store).length; },
  key: vi.fn((i) => Object.keys(store)[i] ?? null),
};

vi.stubGlobal('localStorage', mockStorage);
