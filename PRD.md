# Product Requirements Document
## CodeLaunch 码上出发

**Version:** 1.0  |  **Date:** 2026-03-26  |  **URL:** https://claude-code-launch.pages.dev/

---

## 1. Overview

CodeLaunch 码上出发 is a free, bilingual (Chinese/English) tutorial that teaches Chinese international students to build and ship real web projects using Claude Code in 14 days. No prior coding experience required.

**Target audience:** Chinese international students with zero coding background who want to build portfolio-worthy projects using AI-assisted development.

**Core value proposition:** Go from zero coding knowledge to a deployed website in two weeks, with AI guiding every step — in your native language.

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JavaScript ES Modules (no framework) |
| Styling | Tailwind CSS v4 (built via @tailwindcss/cli) + custom CSS |
| Routing | Hash-based SPA router (`#/dashboard`, `#/lesson/:day`) |
| State | localStorage with centralized `getState`/`setState` helpers |
| i18n | Custom bilingual system with `t()` function (Chinese primary, English secondary) |
| Fonts | Inter (English), Noto Sans SC (Chinese), JetBrains Mono (code) |
| Hosting | Cloudflare Pages |
| Analytics | Cloudflare Web Analytics |
| Build | `npm run build:css` — Tailwind CLI compiles to `dist/tailwind.css` (46KB minified) |

## 3. Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Coral | `#FF6B4A` | Primary brand, CTAs, active states |
| Coral Light | `#FF8A6F` | Hover states |
| Coral Dark | `#E55A3A` | Pressed states |
| Navy | `#1A1A2E` | Text, dark backgrounds |
| Navy Light | `#16213E` | Secondary dark |
| Cream | `#FFF8F0` | Page background (light mode) |
| Cream Dark | `#F0E6D8` | Card borders, dividers |
| Mint | `#4ECDC4` | Success states, accents |
| Gold | `#FFD93D` | Badges, celebrations |

### Typography

- **English headings/body:** Inter (weights: 400, 600, 700, 800)
- **Chinese text:** Noto Sans SC (weights: 400, 700)
- **Code blocks:** JetBrains Mono (weights: 400, 600)

### Spacing & Radius

- Border radius scale: 6px / 12px / 20px / 9999px
- Transitions: 0.25s ease (default), 0.4s ease (slow)
- Dark mode via `[data-theme="dark"]` CSS variable overrides

## 4. Pages & Features

| Route | Component | Description |
|-------|-----------|-------------|
| `#/` | `landing.js` | Hero with animated gradient, terminal mockup, pain point cards, 14-day timeline, stats, testimonials, "What's Included" section |
| `#/dashboard` | `dashboard.js` | Progress overview: day cards (locked/unlocked), XP bar, level indicator, streak counter, badge collection, progress ring |
| `#/lesson/:day` | `lesson.js` | Split layout — lesson content (60%) + terminal simulation panel (40%). Sections, quizzes, code examples, mark-complete flow |
| `#/glossary` | `glossary.js` | 86 bilingual tech terms with search, category filters, Word of the Day |
| `#/gallery` | `gallery.js` | 10 showcase projects with category filters, gradient thumbnails, "Learn to Build" links, inspiration section |
| `#/career` | `career.js` | Career resources and guidance for tech job preparation |
| `#/settings` | `settings.js` | Language toggle (zh/en), theme toggle (light/dark), progress reset with confirmation modal, export progress as JSON |

### Gamification System

- **XP Points:** Earned by completing lessons and quizzes
- **6 Levels:** 新手 Beginner (0 XP) → 学徒 Apprentice (300) → 探索者 Explorer (800) → 建造者 Builder (1500) → 创造者 Creator (2500) → 发布者 Shipper (4000)
- **16 Badges:** Unlocked through curriculum milestones
- **Streak Tracking:** Daily visit counter with DST-safe day calculation
- **Confetti:** Canvas-based celebration animation on achievements
- **Toast Notifications:** Slide-in notifications for XP gains, badge unlocks, streaks

## 5. Component Architecture

