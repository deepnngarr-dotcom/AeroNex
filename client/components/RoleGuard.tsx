// client/components/RoleGuard.tsx
"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RoleGuard({ 
  children, 
  allowedRole 
}: { 
  children: React.ReactNode, 
  allowedRole: 'pilot' | 'farmer' 
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // 1. If not logged in, go to Login
      if (!user) {
        router.push('/login');
        return;
      }

      // 2. If logged in but wrong role, redirect to their dashboard
      if (user.role !== allowedRole) {
        if (user.role === 'pilot') router.push('/pilot/dashboard');
        else router.push('/farmer/dashboard');
      }
    }
  }, [user, loading, router, allowedRole]);

  if (loading || !user || user.role !== allowedRole) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Verifying Clearance...</div>;
  }

  return <>{children}</>;
}