export type UserRole = 'super_admin' | 'admin' | 'staff';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
  createdBy?: string;
}

export const DEFAULT_USERS: SystemUser[] = [
  {
    id: 'usr-dev-01',
    name: 'সুপার এডমিন / ডেভেলপার',
    email: 'dev@masakin.com',
    password: 'dev123',
    role: 'super_admin',
    status: 'active',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-admin-01',
    name: 'প্রধান পরিচালক / শপ এডমিন',
    email: 'admin@masakin.com',
    password: 'admin123',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-staff-01',
    name: 'অর্ডার ও বিক্রয় কর্মী',
    email: 'staff@masakin.com',
    password: 'staff123',
    role: 'staff',
    status: 'active',
    createdAt: '2026-01-01',
    createdBy: 'admin@masakin.com'
  }
];

export interface AuthContextType {
  user: SystemUser | null;
  users: SystemUser[];
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  createShopAdmin: (data: { name: string; email: string; password: string }) => { success: boolean; message: string };
  createStaffMember: (data: { name: string; email: string; password: string }) => { success: boolean; message: string };
  deleteUser: (userId: string) => boolean;
  updateUserPassword: (userId: string, newPass: string) => boolean;
  updateUserDetails: (userId: string, data: { name?: string; email?: string; password?: string; role?: UserRole }) => boolean;
  resetUsersToDefault: () => void;
  resetAllStoreData: () => void;
  canAccess: (pathname: string) => boolean;
}