```
index.html
  └── src/app.js (controller)
        ├── router.js — hash-based routing, getCurrentRoute(), navigate()
        ├── state.js — localStorage CRUD, XP/level/streak/badge helpers
        ├── i18n.js — t() translation, setLanguage(), getLanguage()
        └── components/
              ├── nav.js — fixed top bar, mobile drawer, progress ring, theme toggle
              ├── landing.js — marketing/hero page
              ├── dashboard.js — progress tracking hub
              ├── lesson.js — content viewer + terminal sim
              ├── glossary.js — searchable term dictionary
              ├── gallery.js — project showcase
              ├── career.js — career resources
              └── settings.js — preferences & data management
```

**Pattern:** Each component exports `render(params)` (returns HTML string) and `init(navigate)` (attaches event listeners). The app controller calls both on every route change, with error boundary wrapping.

**Content modules** (`src/content/`):
- `curriculum.js` — 14 days of structured lesson content (Day 1 fully written at ~2000 words bilingual)
- `glossary-data.js` — 86 terms across 6 categories
- `projects.js` — 10 showcase projects with bilingual metadata

## 6. Screenshots

### Desktop (1280x720)
![Desktop](./brief-desktop.png)

### Mobile (375x812)
![Mobile](./brief-mobile.png)

### Interior Page — Glossary
![Interior](./brief-interior.png)

## 7. Accessibility

| Feature | Implementation |
|---------|---------------|
| Skip-to-content link | `<a href="#app" class="sr-only focus:not-sr-only">` |
| Language attribute | `<html lang="zh-CN">`, updated dynamically via `setLanguage()` |
| Focus management | `#app` receives focus on route change (`tabindex="-1"`, `focus({ preventScroll: true })`) |
| Keyboard navigation | Escape closes modals/drawers, Enter/Space on day cards, tab-navigable controls |
| ARIA attributes | `role="main"` on app mount, `aria-live="polite"` on toast container, `aria-label` on progress rings |
| Reduced motion | `@media (prefers-reduced-motion)` disables animations |
| Focus-visible styles | Custom `:focus-visible` outlines on interactive elements |

## 8. Security

| Measure | Details |
|---------|---------|
| X-Frame-Options | `DENY` — prevents clickjacking |
| X-Content-Type-Options | `nosniff` — prevents MIME sniffing |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | Camera, microphone, geolocation all denied |
| X-XSS-Protection | `1; mode=block` |
| No secrets in code | No API keys, tokens, or credentials in source |
| Client-only app | No backend, no user accounts, no server-side data — localStorage only |

## 9. SEO

| Element | Value |
|---------|-------|
| Title | `CodeLaunch 码上出发 — 两周，从零到发布` |
| Meta description | Bilingual, 160 chars, action-oriented |
| Open Graph | Title, description, type, locale (zh_CN + en_US), URL, image |
| Twitter Card | `summary_large_image` with title, description, image |
| Canonical URL | `https://claude-code-launch.pages.dev/` |
| Hreflang | zh + en alternates |
| Structured Data | JSON-LD `Course` schema with `CourseInstance` (online, 14 days, free) |
| Sitemap | `sitemap.xml` with all routes |
| Robots | `robots.txt` allowing all crawlers, referencing sitemap |
| Favicon | SVG rocket emoji |
| PWA Manifest | `manifest.json` with app name, theme color, standalone display |

## 10. Deployment

| Step | Command |
|------|---------|
| Build CSS | `npm run build:css` (`tailwindcss -i src/styles/tailwind.css -o dist/tailwind.css --minify`) |
| Deploy | `wrangler pages deploy .` |
| Platform | Cloudflare Pages |
| GitHub | https://github.com/Joshli316/claude-code-launch |
| Live URL | https://claude-code-launch.pages.dev/ |

No CI/CD pipeline — manual deploy via Wrangler CLI. No build step beyond Tailwind CSS compilation.

## 11. Open Items

| Item | Priority | Notes |
|------|----------|-------|
| Days 2-14 content | High | Structured outlines exist; full bilingual content needed (~2000 words each) |
| OG image | Medium | `og-image.png` referenced in meta tags but file doesn't exist yet |
| Automated tests | Low | No test suite currently; app verified manually |
| CI/CD pipeline | Low | Currently manual deploy; could add GitHub Actions |
