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
    try { localStorage.setItem('masakin_system_users', JSON.stringify(updatedUsers)); } catch {}
  };

  const login = (identifier: string, pass: string): boolean => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    const matched = users.find((u) => {
      const emailMatch = u.email.toLowerCase() === cleanId;
      const cleanDigits = cleanId.replace(/[^0-9]/g, '');
      const phoneMatch = !!(u.phone && cleanDigits && u.phone.replace(/[^0-9]/g, '') === cleanDigits);
      return (emailMatch || phoneMatch) && u.password === cleanPass && u.status === 'active';
    });

    if (matched) {
      setUser(matched);
      try {
        localStorage.setItem('masakin_admin_user', JSON.stringify(matched));
      } catch {}
      return true;
    }
    return false;
  };

  const createUser = (
    data: { name: string; email: string; phone?: string; password: string },
    role: 'admin' | 'staff'
  ) => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhone = data.phone?.trim() || '';

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'এই ইমেইল দিয়ে ইতোমধ্যে একটি একাউন্ট রয়েছে।' };
    }
    if (cleanPhone && users.some((u) => u.phone && u.phone.trim() === cleanPhone)) {
      return { success: false, message: 'এই ফোন নম্বর দিয়ে ইতোমধ্যে একটি একাউন্ট রয়েছে।' };
    }

    const newUser: SystemUser = {
      id: `${role}-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password: data.password.trim(),
      role,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user?.email || (role === 'admin' ? 'super_admin' : 'admin@masakin.com')
    };
    saveUsersToStorage([...users, newUser]);
    return {
      success: true,
      message: `${role === 'admin' ? 'শপ এডমিন' : 'স্টাফ'} একাউন্ট সফলভাবে তৈরি হয়েছে!`
    };
  };

  const createShopAdmin = (data: { name: string; email: string; phone?: string; password: string }) =>
    createUser(data, 'admin');

  const createStaffMember = (data: { name: string; email: string; phone?: string; password: string }) =>
    createUser(data, 'staff');

  const deleteUser = (userId: string): boolean => {
    if (userId === 'usr-dev-01') return false;

    const updated = users.filter((u) => u.id !== userId);
    saveUsersToStorage(updated);

    if (user?.id === userId) {
      logout();
    }
    return true;
  };

  const updateUserDetails = (
    userId: string,
    data: { name?: string; email?: string; phone?: string; password?: string; role?: UserRole }
  ): boolean => {
    const updated = users.map((u) => {
      if (u.id !== userId) return u;
      return {
        ...u,
        ...(data.name?.trim() ? { name: data.name.trim() } : {}),
        ...(data.email?.trim() ? { email: data.email.trim().toLowerCase() } : {}),
        ...(data.phone !== undefined ? { phone: data.phone.trim() } : {}),
        ...(data.password?.trim() ? { password: data.password.trim() } : {}),
        ...(data.role ? { role: data.role } : {})
      };
    });
    saveUsersToStorage(updated);
    if (user?.id === userId) {
      const activeUpdated = updated.find((u) => u.id === userId) || null;
      setUser(activeUpdated);
      try { localStorage.setItem('masakin_admin_user', JSON.stringify(activeUpdated)); } catch {}
    }
    return true;
  };

  const updateUserPassword = (userId: string, newPass: string): boolean => {
    if (!newPass || newPass.trim().length < 4) return false;
    return updateUserDetails(userId, { password: newPass });
  };

  const resetUsersToDefault = () => {
    saveUsersToStorage(DEFAULT_USERS);
    setUser(DEFAULT_USERS[0]);
    try { localStorage.setItem('masakin_admin_user', JSON.stringify(DEFAULT_USERS[0])); } catch {}
  };

  const resetAllStoreData = () => {
    ['msk_orders', 'msk_expenses', 'msk_ledger', 'msk_products', 'msk_settings', 'msk_coupons'].forEach((k) => {
      try { localStorage.removeItem(k); } catch {}
    });
    resetUsersToDefault();
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
        updateUserDetails,
        resetUsersToDefault,
        resetAllStoreData,
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
