'use client';

import React from 'react';
import CouponsManager from '@/components/admin/offers/CouponsManager';
import StoreSettingsForm from '@/components/admin/offers/StoreSettingsForm';

export default function AdminOffersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
          দোকানের সেটিংস, অফার ও ব্যানার ম্যানেজমেন্ট
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          দোকানের নাম, হটলাইন ফোন, ঠিকানা, ডিসকাউন্ট কুপন ও ওয়েবসাইট নোটিফিকেশন বার লাইভ পরিবর্তন করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-4">
          <CouponsManager />
        </div>
        <div className="lg:col-span-6 space-y-4">
          <StoreSettingsForm />
        </div>
      </div>
    </div>
  );
}
