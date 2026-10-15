'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

export default function WhatsAppButton() {
  const { settings } = useShopData();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 group">
      <a
        href={`https://wa.me/${settings.whatsapp}?text=হ্যালো%20${encodeURIComponent(settings.storeName)},%20আমি%20একটি%20অর্ডার%20করতে%20চাই।`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-rose-600/25 transition-all transform hover:scale-105 active:scale-95 border-2 border-white"
        aria-label="হোয়াটসঅ্যাপে অর্ডার করুন"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden md:inline font-bold text-sm tracking-wide">
          হোয়াটসঅ্যাপে অর্ডার
        </span>
      </a>
    </div>
  );
}
