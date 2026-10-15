'use client';

import React from 'react';
import Link from 'next/link';
import { LogOut, ExternalLink, ShieldCheck, UserCheck } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminHeader() {
  const { user, logout } = useAdminAuth();

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden border border-rose-200 shadow-xs flex items-center justify-center shrink-0">
            <img src="/images/logo.png" alt="Masakin" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-extrabold text-sm text-zinc-950 leading-tight">
              মাসাকিন বস্ত্র বিতান
            </span>
            <span className="text-[9px] font-bold text-zinc-400">
              কন্ট্রোল প্যানেল
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Badge */}
        {user && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#e11d48] border border-rose-200 text-xs font-bold">
            {user.role === 'admin' ? (
              <ShieldCheck className="w-3.5 h-3.5 text-[#e11d48]" />
            ) : (
              <UserCheck className="w-3.5 h-3.5 text-zinc-900" />
            )}
            <span>{user.name}</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-white border border-rose-300">
              {user.role}
            </span>
          </div>
        )}

        {/* View Store */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1 text-xs font-bold text-zinc-700 hover:text-[#e11d48] px-3 py-1.5 rounded-lg border border-zinc-200 transition"
        >
          <span>স্টোর দেখুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-1.5 text-stone-500 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition"
          title="লগআউট"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
