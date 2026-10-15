'use client';

import React from 'react';
import { PosCartItem } from '@/types/finance';

interface PosBillingPanelProps {
  items: PosCartItem[];
  discount: number;
  paidAmount: number;
  paymentMethod: 'cash' | 'bkash' | 'nagad';
  customerPhone: string;
  onDiscountChange: (val: number) => void;
  onPaidAmountChange: (val: number) => void;
  onPaymentMethodChange: (val: 'cash' | 'bkash' | 'nagad') => void;
  onCustomerPhoneChange: (val: string) => void;
  onCompleteSale: () => void;
}

export default function PosBillingPanel({
  items,
  discount,
  paidAmount,
  paymentMethod,
  customerPhone,
  onDiscountChange,
  onPaidAmountChange,
  onPaymentMethodChange,
  onCustomerPhoneChange,
  onCompleteSale
}: PosBillingPanelProps) {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const total = Math.max(0, subtotal - discount);
  const change = Math.max(0, paidAmount - total);

  return (
    <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
      <h3 className="text-xs font-bold text-stone-700 pb-2 border-b border-stone-100">
        বিল ও পেমেন্ট হিসাব
      </h3>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-stone-500 font-bold mb-1">কাস্টমার ফোন (ঐচ্ছিক)</label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => onCustomerPhoneChange(e.target.value)}
            placeholder="017xxxxxxxx"
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#e11d48]"
          />
        </div>
        <div>
          <label className="block text-zinc-500 font-bold mb-1">ছাড় / ডিসকাউন্ট (৳)</label>
          <input
            type="number"
            min="0"
            value={discount || ''}
            onChange={(e) => onDiscountChange(Number(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#e11d48]"
          />
        </div>
      </div>

      {/* Payment Method Selector */}
      <div>
        <label className="block text-xs text-zinc-500 font-bold mb-1.5">পেমেন্ট মেথড</label>
        <div className="grid grid-cols-3 gap-2">
          {(['cash', 'bkash', 'nagad'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => onPaymentMethodChange(method)}
              className={`py-2 text-xs font-bold rounded-xl border capitalize transition cursor-pointer ${
                paymentMethod === method
                  ? 'bg-[#09090b] text-white border-[#09090b]'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {method === 'cash' ? 'ক্যাশ টাকা' : method === 'bkash' ? 'বিকাশ' : 'নগদ'}
            </button>
          ))}
        </div>
      </div>

      {/* Paid Amount */}
      <div>
        <div className="flex justify-between items-center text-xs font-bold text-zinc-700 mb-1">
          <span>গৃহীত টাকা (Paid Amount)</span>
          <button
            type="button"
            onClick={() => onPaidAmountChange(total)}
            className="text-[11px] text-[#e11d48] hover:underline cursor-pointer"
          >
            সম্পূর্ণ পরিশোধ (৳{total})
          </button>
        </div>
        <input
          type="number"
          min="0"
          value={paidAmount || ''}
          onChange={(e) => onPaidAmountChange(Number(e.target.value) || 0)}
          placeholder={`৳${total}`}
          className="w-full px-3 py-2 text-base font-bold text-zinc-800 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#e11d48]"
        />
      </div>

      {/* Summary Box */}
      <div className="p-3.5 bg-zinc-50 rounded-xl space-y-2 text-xs border border-zinc-100">
        <div className="flex justify-between text-zinc-600">
          <span>সাব-টোটাল ({items.reduce((s, i) => s + i.quantity, 0)} পিস):</span>
          <span className="font-bold">৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>ডিসকাউন্ট:</span>
          <span className="font-bold text-rose-600">-৳{discount}</span>
        </div>
        <div className="flex justify-between text-sm font-black text-zinc-900 pt-2 border-t border-zinc-200">
          <span>মোট বিল (Net Total):</span>
          <span className="text-[#e11d48]">৳{total}</span>
        </div>
        <div className="flex justify-between text-xs font-bold pt-1 text-zinc-700">
          <span>ফেরত / চেঞ্জ (Change):</span>
          <span>৳{change}</span>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="button"
        disabled={items.length === 0}
        onClick={onCompleteSale}
        className="w-full py-3.5 bg-[#e11d48] hover:bg-[#be123c] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md transition cursor-pointer text-sm"
      >
        ক্যাশ মেমো তৈরি ও প্রিন্ট করুন
      </button>
    </div>
  );
}
