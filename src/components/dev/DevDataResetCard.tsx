'use client';

import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function DevDataResetCard() {
  const { resetUsersToDefault, resetAllStoreData } = useAdminAuth();
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleResetUsers = () => {
    if (window.confirm('সতর্কতা: সকল অতিরিক্ত শপ এডমিন ও স্টাফ একাউন্ট মুছে ডিফল্ট একাউন্টে ফিরে যাবে। আপনি কি নিশ্চিত?')) {
      resetUsersToDefault();
      setStatusMsg('সকল ইউজার ফ্যাক্টরি ডিফল্টে সফলভাবে রিসেট হয়েছে!');
      setTimeout(() => setStatusMsg(null), 3500);
    }
  };

  const handleResetAllData = () => {
    if (window.confirm('চূড়ান্ত সতর্কতা: স্টোরের সকল ডেমো অর্ডার, খরচ, লেজার ও ব্যবহারকারী ডাটা সম্পূর্ণ মুছে যাবে। আপনি কি নিশ্চিত?')) {
      resetAllStoreData();
      setStatusMsg('সম্পূর্ণ স্টোর ডাটা সফলভাবে রিসেট ও ফ্রেশ করা হয়েছে!');
      setTimeout(() => {
        setStatusMsg(null);
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="p-3.5 bg-rose-950/30 border border-rose-900/60 rounded-2xl flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-rose-300 leading-relaxed">
          এখানে যেকোনো ডাটা রিসেট সতর্কতার সাথে করুন। একবার রিসেট করলে তা ব্রাউজারের লোকাল স্টোরেজ থেকে মুছে যাবে।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Reset Users */}
        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>ইউজার একাউন্ট রিসেট</span>
            </h4>
            <p className="text-[10px] text-zinc-400 leading-normal">
              তৈরি করা সকল শপ এডমিন ও স্টাফ মুছে ৩টি ডিফল্ট একাউন্টে ফিরিয়ে নেবে।
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetUsers}
            className="w-full py-2 bg-zinc-800 hover:bg-amber-600/80 text-white font-bold rounded-xl transition cursor-pointer text-[11px]"
          >
            ইউজার রিসেট করুন
          </button>
        </div>

        {/* Reset Store Data */}
        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
              <RefreshCw className="w-3.5 h-3.5 text-rose-500" />
              <span>সম্পূর্ণ ডাটা ফ্যাক্টরি রিসেট</span>
            </h4>
            <p className="text-[10px] text-zinc-400 leading-normal">
              অর্ডার, খরচ, লেজার হিসাব ও ব্যবহারকারী ডাটা সম্পূর্ণ ফ্রেশ করে নেবে।
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetAllData}
            className="w-full py-2 bg-rose-600/80 hover:bg-rose-700 text-white font-bold rounded-xl transition cursor-pointer text-[11px]"
          >
            ফ্যাক্টরি রিসেট (All Data)
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}
    </div>
  );
}
