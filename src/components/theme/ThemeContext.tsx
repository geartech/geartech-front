'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

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

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
