/**
 * CodeLaunch 码上出发 — Hash-based SPA Router
 */

/**
 * Route patterns mapped to component names.
 */
export const routes = {
  '/': 'landing',
  '/dashboard': 'dashboard',
  '/lesson/:day': 'lesson',
  '/glossary': 'glossary',
  '/commands': 'commands',
  '/gallery': 'gallery',
  '/career': 'career',
  '/settings': 'settings',
};

/**
 * Navigates to a path by setting the hash.
 */
export function navigate(path) {
  window.location.hash = '#' + path;
}

/**
 * Parses the current hash and returns the matched route.
 * Returns { name: string, params: object }.
 */
export function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || '/';
  const path = hash.startsWith('/') ? hash : '/' + hash;

  const pathSegments = path.split('/').filter(Boolean);

  for (const [pattern, name] of Object.entries(routes)) {
    const patternSegments = pattern.split('/').filter(Boolean);

    if (patternSegments.length !== pathSegments.length) continue;

    const params = {};
    let matched = true;

    for (let i = 0; i < patternSegments.length; i++) {
      if (patternSegments[i].startsWith(':')) {
        const key = patternSegments[i].slice(1);
        params[key] = decodeURIComponent(pathSegments[i]);
      } else if (patternSegments[i] !== pathSegments[i]) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return { name, params };
    }
  }

  // No match — fall back to landing
  return { name: 'landing', params: {} };
}

/**
 * Initialises the router. Listens to hashchange and calls
 * renderCallback(route) on every navigation (including initial load).
 */
export function initRouter(renderCallback) {
  function onRouteChange() {
    const route = getCurrentRoute();
    renderCallback(route);
  }

  window.addEventListener('hashchange', onRouteChange);

  // Trigger initial render
  onRouteChange();
}
