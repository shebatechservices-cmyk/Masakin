'use client';

import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

export default function AnnouncementBar() {
  const { settings } = useShopData();

  return (
    <div className="bg-[#09090b] text-white text-xs sm:text-sm py-2 px-4 font-medium border-b border-rose-950/60 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
          <span className="text-zinc-200">
            {settings.announcementText}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-zinc-300">
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-1.5 hover:text-rose-300 transition font-mono font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-rose-400" />
            হটলাইন: {settings.phone}
          </a>
          <span className="bg-[#e11d48] px-2.5 py-0.5 rounded-full text-[11px] font-black text-white shadow-xs">
            সারা দেশে ক্যাশ অন ডেলিভারি
          </span>
        </div>
      </div>
    </div>
  );
}
