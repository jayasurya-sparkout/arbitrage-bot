'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Theme = 'light' | 'arbitrage' | 'light-purple' | 'dark-purple' | 'purple-base' | 'aegis' | 'vulcan' | 'ashen' | 'nova' | 'tropika' | 'arbitrageNew' | 'mirage' | 'verdantTide';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('tropika');
  const [mounted, setMounted] = useState(false);

  const skipPath = ["/login"];

  useEffect(() => {
    const handleStorageChange = (event: { type: string }) => {
      if (event.type === "storage" || event.type === "localStorageChanged") {
        if (skipPath.includes(window.location.pathname)) {
          return;
        }
        const token = localStorage.getItem("accessToken");

        if (!token) {
          dispatch({ type: "LOGOUT" });
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChanged", handleStorageChange);
    };
  }, []);

  const  dispatch = (action: { type: string })  => {
    if (action.type === "LOGOUT") {
      window.location.reload();
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme;
      if (storedTheme) {
        setThemeState(storedTheme);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const allThemes: Theme[] = ['light', 'arbitrage', 'light-purple', 'dark-purple', 'purple-base', 'aegis', 'vulcan', 'ashen', 'nova', 'tropika', 'arbitrageNew', 'mirage', 'verdantTide'];

    // Remove all theme classes first
    allThemes.forEach((t) => root.classList.remove(t));

    // Add current theme class
    root.classList.add(theme);

    // Persist to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {mounted && children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
