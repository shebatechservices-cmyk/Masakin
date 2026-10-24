'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, ArrowLeft, Home } from 'lucide-react';

interface MaintenanceNoticeProps {
  pageTitle?: string;
  customMessage?: string;
}

export default function MaintenanceNotice({
  pageTitle = 'এই পেজটি',
  customMessage
}: MaintenanceNoticeProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-zinc-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-100 text-[#e11d48] flex items-center justify-center mx-auto">
          <Wrench className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            সাময়িক রক্ষণাবেক্ষণ (Under Maintenance)
          </span>
          <h1 className="text-xl font-black text-zinc-900 tracking-tight">
            {pageTitle} বর্তমানে বন্ধ আছে
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {customMessage ||
              'সিস্টেম ডেভেলপার কর্তৃক পেজটি সাময়িকভাবে বন্ধ রাখা হয়েছে। শীঘ্রই আবার সক্রিয় করা হবে। যেকোনো প্রয়োজনে আমাদের হটলাইনে যোগাযোগ করতে পারেন।'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#09090b] hover:bg-[#e11d48] text-white text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>আগের পেজে যান</span>
          </button>
        </div>
      </div>
    </div>
  );
}
