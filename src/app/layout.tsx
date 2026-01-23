'use client';

import '@/app/styles/globals.css';

import ThemeRegistry from '@/components/theme/ThemeRegistry';
import { ThemeModeProvider } from '@/components/theme/ThemeContext';
import { AuthProvider } from '@/core/context/AuthProvider';
import { I18nProvider } from '@/core/i18n/I18nProvider';
import { SnackbarProvider } from './utils/hooks/useMessage';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <I18nProvider>
          <AuthProvider>
            <ThemeModeProvider>
              <ThemeRegistry>
                <SnackbarProvider>{children}</SnackbarProvider>
              </ThemeRegistry>
            </ThemeModeProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
