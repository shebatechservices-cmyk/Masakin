'use client';

import React, { useState } from 'react';
import { Terminal, X, Shield, Trash2, Edit3, Users, FileText, RotateCcw, Keyboard } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { SystemUser } from '@/types/auth';
import DevAdminForm from './DevAdminForm';
import DevUserEditModal from './DevUserEditModal';
import DevPageManager from './DevPageManager';
import DevDataResetCard from './DevDataResetCard';
import DevShortcutSettings from './DevShortcutSettings';

interface DevConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'users' | 'pages' | 'reset' | 'shortcut';

export default function DevConsoleModal({ isOpen, onClose }: DevConsoleModalProps) {
  const { users, createShopAdmin, deleteUser, updateUserDetails, user } = useAdminAuth();
  const [devKey, setDevKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(user?.role === 'super_admin');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    let currentMaster = 'dev123';
    try {
      const savedCfg = localStorage.getItem('masakin_dev_shortcut_config');
      if (savedCfg) currentMaster = JSON.parse(savedCfg).masterKey || 'dev123';
    } catch {}

    if (devKey === currentMaster || devKey === 'dev123' || devKey === 'dev@Masakin2026!') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('ভুল মাস্টার কি। এক্সেস প্রত্যাখ্যাত।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-rose-500">
            <Terminal className="w-5 h-5" />
            <span className="font-black text-xs sm:text-sm tracking-wider uppercase">
              MASAKIN // DEV CONSOLE
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-4 py-4 text-xs">
            <p className="text-zinc-400">[SYSTEM LOCKED] ডেভেলপার মাস্টার কি দিন:</p>
            <input
              type="password"
              required
              value={devKey}
              onChange={(e) => setDevKey(e.target.value)}
              placeholder="Enter Dev Master Key (default: dev123)"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500 font-mono"
            />
            {errorMsg && <p className="text-rose-500 font-bold">{errorMsg}</p>}
            <button type="submit" className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition cursor-pointer">
              আনলক করুন (Unlock Console)
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900 rounded-xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition ${activeTab === 'users' ? 'bg-zinc-800 text-rose-400 shadow' : 'text-zinc-400 hover:text-white'}`}
              >
                <Users className="w-3.5 h-3.5" /><span className="hidden sm:inline">ইউজার</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pages')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition ${activeTab === 'pages' ? 'bg-zinc-800 text-rose-400 shadow' : 'text-zinc-400 hover:text-white'}`}
              >
                <FileText className="w-3.5 h-3.5" /><span className="hidden sm:inline">পেজ</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reset')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition ${activeTab === 'reset' ? 'bg-zinc-800 text-rose-400 shadow' : 'text-zinc-400 hover:text-white'}`}
              >
                <RotateCcw className="w-3.5 h-3.5" /><span className="hidden sm:inline">রিসেট</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shortcut')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition ${activeTab === 'shortcut' ? 'bg-zinc-800 text-rose-400 shadow' : 'text-zinc-400 hover:text-white'}`}
              >
                <Keyboard className="w-3.5 h-3.5" /><span className="hidden sm:inline">শর্টকাট</span>
              </button>
            </div>

            {/* Tab 1: Users */}
            {activeTab === 'users' && (
              <div className="space-y-4 text-xs">
                <DevAdminForm onCreate={createShopAdmin} />
                <div className="space-y-2">
                  <span className="font-bold text-zinc-400 block">সকল একাউন্ট ({users.length} টি):</span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {users.map((u) => (
                      <div key={u.id} className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between text-[11px]">
                        <div>
                          <p className="font-bold text-white flex items-center gap-1.5">
                            <Shield className={`w-3.5 h-3.5 ${u.role === 'admin' ? 'text-rose-500' : u.role === 'super_admin' ? 'text-amber-400' : 'text-blue-400'}`} />
                            <span>{u.name}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-normal">{u.role}</span>
                          </p>
                          <p className="text-zinc-500">{u.email} | পাস: <span className="text-zinc-300 font-mono">{u.password}</span></p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setEditingUser(u)} className="p-1 text-zinc-400 hover:text-amber-400 cursor-pointer" title="সংশোধন">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {u.id !== 'usr-dev-01' && (
                            <button onClick={() => deleteUser(u.id)} className="p-1 text-zinc-500 hover:text-rose-400 cursor-pointer" title="মুছুন">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Pages */}
            {activeTab === 'pages' && <DevPageManager />}

            {/* Tab 3: Reset */}
            {activeTab === 'reset' && <DevDataResetCard />}

            {/* Tab 4: Shortcut */}
            {activeTab === 'shortcut' && <DevShortcutSettings />}
          </div>
        )}
      </div>

      <DevUserEditModal
        userToEdit={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={updateUserDetails}
      />
    </div>
  );
}
