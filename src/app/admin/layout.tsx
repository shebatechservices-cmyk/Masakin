'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, canAccess } = useAdminAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sd');
      return;
    }

    if (isAuthenticated && !canAccess(pathname)) {
      router.push('/admin');
    }
  }, [isAuthenticated, pathname, canAccess, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-sm font-bold text-zinc-500 animate-pulse">লগইন যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-['Hind_Siliguri',sans-serif]">
      <AdminHeader />
      <div className="flex-1 flex flex-col md:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
