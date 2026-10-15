'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle2 } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

const SAMPLE_NAMES = [
  { name: 'ফারহানা শারমিন', location: 'ধানমন্ডি, ঢাকা' },
  { name: 'তানজিলা হক', location: 'উত্তরা, ঢাকা' },
  { name: 'নুসরাত জাহান', location: 'জিইসি মোড়, চট্টগ্রাম' },
  { name: 'সাদিয়া আফরোজ', location: 'উপশহর, সিলেট' },
  { name: 'মাহিয়া সুলতানা', location: 'মিরপুর, ঢাকা' }
];

export default function RecentSalesToast() {
  const { products } = useShopData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed || products.length === 0) return;

    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed, products.length]);

  if (isDismissed || !isVisible || products.length === 0) return null;

  const currentProduct = products[currentIndex % products.length];
  const currentCustomer = SAMPLE_NAMES[currentIndex % SAMPLE_NAMES.length];

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-zinc-200/90 shadow-2xl shadow-rose-950/20 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3">
        {/* Product image from live store */}
        <div className="relative w-12 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200">
          <Image
            src={currentProduct.images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80'}
            alt={currentProduct.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-950">
            <span className="truncate">{currentCustomer.name}</span>
            <span className="text-[10px] text-zinc-400 font-normal">({currentCustomer.location})</span>
          </div>
          <p className="text-xs font-semibold text-rose-600 truncate mt-0.5">
            {currentProduct.name}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500 font-medium">
            <span className="flex items-center gap-0.5 text-emerald-600 font-bold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              অর্ডার কনফার্মড
            </span>
            <span>•</span>
            <span className="text-rose-600 font-bold">৳{currentProduct.price}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full transition cursor-pointer self-start -mr-1 -mt-1"
          aria-label="বন্ধ করুন"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
