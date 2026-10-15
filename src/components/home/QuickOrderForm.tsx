'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { CheckoutDetails } from '@/types';
import { useShopData } from '@/context/ShopDataContext';
import OrderPaymentSelector from './OrderPaymentSelector';
import OrderSummaryBox from './OrderSummaryBox';

interface QuickOrderFormProps {
  formData: CheckoutDetails;
  setFormData: React.Dispatch<React.SetStateAction<CheckoutDetails>>;
  errors: { [key: string]: string };
  subtotal: number;
  deliveryFee: number;
  total: number;
  isSubmitting: boolean;
  onDistrictChange: (dist: string) => void;
}

export default function QuickOrderForm({
  formData,
  setFormData,
  errors,
  subtotal,
  deliveryFee,
  total,
  isSubmitting,
  onDistrictChange
}: QuickOrderFormProps) {
  const { settings } = useShopData();
  const isInsideDhaka = formData.district.includes('ঢাকা') || formData.district.includes('Dhaka');

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200/90 shadow-sm space-y-4">
      {/* Header & Trust Badge */}
      <div className="pb-3 border-b border-zinc-100">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="font-extrabold text-sm sm:text-base text-zinc-950 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#e11d48] text-white text-xs flex items-center justify-center font-black">
              ২
            </span>
            <span>ডেলিভারির তথ্য দিন</span>
          </h3>
          <span className="text-[11px] font-bold text-[#e11d48] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            ক্যাশ অন ডেলিভারি
          </span>
        </div>
        <div className="bg-rose-50/70 text-zinc-800 p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border border-rose-200/80">
          <CheckCircle className="w-4 h-4 text-[#e11d48] shrink-0" />
          <span>ডেলিভারি ম্যানের সামনে পার্সেল খুলে দেখে মূল্য পরিশোধ করুন।</span>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs font-bold text-zinc-800 mb-1">
          আপনার নাম <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          autoComplete="name"
          placeholder="যেমন: তানভীর আহমেদ"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className={`w-full px-4 py-2.5 bg-zinc-50 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e11d48] ${
            errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-zinc-200'
          }`}
        />
        {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-bold text-zinc-800 mb-1">
          মোবাইল নম্বর <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          required
          autoComplete="tel"
          inputMode="numeric"
          placeholder="01712345678"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full px-4 py-2.5 bg-zinc-50 border rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#e11d48] ${
            errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-zinc-200'
          }`}
        />
        {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
      </div>

      {/* Delivery Area Selector */}
      <div>
        <label className="block text-xs font-bold text-zinc-800 mb-1.5">
          ডেলিভারি এলাকা নির্বাচন করুন <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onDistrictChange('ঢাকা (Dhaka)')}
            className={`py-2.5 px-2 rounded-xl border text-center transition flex flex-col items-center gap-0.5 cursor-pointer ${
              isInsideDhaka
                ? 'border-[#09090b] bg-[#09090b] text-white font-black shadow-xs'
                : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            <span className="text-xs">ঢাকার ভেতরে</span>
            <span className={`text-[11px] font-extrabold ${isInsideDhaka ? 'text-rose-400' : 'text-[#e11d48]'}`}>
              ডেলিভারি চার্জ ৳{settings.deliveryInsideDhaka}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onDistrictChange('অন্যান্য সকল জেলা')}
            className={`py-2.5 px-2 rounded-xl border text-center transition flex flex-col items-center gap-0.5 cursor-pointer ${
              !isInsideDhaka
                ? 'border-[#09090b] bg-[#09090b] text-white font-black shadow-xs'
                : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            <span className="text-xs">ঢাকার বাইরে সারা দেশে</span>
            <span className={`text-[11px] font-extrabold ${!isInsideDhaka ? 'text-rose-400' : 'text-[#e11d48]'}`}>
              ডেলিভারি চার্জ ৳{settings.deliveryOutsideDhaka}
            </span>
          </button>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-bold text-zinc-800 mb-1">
          সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={2}
          required
          autoComplete="street-address"
          placeholder="যেমন: হাউজ #১২, রোড #০৫, ধানমন্ডি, ঢাকা"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={`w-full px-4 py-2 bg-zinc-50 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e11d48] ${
            errors.address ? 'border-rose-400 bg-rose-50/30' : 'border-zinc-200'
          }`}
        />
        {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
      </div>

      {/* Payment Selection */}
      <OrderPaymentSelector
        paymentMethod={formData.paymentMethod}
        trxId={formData.trxId}
        storePhone={settings.phone}
        onChangePaymentMethod={(m) => setFormData({ ...formData, paymentMethod: m })}
        onChangeTrxId={(id) => setFormData({ ...formData, trxId: id })}
      />

      {/* Price breakdown and Submit CTA */}
      <OrderSummaryBox
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        total={total}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
