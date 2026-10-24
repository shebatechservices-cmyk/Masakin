'use client';

import React, { useState } from 'react';
import { KeyRound, Shield, Check, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function SecuritySettingsCard() {
  const { user, users, updateUserPassword } = useAdminAuth();
  const [selectedUserId, setSelectedUserId] = useState<string>(user?.id || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return null;
  }

  // Admin can change password for themselves and any staff
  const targetUsers = users.filter((u) =>
    user.role === 'super_admin' ? true : u.role !== 'super_admin'
  );

  const activeTargetId = selectedUserId || (targetUsers[0]?.id ?? '');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (newPassword.length < 4) {
      setStatusMsg({ text: 'পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।', isError: true });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMsg({ text: 'দুটো পাসওয়ার্ড মেলেনি। আবার টাইপ করুন।', isError: true });
      return;
    }

    const success = updateUserPassword(activeTargetId, newPassword);
    if (success) {
      const targetUser = users.find((u) => u.id === activeTargetId);
      setStatusMsg({
        text: `${targetUser?.name || 'ব্যবহারকারী'}-এর পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!`,
        isError: false
      });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setStatusMsg(null), 3500);
    } else {
      setStatusMsg({ text: 'পাসওয়ার্ড আপডেট ব্যর্থ হয়েছে।', isError: true });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-rose-400 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-zinc-900 leading-tight">
              লগইন সিকিউরিটি ও পাসওয়ার্ড
            </h2>
            <span className="text-[11px] text-zinc-400 font-medium">
              এডমিন ও স্টাফদের একাউন্টের পাসওয়ার্ড পরিবর্তন করুন
            </span>
          </div>
        </div>
        <Shield className="w-5 h-5 text-[#e11d48]" />
      </div>

      <form onSubmit={handleUpdate} className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-zinc-700 mb-1">
            একাউন্ট নির্বাচন করুন:
          </label>
          <select
            value={activeTargetId}
            onChange={(e) => {
              setSelectedUserId(e.target.value);
              setStatusMsg(null);
            }}
            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48] font-medium text-zinc-800"
          >
            {targetUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role === 'admin' ? 'এডমিন' : u.role === 'super_admin' ? 'সুপার এডমিন' : 'স্টাফ'}) - {u.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-zinc-700 mb-1">
            নতুন পাসওয়ার্ড:
          </label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড"
            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-700 mb-1">
            পাসওয়ার্ড নিশ্চিত করুন:
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="পুনরায় পাসওয়ার্ড লিখুন"
            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
          />
        </div>

        {statusMsg && (
          <div
            className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              statusMsg.isError
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {statusMsg.isError ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <Check className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-black rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>পাসওয়ার্ড আপডেট করুন</span>
        </button>
      </form>
    </div>
  );
}
