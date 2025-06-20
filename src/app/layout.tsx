'use client';

import '@/app/styles/globals.css';

import ThemeRegistry from '@/components/theme/ThemeRegistry';
import { ThemeModeProvider } from '@/components/theme/ThemeContext';
import { AuthProvider } from '@/core/context/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <ThemeModeProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </ThemeModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
