'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'staff' | null;

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

interface StoredCredentials {
  adminEmail: string;
  adminPass: string;
  staffEmail: string;
  staffPass: string;
}

const DEFAULT_CREDENTIALS: StoredCredentials = {
  adminEmail: 'admin@masakin.com',
  adminPass: 'admin123',
  staffEmail: 'staff@masakin.com',
  staffPass: 'staff123'
};

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updatePassword: (role: 'admin' | 'staff', newPass: string) => boolean;
  canAccess: (pathname: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [creds, setCreds] = useState<StoredCredentials>(DEFAULT_CREDENTIALS);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('masakin_admin_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedCreds = localStorage.getItem('masakin_auth_credentials');
      if (savedCreds) {
        setCreds({ ...DEFAULT_CREDENTIALS, ...JSON.parse(savedCreds) });
      } else {
        localStorage.setItem('masakin_auth_credentials', JSON.stringify(DEFAULT_CREDENTIALS));
      }
    } catch {}
  }, []);

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === creds.adminEmail.toLowerCase() && cleanPass === creds.adminPass) {
      const u: AdminUser = { email: cleanEmail, name: 'ম্যানেজার / এডমিন', role: 'admin' };
      setUser(u);
      try { localStorage.setItem('masakin_admin_user', JSON.stringify(u)); } catch {}
      return true;
    }

    if (cleanEmail === creds.staffEmail.toLowerCase() && cleanPass === creds.staffPass) {
      const u: AdminUser = { email: cleanEmail, name: 'অর্ডার স্টাফ', role: 'staff' };
      setUser(u);
      try { localStorage.setItem('masakin_admin_user', JSON.stringify(u)); } catch {}
      return true;
    }

    return false;
  };

  const updatePassword = (role: 'admin' | 'staff', newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) return false;

    const updated = {
      ...creds,
      [role === 'admin' ? 'adminPass' : 'staffPass']: newPass.trim()
    };
    setCreds(updated);
    try {
      localStorage.setItem('masakin_auth_credentials', JSON.stringify(updated));
    } catch {}
    return true;
  };

  const canAccess = (pathname: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;

    // Staff restricted paths
    const adminOnlyRoutes = ['/admin/expenses', '/admin/ledger', '/admin/offers'];
    return !adminOnlyRoutes.some((route) => pathname.startsWith(route));
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
        isAuthenticated: !!user,
        updatePassword,
        canAccess
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
