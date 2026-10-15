'use client';

import React from 'react';
import { Truck } from 'lucide-react';
import { BANGLADESH_DISTRICTS } from '@/data/districts';
import { CheckoutDetails } from '@/types';

interface DeliveryFormProps {
  formData: CheckoutDetails;
  setFormData: React.Dispatch<React.SetStateAction<CheckoutDetails>>;
  errors: { [key: string]: string };
  onDistrictChange: (district: string) => void;
}

export default function DeliveryForm({
  formData,
  setFormData,
  errors,
  onDistrictChange
}: DeliveryFormProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-rose-600" />
          <span>১. প্রাপকের তথ্য ও ঠিকানা</span>
        </h2>
        <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
          গেস্ট চেকআউট
        </span>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="যেমন: তানভীর আহমেদ"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-600 ${
            errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
          }`}
        />
        {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          সচল মোবাইল নম্বর <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          required
          placeholder="01XXXXXXXXX (১১ ডিজিট)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-600 ${
            errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
          }`}
        />
        {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
        <p className="text-[11px] text-slate-400 mt-1">
          * ডেলিভারি কনফার্মেশন ও রাইডার যোগাযোগের জন্য ব্যবহৃত হবে।
        </p>
      </div>

      {/* District & City */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          জেলা নির্বাচন করুন <span className="text-rose-500">*</span>
        </label>
        <select
          value={formData.district}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-600"
        >
          {BANGLADESH_DISTRICTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Full Address */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          সম্পূর্ণ ঠিকানা (বাসা/ফ্ল্যাট নং, রোড, এলাকা) <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={2}
          required
          placeholder="যেমন: হাউজ #১২, রোড #০৫, ব্লক-বি, ধানমন্ডি, ঢাকা"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-600 ${
            errors.address ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
          }`}
        />
        {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
      </div>

      {/* Special Notes */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          অর্ডার সংক্রান্ত কোনো বিশেষ নির্দেশনা (ঐচ্ছিক)
        </label>
        <input
          type="text"
          placeholder="যেমন: দ্রুত ডেলিভারি দিলে ভালো হয়"
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-600"
        />
      </div>
    </div>
  );
}
