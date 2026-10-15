'use client';

import React, { useState } from 'react';
import { Store, Check } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

export default function StoreSettingsForm() {
  const { settings, updateSettings } = useShopData();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email || 'masakinbastrabitan@gmail.com');
  const [website, setWebsite] = useState(settings.website || 'www.masakinbastrabitan.com');
  const [address, setAddress] = useState(settings.address);
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      phone,
      email,
      website,
      address,
      announcementText
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs space-y-4">
      {/* Header with Shop Logo Preview */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white p-0.5 border border-rose-200 shadow-xs overflow-hidden shrink-0">
            <img
              src={settings.logoUrl || '/images/logo.png'}
              alt={settings.storeName}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-zinc-900 leading-tight">
              দোকানের তথ্য ও লাইভ প্রোফাইল
            </h2>
            <span className="text-[11px] text-zinc-400 font-medium">
              লোগো, কন্টাক্ট, ইমেইল ও ওয়েবসাইট সেটিংস
            </span>
          </div>
        </div>
        <Store className="w-5 h-5 text-[#e11d48]" />
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs">
        <div>
          <label className="block font-bold text-zinc-700 mb-1">
            দোকানের নাম (Store Name):
          </label>
          <input
            type="text"
            required
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              হটলাইন মোবাইল / কন্টাক্ট:
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48] font-mono"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              ইমেইল ঠিকানা (Email):
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. masakinbastrabitan@gmail.com"
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              ওয়েবসাইট লিংক (Website):
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g. www.masakinbastrabitan.com"
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              দোকানের ঠিকানা:
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-zinc-700 mb-1">
            ওয়েবসাইট টপ নোটিফিকেশন বার বার্তা:
          </label>
          <textarea
            rows={2}
            required
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className="w-full p-3 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#09090b] hover:bg-[#18181b] active:bg-[#e11d48] text-white font-black rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-rose-400" />
              <span className="text-rose-200">সেটিংস আপডেট সম্পন্ন হয়েছে!</span>
            </>
          ) : (
            <span>সেটিংস ও ব্যানার সংরক্ষণ করুন</span>
          )}
        </button>
      </form>
    </div>
  );
}
