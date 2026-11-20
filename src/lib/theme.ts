/** Storage keys shared by the head script, the toggle and the preloader. */
export const THEME_KEY = 'clause:theme';
export const PRELOAD_KEY = 'clause:preloaded';

/**
 * Inline head script (Charter Appendix B3). Runs before first paint:
 * applies the stored theme and decides whether the preloader shows.
 */
export const headScript = `(function () {
  try {
    var d = document.documentElement;
    var s = localStorage.getItem('${THEME_KEY}');
    if (s === 'dark' || s === 'light') d.setAttribute('data-theme', s);
    var q = new URLSearchParams(location.search);
    var skip = navigator.webdriver || q.has('nopreload') ||
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      sessionStorage.getItem('${PRELOAD_KEY}');
    if (!skip) { d.setAttribute('data-preload', '1'); sessionStorage.setItem('${PRELOAD_KEY}', '1'); }
  } catch (e) {}
})();`;

export type Theme = 'light' | 'dark';

export function readTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(next: Theme) {
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* storage blocked: the choice simply does not persist */
  }
}
