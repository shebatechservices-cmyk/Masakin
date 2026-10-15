'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
          {children}
        </div>
      ) : (
        <div className="min-h-screen bg-stone-50 flex flex-col font-['Hind_Siliguri',sans-serif]">
          <AdminHeader />
          <div className="flex-1 flex flex-col md:flex-row">
            <AdminSidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      )}
    </AdminAuthProvider>
  );
}
