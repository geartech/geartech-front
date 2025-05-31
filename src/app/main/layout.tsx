'use client';

import '@/app/styles/globals.css';
import MasterLayout from '@/components/layout/MasterLayout';
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import { ThemeModeProvider } from '@/components/theme/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeModeProvider>
          <ThemeRegistry>
            <MasterLayout>{children}</MasterLayout>
          </ThemeRegistry>
        </ThemeModeProvider>
      </body>
    </html>
  );
}
