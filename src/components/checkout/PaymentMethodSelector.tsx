'use client';

import React from 'react';
import { CreditCard, Banknote, Smartphone } from 'lucide-react';
import { CheckoutDetails } from '@/types';

interface PaymentMethodSelectorProps {
  formData: CheckoutDetails;
  setFormData: React.Dispatch<React.SetStateAction<CheckoutDetails>>;
  total: number;
  errors: { [key: string]: string };
}

export default function PaymentMethodSelector({
  formData,
  setFormData,
  total,
  errors
}: PaymentMethodSelectorProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
      <h2 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
        <CreditCard className="w-5 h-5 text-rose-600" />
        <span>২. পেমেন্ট মেথড নির্বাচন করুন</span>
      </h2>

      <div className="space-y-3">
        {/* 1. Cash on Delivery */}
        <label
          className={`block p-4 rounded-2xl border-2 cursor-pointer transition ${
            formData.paymentMethod === 'cod'
              ? 'border-rose-700 bg-rose-50/40 ring-1 ring-rose-500'
              : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'cod'}
              onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
              className="accent-rose-600 w-4 h-4"
            />
            <Banknote className="w-5 h-5 text-rose-600 shrink-0" />
            <div className="flex-1">
              <div className="font-bold text-sm text-slate-900">
                ক্যাশ অন ডেলিভারি (Cash on Delivery)
              </div>
              <div className="text-xs text-slate-500">
                পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন। কোনো অগ্রিম চার্জ লাগবে না।
              </div>
            </div>
          </div>
        </label>

        {/* 2. bKash */}
        <label
          className={`block p-4 rounded-2xl border-2 cursor-pointer transition ${
            formData.paymentMethod === 'bkash'
              ? 'border-pink-600 bg-pink-50/40 ring-1 ring-pink-500'
              : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'bkash'}
              onChange={() => setFormData({ ...formData, paymentMethod: 'bkash' })}
              className="accent-pink-600 w-4 h-4"
            />
            <Smartphone className="w-5 h-5 text-pink-600 shrink-0" />
            <div className="flex-1">
              <div className="font-bold text-sm text-slate-900">
                বিকাশ পেমেন্ট (bKash)
              </div>
              <div className="text-xs text-slate-500">
                বিকাশ সেন্ড মানি বা পেমেন্ট করে TrxID দিন।
              </div>
            </div>
          </div>

          {formData.paymentMethod === 'bkash' && (
            <div className="mt-4 pt-4 border-t border-pink-200 text-xs space-y-2 bg-white p-3.5 rounded-xl">
              <p className="text-slate-700">
                ১. আমাদের বিকাশ পার্সোনাল নম্বর: <strong className="font-mono text-pink-700 text-sm">01712-345678</strong>
              </p>
              <p className="text-slate-700">
                ২. সর্বমোট <strong>৳{total}</strong> টাকা সেন্ড মানি করুন।
              </p>
              <div className="pt-2">
                <label className="block font-bold text-slate-800 mb-1">
                  আপনার ট্রানজ্যাকশন আইডি (TrxID) লিখুন: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9J4K2L8X10"
                  value={formData.trxId || ''}
                  onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono uppercase text-xs"
                />
                {errors.trxId && <p className="text-rose-600 text-xs mt-1">{errors.trxId}</p>}
              </div>
            </div>
          )}
        </label>

        {/* 3. Nagad */}
        <label
          className={`block p-4 rounded-2xl border-2 cursor-pointer transition ${
            formData.paymentMethod === 'nagad'
              ? 'border-orange-600 bg-orange-50/40 ring-1 ring-orange-500'
              : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'nagad'}
              onChange={() => setFormData({ ...formData, paymentMethod: 'nagad' })}
              className="accent-orange-600 w-4 h-4"
            />
            <Smartphone className="w-5 h-5 text-orange-600 shrink-0" />
            <div className="flex-1">
              <div className="font-bold text-sm text-slate-900">
                নগদ পেমেন্ট (Nagad)
              </div>
              <div className="text-xs text-slate-500">
                নগদ সেন্ড মানি করে TrxID প্রদান করুন।
              </div>
            </div>
          </div>

          {formData.paymentMethod === 'nagad' && (
            <div className="mt-4 pt-4 border-t border-orange-200 text-xs space-y-2 bg-white p-3.5 rounded-xl">
              <p className="text-slate-700">
                ১. আমাদের নগদ পার্সোনাল নম্বর: <strong className="font-mono text-orange-700 text-sm">01712-345678</strong>
              </p>
              <p className="text-slate-700">
                ২. সর্বমোট <strong>৳{total}</strong> টাকা সেন্ড মানি করুন।
              </p>
              <div className="pt-2">
                <label className="block font-bold text-slate-800 mb-1">
                  আপনার ট্রানজ্যাকশন আইডি (TrxID) লিখুন: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7N3K9B1P"
                  value={formData.trxId || ''}
                  onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono uppercase text-xs"
                />
                {errors.trxId && <p className="text-rose-600 text-xs mt-1">{errors.trxId}</p>}
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
