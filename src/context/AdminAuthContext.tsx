'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SystemUser, AuthContextType, UserRole, DEFAULT_USERS } from '@/types/auth';

export type { UserRole, SystemUser };

const AdminAuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<SystemUser | null>(null);
  const [users, setUsers] = useState<SystemUser[]>(DEFAULT_USERS);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('masakin_admin_user');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedUsers = localStorage.getItem('masakin_system_users');
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        localStorage.setItem('masakin_system_users', JSON.stringify(DEFAULT_USERS));
      }
    } catch {}
  }, []);

  const saveUsersToStorage = (updatedUsers: SystemUser[]) => {
    setUsers(updatedUsers);
    try {
      localStorage.setItem('masakin_system_users', JSON.stringify(updatedUsers));
    } catch {}
  };

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    const matched = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === cleanPass && u.status === 'active'
    );

    if (matched) {
      setUser(matched);
      try {
        localStorage.setItem('masakin_admin_user', JSON.stringify(matched));
      } catch {}
      return true;
    }
    return false;
  };

  const createShopAdmin = (data: { name: string; email: string; password: string }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'এই ইমেইল দিয়ে ইতোমধ্যে একটি একাউন্ট রয়েছে।' };
    }

    const newAdmin: SystemUser = {
      id: `admin-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      password: data.password.trim(),
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user?.email || 'super_admin'
    };

    const updated = [...users, newAdmin];
    saveUsersToStorage(updated);
    return { success: true, message: 'শপ এডমিন একাউন্ট সফলভাবে তৈরি হয়েছে!' };
  };

  const createStaffMember = (data: { name: string; email: string; password: string }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'এই ইমেইল দিয়ে ইতোমধ্যে একটি একাউন্ট রয়েছে।' };
    }

    const newStaff: SystemUser = {
      id: `staff-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      password: data.password.trim(),
      role: 'staff',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user?.email || 'admin@masakin.com'
    };

    const updated = [...users, newStaff];
    saveUsersToStorage(updated);
    return { success: true, message: 'স্টাফ একাউন্ট সফলভাবে তৈরি হয়েছে!' };
  };

  const deleteUser = (userId: string): boolean => {
    if (userId === 'usr-dev-01') return false;

    const updated = users.filter((u) => u.id !== userId);
    saveUsersToStorage(updated);

    if (user?.id === userId) {
      logout();
    }
    return true;
  };

  const updateUserPassword = (userId: string, newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) return false;

    const updated = users.map((u) => (u.id === userId ? { ...u, password: newPass.trim() } : u));
    saveUsersToStorage(updated);

    if (user?.id === userId) {
      const updatedCurrentUser = { ...user, password: newPass.trim() };
      setUser(updatedCurrentUser);
      try {
        localStorage.setItem('masakin_admin_user', JSON.stringify(updatedCurrentUser));
      } catch {}
    }
    return true;
  };

  const canAccess = (pathname: string): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin' || user.role === 'admin') return true;

    const adminOnlyRoutes = ['/admin/expenses', '/admin/ledger', '/admin/offers'];
    return !adminOnlyRoutes.some((route) => pathname.startsWith(route));
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('masakin_admin_user');
    } catch {}
    router.push('/sd');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        isAuthenticated: !!user,
        createShopAdmin,
        createStaffMember,
        deleteUser,
        updateUserPassword,
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
