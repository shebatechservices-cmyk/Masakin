'use client';

import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

interface OrderSummaryBoxProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  isSubmitting: boolean;
}

export default function OrderSummaryBox({
  subtotal,
  deliveryFee,
  total,
  isSubmitting
}: OrderSummaryBoxProps) {
  return (
    <div className="space-y-4">
      {/* Price breakdown */}
      <div className="pt-2 border-t border-zinc-100 space-y-1 text-xs">
        <div className="flex justify-between text-zinc-600">
          <span>পোশাকের মূল্য:</span>
          <span className="font-bold text-zinc-900">৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>ডেলিভারি চার্জ:</span>
          <span className="font-bold text-zinc-900">
            {deliveryFee === 0 ? <strong className="text-[#e11d48]">ফ্রি</strong> : `৳${deliveryFee}`}
          </span>
        </div>
        <div className="pt-2 border-t border-zinc-200 flex justify-between items-baseline">
          <span className="font-black text-sm sm:text-base text-zinc-950">মোট প্রদেয়:</span>
          <span className="font-black text-xl sm:text-2xl text-[#e11d48]">৳{total}</span>
        </div>
      </div>

      {/* Primary Order Submission Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-2xl font-black text-base text-white shadow-xl transition flex items-center justify-center gap-2 cursor-pointer ${
          isSubmitting
            ? 'bg-zinc-400 cursor-wait'
            : 'bg-[#e11d48] hover:bg-[#be123c] shadow-rose-600/30 active:scale-95'
        }`}
      >
        {isSubmitting ? (
          <span>অর্ডার সম্পন্ন হচ্ছে...</span>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>অর্ডার কনফার্ম করুন (৳{total})</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
        <ShieldCheck className="w-3.5 h-3.5 text-[#e11d48]" />
        <span>১০০% নিরাপদ কেনাকাটা ও ক্যাশ অন ডেলিভারি</span>
      </div>
    </div>
  );
}
