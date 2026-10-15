'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'staff' | null;

interface AdminUser {
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('masakin_admin_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Admin login
    if (cleanEmail === 'admin@masakin.com' && pass === 'admin123') {
      const u: AdminUser = { email: cleanEmail, name: 'ম্যানেজার / এডমিন', role: 'admin' };
      setUser(u);
      try { localStorage.setItem('masakin_admin_user', JSON.stringify(u)); } catch {}
      return true;
    }

    // Staff login
    if (cleanEmail === 'staff@masakin.com' && pass === 'staff123') {
      const u: AdminUser = { email: cleanEmail, name: 'অর্ডার স্টাফ', role: 'staff' };
      setUser(u);
      try { localStorage.setItem('masakin_admin_user', JSON.stringify(u)); } catch {}
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('masakin_admin_user'); } catch {}
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
