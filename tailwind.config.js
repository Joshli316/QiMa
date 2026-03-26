/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './404.html',
    './src/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coral: { DEFAULT: '#FF6B4A', light: '#FF8A6F', dark: '#E55A3A' },
        navy: { DEFAULT: '#1A1A2E', light: '#16213E' },
        cream: { DEFAULT: '#FFF8F0', dark: '#F0E6D8' },
        mint: { DEFAULT: '#4ECDC4', light: '#6FE3DC', dark: '#3AB5AD' },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
        chinese: ['Noto Sans SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
