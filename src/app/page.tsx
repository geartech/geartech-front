'use client';

import { useAuth } from '@/core/context/AuthProvider';
import { redirect } from 'next/navigation';

export default function Home() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Ou skeleton, ou splash
  }

  if (!authenticated) {
    redirect('/pages/public/login');
  } else {
    redirect('/pages/auth/home');
  }
}
