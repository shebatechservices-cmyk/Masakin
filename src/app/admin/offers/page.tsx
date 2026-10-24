'use client';

import React from 'react';
import CouponsManager from '@/components/admin/offers/CouponsManager';
import StoreSettingsForm from '@/components/admin/offers/StoreSettingsForm';
import SecuritySettingsCard from '@/components/admin/offers/SecuritySettingsCard';
import StaffListCard from '@/components/admin/offers/StaffListCard';

export default function AdminOffersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
          দোকানের সেটিংস, অফার ও সিকিউরিটি
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          দোকানের তথ্য, হটলাইন, ডিসকাউন্ট কুপন ও এডমিন-স্টাফ তালিকা ও পাসওয়ার্ড পরিবর্তন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-6">
          <StaffListCard />
          <StoreSettingsForm />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <SecuritySettingsCard />
          <CouponsManager />
        </div>
      </div>
    </div>
  );
}
