'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, UserCheck, Shield, KeyRound, Mail, User } from 'lucide-react';
import { SystemUser, UserRole } from '@/types/auth';

interface DevUserEditModalProps {
  userToEdit: SystemUser | null;
  onClose: () => void;
  onSave: (userId: string, data: { name: string; email: string; password: string; role: UserRole }) => boolean;
}

export default function DevUserEditModal({ userToEdit, onClose, onSave }: DevUserEditModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPassword(userToEdit.password);
      setRole(userToEdit.role);
      setStatusMsg(null);
    }
  }, [userToEdit]);

  if (!userToEdit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || password.length < 4) {
      setStatusMsg({ text: 'সঠিক তথ্য দিন (পাসওয়ার্ড কমপক্ষে ৪ অক্ষর)।', isError: true });
      return;
    }

    const success = onSave(userToEdit.id, { name, email, password, role });
    if (success) {
      setStatusMsg({ text: 'ইউজার তথ্য সফলভাবে আপডেট হয়েছে!', isError: false });
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setStatusMsg({ text: 'আপডেট ব্যর্থ হয়েছে।', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
      <div className="relative bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-rose-400">
            <UserCheck className="w-5 h-5" />
            <span className="font-bold text-xs uppercase tracking-wider">
              ইউজার তথ্য সংশোধন (Edit User)
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-zinc-400 font-bold mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-500" />
              <span>নাম (Full Name):</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-bold mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              <span>ইমেইল (Email):</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-bold mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-rose-500" />
              <span>পাসওয়ার্ড (Password):</span>
            </label>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-bold mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-rose-500" />
              <span>রোল / পদবী (Role):</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              disabled={userToEdit.id === 'usr-dev-01'}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500"
            >
              {userToEdit.id === 'usr-dev-01' ? (
                <option value="super_admin">সুপার এডমিন (Super Admin)</option>
              ) : (
                <>
                  <option value="admin">শপ এডমিন (Shop Admin / Owner)</option>
                  <option value="staff">স্টাফ (Counter & Order Staff)</option>
                </>
              )}
            </select>
          </div>

          {statusMsg && (
            <div
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                statusMsg.isError ? 'bg-rose-950/60 text-rose-300 border border-rose-800' : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
              }`}
            >
              <Check className="w-4 h-4 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}

          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition cursor-pointer"
            >
              সংরক্ষণ করুন (Save Changes)
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-xl transition cursor-pointer"
            >
              বাতিল
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
