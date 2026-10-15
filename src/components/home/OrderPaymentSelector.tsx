'use client';

import React from 'react';
import { Banknote, Smartphone } from 'lucide-react';
import { CheckoutDetails } from '@/types';

interface OrderPaymentSelectorProps {
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  trxId?: string;
  storePhone: string;
  onChangePaymentMethod: (method: 'cod' | 'bkash' | 'nagad') => void;
  onChangeTrxId: (trxId: string) => void;
}

export default function OrderPaymentSelector({
  paymentMethod,
  trxId,
  storePhone,
  onChangePaymentMethod,
  onChangeTrxId
}: OrderPaymentSelectorProps) {
  return (
    <div className="pt-1">
      <label className="block text-xs font-bold text-zinc-800 mb-1.5">
        পেমেন্ট মাধ্যম:
      </label>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onChangePaymentMethod('cod')}
          className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
            paymentMethod === 'cod'
              ? 'border-[#09090b] bg-[#09090b] text-white font-bold ring-1 ring-[#e11d48]'
              : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
          }`}
        >
          <Banknote className={`w-4 h-4 ${paymentMethod === 'cod' ? 'text-rose-400' : 'text-zinc-700'}`} />
          <span className="text-[11px]">ক্যাশ অন ডেলিভারি</span>
        </button>
        <button
          type="button"
          onClick={() => onChangePaymentMethod('bkash')}
          className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
            paymentMethod === 'bkash'
              ? 'border-[#e11d48] bg-rose-50 text-rose-900 font-bold ring-1 ring-[#e11d48]'
              : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
          }`}
        >
          <Smartphone className="w-4 h-4 text-[#e11d48]" />
          <span className="text-[11px]">বিকাশ</span>
        </button>
        <button
          type="button"
          onClick={() => onChangePaymentMethod('nagad')}
          className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
            paymentMethod === 'nagad'
              ? 'border-[#e11d48] bg-rose-50 text-rose-900 font-bold ring-1 ring-[#e11d48]'
              : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
          }`}
        >
          <Smartphone className="w-4 h-4 text-[#e11d48]" />
          <span className="text-[11px]">নগদ</span>
        </button>
      </div>

      {paymentMethod !== 'cod' && (
        <div className="mt-2.5 p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs space-y-1.5">
          <p className="text-zinc-800">
            আমাদের {paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} নম্বর: <strong>{storePhone}</strong>
          </p>
          <input
            type="text"
            placeholder="ট্রানজ্যাকশন আইডি (TrxID) দিন"
            value={trxId || ''}
            onChange={(e) => onChangeTrxId(e.target.value)}
            className="w-full px-3 py-1.5 border border-zinc-300 rounded-lg font-mono uppercase text-xs focus:ring-2 focus:ring-[#e11d48] focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
