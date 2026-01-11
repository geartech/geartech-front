'use client';
import { ReactNode, useEffect } from 'react';
import '../../core/i18n/i18n';

export function I18nProvider({ children }: { children: ReactNode }) {
  // Apenas garante que o i18n está inicializado
  useEffect(() => {}, []);
  return <>{children}</>;
}
