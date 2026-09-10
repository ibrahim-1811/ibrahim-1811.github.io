export const THEME_STORAGE_KEY = 'portfolio-theme';
export const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';
export const isTheme = (value) => value === 'light' || value === 'dark';

export function readStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

export function setDocumentTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
