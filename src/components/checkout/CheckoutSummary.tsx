'use client';

import React from 'react';
import Image from 'next/image';
import { Lock, ShieldCheck } from 'lucide-react';
import { CartItem } from '@/types';

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  isSubmitting: boolean;
}

export default function CheckoutSummary({
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
  isSubmitting
}: CheckoutSummaryProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 sticky top-24">
      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 pb-3 border-b border-slate-100">
        অর্ডার ওভারভিউ ({items.length} টি পণ্য)
      </h3>

      {/* Items list */}
      <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-xs">
            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 truncate">{item.product.name}</h4>
              <p className="text-[11px] text-slate-500">
                সাইজ: {item.selectedSize} | পরিমাণ: {item.quantity}
              </p>
            </div>
            <span className="font-bold text-slate-800">
              ৳{item.product.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Calculations */}
      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between text-slate-600">
          <span>সাবটোটাল:</span>
          <span className="font-bold text-slate-800">৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>ডেলিভারি চার্জ:</span>
          <span className="font-bold text-slate-800">
            {deliveryFee === 0 ? <strong className="text-rose-600">ফ্রি</strong> : `৳${deliveryFee}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-rose-600 font-semibold">
            <span>ডিসকাউন্ট:</span>
            <span>-৳{discount}</span>
          </div>
        )}
        <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
          <span className="font-black text-base text-slate-900">সর্বমোট প্রদেয়:</span>
          <span className="font-black text-2xl text-rose-950">৳{total}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-2xl font-black text-base text-white shadow-xl transition flex items-center justify-center gap-2 ${
          isSubmitting
            ? 'bg-rose-600 opacity-80 cursor-wait'
            : 'bg-[#09090b] hover:bg-zinc-900 shadow-rose-950/20 active:scale-95'
        }`}
      >
        {isSubmitting ? (
          <span>অর্ডার প্রসেস হচ্ছে...</span>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>অর্ডার কনফার্ম করুন (৳{total})</span>
          </>
        )}
      </button>

      <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500">
        <ShieldCheck className="w-4 h-4 text-rose-600" />
        <span>১০০% নিরাপদ ও সুরক্ষিত চেকআউট</span>
      </div>
    </div>
  );
}
