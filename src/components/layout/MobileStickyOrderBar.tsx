'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Zap, MessageCircle } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

export default function MobileStickyOrderBar() {
  const { settings } = useShopData();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-2.5 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-2">
        {/* Call button */}
        <a
          href={`tel:${settings.phone}`}
          className="p-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-2xl shrink-0 transition flex items-center justify-center border border-zinc-200"
          aria-label="হটলাইনে কল করুন"
        >
          <Phone className="w-5 h-5 text-zinc-900" />
        </a>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${settings.whatsapp}?text=হ্যালো%20${encodeURIComponent(settings.storeName)},%20আমি%20একটি%20পোশাক%20অর্ডার%20করতে%20চাই।`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-rose-50 hover:bg-rose-100 text-[#e11d48] rounded-2xl shrink-0 transition flex items-center justify-center border border-rose-200"
          aria-label="হোয়াটসঅ্যাপ চ্যাট"
        >
          <MessageCircle className="w-5 h-5 fill-[#e11d48]" />
        </a>

        {/* High-Conversion Rose Button */}
        <a
          href="#order-form"
          className="flex-1 py-3 px-4 bg-[#e11d48] hover:bg-[#be123c] text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <Zap className="w-4 h-4 fill-white text-white animate-bounce" />
          <span>অর্ডার করতে ক্লিক করুন</span>
        </a>
      </div>
    </div>
  );
}
