'use client';

import '@/app/styles/globals.css';
import MasterLayout from '@/components/layout/MasterLayout';
import ProtectedRoute from '@/core/context/ProtectedRoute';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <MasterLayout>{children}</MasterLayout>
    </ProtectedRoute>
  );
}
