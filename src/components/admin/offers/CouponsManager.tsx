'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

export default function CouponsManager() {
  const { coupons, saveCoupon, deleteCoupon, toggleCouponStatus } = useShopData();
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(15);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    saveCoupon({
      id: `c-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      discount: Number(newDiscount),
      status: 'active'
    });
    setNewCode('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs space-y-5">
      <h2 className="font-extrabold text-base text-zinc-900 flex items-center gap-2 pb-3 border-b border-zinc-100">
        <Tag className="w-5 h-5 text-[#e11d48]" />
        <span>ডিসকাউন্ট কুপন সমূহ ({coupons.length})</span>
      </h2>

      <div className="space-y-3">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-200 bg-zinc-50/70"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#e11d48] border border-rose-100 flex items-center justify-center font-mono font-black text-xs">
                %{coupon.discount}
              </div>
              <div>
                <span className="font-mono font-black text-sm sm:text-base text-zinc-900 tracking-wider">
                  {coupon.code}
                </span>
                <span className="text-[11px] text-zinc-500 block">
                  ফ্ল্যাট {coupon.discount}% ডিসকাউন্ট
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleCouponStatus(coupon.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer ${
                  coupon.status === 'active'
                    ? 'bg-rose-50 text-[#e11d48] border-rose-200'
                    : 'bg-zinc-200 text-zinc-500 border-zinc-300'
                }`}
              >
                {coupon.status === 'active' ? 'সক্রিয়' : 'বন্ধ'}
              </button>
              <button
                type="button"
                onClick={() => deleteCoupon(coupon.id)}
                className="p-1.5 text-zinc-400 hover:text-rose-600 transition cursor-pointer"
                title="মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddCoupon} className="pt-3 border-t border-zinc-100 space-y-3">
        <span className="text-xs font-bold text-zinc-700 block">নতুন কুপন কোড তৈরি করুন:</span>
        <div className="flex gap-2">
          <input
            type="text"
            required
            placeholder="যেমন: EID25"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            className="flex-1 px-3.5 py-2 border border-zinc-200 rounded-xl text-xs uppercase font-mono bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
          />
          <div className="flex items-center border border-zinc-200 rounded-xl px-3 bg-zinc-50 w-28">
            <input
              type="number"
              min="1"
              max="90"
              required
              value={newDiscount}
              onChange={(e) => setNewDiscount(Number(e.target.value))}
              className="w-full bg-transparent text-xs font-bold focus:outline-none text-zinc-900"
            />
            <span className="text-xs font-bold text-zinc-500">%</span>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-xl text-xs flex items-center gap-1 shrink-0 cursor-pointer transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>যোগ করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
}
