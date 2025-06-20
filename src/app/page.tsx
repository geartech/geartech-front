'use client';

import { useAuth } from '@/core/context/AuthProvider';
import { redirect } from 'next/navigation';

export default function Home() {
  const { authenticated } = useAuth();
  if (!authenticated) {
    redirect('/public/login');
  }

  return <div>HOME</div>;
}
