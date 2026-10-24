'use client';

import React, { useState } from 'react';
import { Plus, Check, AlertCircle } from 'lucide-react';

interface DevAdminFormProps {
  onCreate: (data: { name: string; email: string; password: string }) => { success: boolean; message: string };
}

export default function DevAdminForm({ onCreate }: DevAdminFormProps) {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (adminPass.length < 4) {
      setErrorMsg('পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।');
      return;
    }

    const res = onCreate({ name: adminName, email: adminEmail, password: adminPass });
    if (res.success) {
      setSuccessMsg(res.message);
      setAdminName('');
      setAdminEmail('');
      setAdminPass('');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800 space-y-3">
      <span className="font-bold text-rose-400 flex items-center gap-1.5">
        <Plus className="w-4 h-4" />
        <span>নতুন শপ এডমিন একাউন্ট তৈরি করুন</span>
      </span>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            required
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            placeholder="মালিকের নাম / পদবি"
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
          />
          <input
            type="email"
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder="এডমিন ইমেইল (e.g. admin@...)"
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            required
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            placeholder="পাসওয়ার্ড (কমপক্ষে ৪ অক্ষর)"
            className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shrink-0 cursor-pointer"
          >
            + ক্রিয়েট এডমিন
          </button>
        </div>
      </form>

      {successMsg && (
        <p className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
          <Check className="w-3.5 h-3.5" />
          <span>{successMsg}</span>
        </p>
      )}
      {errorMsg && (
        <p className="text-rose-400 font-bold flex items-center gap-1 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{errorMsg}</span>
        </p>
      )}
    </div>
  );
}
