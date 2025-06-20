'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginRoute = pathname === '/login';

  useEffect(() => {
    if (!user && !isLoginRoute) {
      router.replace('/login');
    }
  }, [user, isLoginRoute, router]);

  // Só renderiza:
  // 1. Se for login
  // 2. Ou está autenticado
  if (!user && !isLoginRoute) return null;

  return <>{children}</>;
}
