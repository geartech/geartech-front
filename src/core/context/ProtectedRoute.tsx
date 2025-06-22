'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginRoute = pathname === '/public/login';

  useEffect(() => {
    if (loading) return; // Não faz nada enquanto carrega

    if (!authenticated && !isLoginRoute) {
      router.replace('/public/login');
    }
  }, [authenticated, isLoginRoute, router, loading]);

  // Só renderiza:
  // 1. Se for login
  // 2. Ou está autenticado
  if (loading) return null; // Ou um spinner, skeleton, etc.

  if (!authenticated && !isLoginRoute) return null;

  return <>{children}</>;
}
