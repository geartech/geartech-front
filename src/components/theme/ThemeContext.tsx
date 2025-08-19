'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode deve ser usado dentro do ThemeProvider');
  return ctx;
}

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  // Carregar modo salvo
  useEffect(() => {
    const savedMode = localStorage.getItem('gt-theme-mode') as ThemeMode | null;
    if (savedMode) setMode(savedMode);
  }, []);

  // Alternar e salvar
  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('gt-theme-mode', newMode);
      return newMode;
    });
  };

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
