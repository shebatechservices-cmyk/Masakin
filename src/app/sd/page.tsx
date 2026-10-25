'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ShieldCheck, ArrowRight, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function SecretLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAdminAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reason') === 'inactivity') {
        setError('৫ মিনিট কোনো কার্যক্রম না থাকায় নিরাপত্তার স্বার্থে আপনাকে স্বয়ংক্রিয়ভাবে লগআউট করা হয়েছে।');
      }
    }
  }, []);

  useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTimer]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setError('');
    const success = login(identifier, password);
    if (success) {
      setFailedAttempts(0);
      router.push('/admin');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLockoutTimer(30);
        setError('পরপর ৫ বার ভুল তথ্য দেওয়ায় লগইন ৩০ সেকেন্ডের জন্য লক করা হয়েছে।');
      } else {
        setError(`ভুল ইউজার আইডি বা পাসওয়ার্ড। আর ${5 - newAttempts} বার চেষ্টা করা যাবে।`);
      }
    }
  };

  return (
    <div className="min-h-[85vh] bg-stone-100/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#09090b] to-[#e11d48] rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6 text-rose-300" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
            মাসাকিন সিকিউর পোর্টাল
          </h1>
          <p className="text-xs text-zinc-500">
            অনুমোদিত কর্মীদের অভ্যন্তরীণ প্রবেশদ্বার
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">
              ইউজার আইডি (ইমেইল অথবা মোবাইল নম্বর)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                disabled={lockoutTimer > 0}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. admin@masakin.com অথবা 01782282282"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48] disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={lockoutTimer > 0}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48] disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={lockoutTimer > 0}
            className="w-full py-3 bg-[#e11d48] hover:bg-[#be123c] disabled:bg-zinc-400 text-white font-black text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {lockoutTimer > 0 ? (
              <span>লক করা আছে ({lockoutTimer} সেকেন্ড)</span>
            ) : (
              <>
                <span>নিরাপদ লগইন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <p className="text-[11px] text-zinc-400">
            এই পোর্টালটি শুধুমাত্র মাসাকিন বস্ত্র বিতানের অনুমোদিত কর্মীদের জন্য সংরক্ষিত।
          </p>
        </div>
      </div>
    </div>
  );
}
