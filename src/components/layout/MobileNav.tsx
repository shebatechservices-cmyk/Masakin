'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ShoppingBag, MessageCircle, PhoneCall } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useShopData } from '@/context/ShopDataContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { settings } = useShopData();

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/shop');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-4 items-center text-center">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center py-1 transition ${
            isHome ? 'text-[#e11d48] font-bold' : 'text-zinc-600 hover:text-[#e11d48]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">হোম</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center py-1 transition ${
            isShop ? 'text-[#e11d48] font-bold' : 'text-zinc-600 hover:text-[#e11d48]'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">ক্যাটালগ</span>
        </Link>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center py-1 text-zinc-600 hover:text-[#e11d48] transition cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#e11d48] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px]">কার্ট</span>
        </button>

        {/* WhatsApp Quick Chat */}
        <a
          href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`হ্যালো ${settings.storeName}, আমি একটি পোশাক অর্ডার করতে চাই।`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1 text-rose-600 font-semibold transition hover:text-rose-600"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 text-rose-600 fill-rose-100" />
          <span className="text-[11px]">অর্ডার চ্যাট</span>
        </a>

      </div>
    </div>
  );
}
