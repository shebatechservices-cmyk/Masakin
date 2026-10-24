'use client';

import React, { useState } from 'react';
import { Terminal, X, Shield, Trash2 } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import DevAdminForm from './DevAdminForm';

interface DevConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DevConsoleModal({ isOpen, onClose }: DevConsoleModalProps) {
  const { users, createShopAdmin, deleteUser, user } = useAdminAuth();
  const [devKey, setDevKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(user?.role === 'super_admin');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (devKey === 'dev123' || devKey === 'dev@Masakin2026!') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('ভুল মাস্টার কি। এক্সেস প্রত্যাখ্যাত।');
    }
  };

  const shopAdmins = users.filter((u) => u.role === 'admin');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-rose-500">
            <Terminal className="w-5 h-5" />
            <span className="font-black text-xs sm:text-sm tracking-wider uppercase">
              MASAKIN // DEV & SUPER ADMIN
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-4 py-4 text-xs">
            <p className="text-zinc-400">
              [SYSTEM LOCKED] সুপার এডমিন / ডেভেলপার মাস্টার পাসওয়ার্ড দিন:
            </p>
            <input
              type="password"
              required
              value={devKey}
              onChange={(e) => setDevKey(e.target.value)}
              placeholder="Enter Dev Master Key (default: dev123)"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500 font-mono"
            />
            {errorMsg && <p className="text-rose-500 font-bold">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition cursor-pointer"
            >
              আনলক করুন (Unlock Console)
            </button>
          </form>
        ) : (
          <div className="space-y-5 text-xs">
            <DevAdminForm onCreate={createShopAdmin} />

            {/* List of Shop Admins */}
            <div className="space-y-2">
              <span className="font-bold text-zinc-400 block">
                বিদ্যমান শপ এডমিন তালিকা ({shopAdmins.length} জন):
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {shopAdmins.map((adm) => (
                  <div
                    key={adm.id}
                    className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between text-[11px]"
                  >
                    <div>
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-rose-500" />
                        <span>{adm.name}</span>
                      </p>
                      <p className="text-zinc-500">{adm.email} | পাস: <span className="text-zinc-300 font-mono">{adm.password}</span></p>
                    </div>
                    {adm.id !== 'usr-admin-01' && (
                      <button
                        onClick={() => deleteUser(adm.id)}
                        className="p-1 text-zinc-500 hover:text-rose-400 cursor-pointer"
                        title="মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-zinc-600 text-center">
              লুকানো শর্টকাট: <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">Ctrl + Shift + D</kbd>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
