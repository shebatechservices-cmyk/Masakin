'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, ArrowRight } from 'lucide-react';

interface CartSummaryCardProps {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode: string;
  deliveryArea: 'inside' | 'outside';
  setDeliveryArea: (area: 'inside' | 'outside') => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

export default function CartSummaryCard({
  subtotal,
  deliveryFee,
  discount,
  total,
  couponCode,
  deliveryArea,
  setDeliveryArea,
  applyCoupon,
  removeCoupon
}: CartSummaryCardProps) {
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setInputCoupon('');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
      <h3 className="font-extrabold text-lg text-slate-900 pb-3 border-b border-slate-100">
        অর্ডার সামারি
      </h3>

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>পণ্যের মূল্য (Subtotal):</span>
          <span className="font-bold text-slate-800">৳{subtotal}</span>
        </div>

        {/* Delivery area radio */}
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-700 block mb-1.5">
            ডেলিভারি এরিয়া নির্ধারণ করুন:
          </span>
          <div className="space-y-1.5 text-xs">
            <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="deliveryArea"
                checked={deliveryArea === 'inside'}
                onChange={() => setDeliveryArea('inside')}
                className="accent-rose-600"
              />
              <span className="flex-1">ঢাকার ভিতরে (৬০৳)</span>
            </label>
            <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="deliveryArea"
                checked={deliveryArea === 'outside'}
                onChange={() => setDeliveryArea('outside')}
                className="accent-rose-600"
              />
              <span className="flex-1">ঢাকার বাইরে সারা দেশে (১২০৳)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between text-slate-600 pt-2">
          <span>ডেলিভারি চার্জ:</span>
          <span className="font-bold text-slate-800">
            {deliveryFee === 0 ? (
              <span className="text-rose-600 font-bold">ফ্রি (০৳)</span>
            ) : (
              `৳${deliveryFee}`
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-rose-600 font-semibold">
            <span>ডিসকাউন্ট ({couponCode}):</span>
            <span>-৳{discount}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
          <span className="font-extrabold text-base text-slate-900">সর্বমোট (Total):</span>
          <span className="font-black text-2xl text-rose-950">৳{total}</span>
        </div>
      </div>

      {/* Coupon */}
      <div className="pt-2 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-700 block mb-1.5">
          কুপন কোড ব্যবহার করুন:
        </span>
        {couponCode ? (
          <div className="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 text-xs">
            <div className="flex items-center gap-1.5 text-rose-700 font-bold">
              <Tag className="w-3.5 h-3.5" />
              <span>কোড {couponCode} প্রয়োগকৃত</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-rose-600 hover:text-rose-700 font-bold"
            >
              বাতিল
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={inputCoupon}
              onChange={(e) => setInputCoupon(e.target.value)}
              placeholder="কুপন কোড (যেমন MASAKIN10)"
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition"
            >
              প্রয়োগ
            </button>
          </form>
        )}
        {couponMsg && (
          <p className={`text-xs mt-1.5 ${couponMsg.error ? 'text-rose-600' : 'text-rose-600'}`}>
            {couponMsg.text}
          </p>
        )}
      </div>

      {/* Checkout CTA */}
      <Link
        href="/checkout"
        className="w-full py-4 bg-[#09090b] hover:bg-zinc-900 text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-950/20 transition active:scale-95"
      >
        <span>চেকআউট এগিয়ে চলুন</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
