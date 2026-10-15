'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      router.push('/admin');
    } else {
      setError('ভুল ইমেইল বা পাসওয়ার্ড। অনুগ্রহ করে সঠিক তথ্য দিন।');
    }
  };

  const handleFillDemo = (role: 'admin' | 'staff') => {
    if (role === 'admin') {
      setEmail('admin@masakin.com');
      setPassword('admin123');
    } else {
      setEmail('staff@masakin.com');
      setPassword('staff123');
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-tr from-[#09090b] to-[#e11d48] rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
          <ShieldCheck className="w-6 h-6 text-rose-300" />
        </div>
        <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
          মাসাকিন এডমিন ও স্টাফ লগইন
        </h1>
        <p className="text-xs text-zinc-500">
          অর্ডার প্রসেসিং, প্রোডাক্ট আপডেট ও অফার ম্যানেজমেন্ট পোর্টাল
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">ইমেইল ঠিকানা</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@masakin.com"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">পাসওয়ার্ড</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>
        </div>

        {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-[#e11d48] hover:bg-[#be123c] text-white font-black text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>লগইন করুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* 1-Click Demo Buttons */}
      <div className="pt-3 border-t border-zinc-100 space-y-2">
        <span className="text-[11px] font-bold text-zinc-500 block text-center">
          দ্রুত ডেমো লগইনের জন্য ক্লিক করুন:
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleFillDemo('admin')}
            className="p-2 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-left transition cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#e11d48]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>এডমিন (মালিক)</span>
            </div>
            <span className="text-[9px] text-zinc-500 block font-mono">admin@masakin.com</span>
          </button>

          <button
            type="button"
            onClick={() => handleFillDemo('staff')}
            className="p-2 rounded-xl border border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-left transition cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-900">
              <UserCheck className="w-3.5 h-3.5" />
              <span>স্টাফ (অর্ডার টিম)</span>
            </div>
            <span className="text-[9px] text-zinc-500 block font-mono">staff@masakin.com</span>
          </button>
        </div>
      </div>
    </div>
  );
}
