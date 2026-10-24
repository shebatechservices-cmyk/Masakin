'use client';

import React from 'react';
import { useShopData } from '@/context/ShopDataContext';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import ContactForm from '@/components/contact/ContactForm';
import PageGuard from '@/components/common/PageGuard';

export default function ContactPage() {
  const { settings } = useShopData();

  return (
    <PageGuard path="/contact" pageTitle="যোগাযোগ ও কাস্টমার সাপোর্ট">
      <div className="bg-zinc-50 min-h-screen py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-14 h-14 rounded-full bg-white p-0.5 border border-rose-200 shadow-xs overflow-hidden mx-auto mb-3">
              <img src="/images/logo.png" alt={settings.storeName} className="w-full h-full object-contain rounded-full" />
            </div>
            <span className="text-[#e11d48] font-bold text-xs uppercase tracking-widest block mb-1">
              {settings.storeName}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
              যোগাযোগ ও কাস্টমার সাপোর্ট
            </h1>
            <p className="text-zinc-600 text-sm mt-2">
              অর্ডার, সাইজ পরিবর্তন, বা যেকোনো তথ্যের জন্য নির্দ্বিধায় আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <ContactInfoCard settings={settings} />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </PageGuard>
  );
}
