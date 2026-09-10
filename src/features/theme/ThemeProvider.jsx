import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  isTheme,
  readStoredTheme,
  setDocumentTheme,
  SYSTEM_THEME_QUERY,
  THEME_STORAGE_KEY,
} from './theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(readStoredTheme);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia?.(SYSTEM_THEME_QUERY).matches ?? false,
  );
  const theme = preference ?? (systemDark ? 'dark' : 'light');

  useLayoutEffect(() => setDocumentTheme(theme), [theme]);
  useEffect(() => {
    const media = window.matchMedia?.(SYSTEM_THEME_QUERY);
    const updateSystem = () => setSystemDark(media?.matches ?? false);
    const syncStorage = (event) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) {
        setPreference(isTheme(event.newValue) ? event.newValue : null);
      }
    };
    updateSystem();
    media?.addEventListener('change', updateSystem);
    window.addEventListener('storage', syncStorage);
    return () => {
      media?.removeEventListener('change', updateSystem);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setPreference(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Keep an in-memory preference when storage is unavailable. */
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme requires ThemeProvider');
  return context;
}
