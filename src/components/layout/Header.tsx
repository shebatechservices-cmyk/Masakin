'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useShopData } from '@/context/ShopDataContext';
import AnnouncementBar from './AnnouncementBar';

export default function Header() {
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { settings } = useShopData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Logo with Shop Badge */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-rose-200/80 shadow-xs group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-0.5">
              <img
                src={settings.logoUrl || '/images/logo.png'}
                alt={settings.storeName}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-xl text-zinc-950 tracking-tight leading-none group-hover:text-[#e11d48] transition-colors">
                {settings.storeName}
              </span>
              <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-[#e11d48] uppercase mt-0.5">
                BASTRABITAN
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="মহিলাদের থ্রি-পিস, ফ্রক বা বাচ্চাদের ড্রেস খুঁজুন..."
              className="w-full pl-4 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#e11d48] focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#09090b] hover:bg-[#e11d48] text-white flex items-center justify-center transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-zinc-800">
            <Link href="/" className="hover:text-[#e11d48] transition">হোম</Link>
            <Link href="/shop?category=womens" className="hover:text-[#e11d48] transition">নারীদের থ্রি-পিস</Link>
            <Link href="/shop?category=kids" className="hover:text-[#e11d48] transition">কিডস কালেকশন</Link>
            <Link href="/shop?category=sharee" className="hover:text-[#e11d48] transition">শাড়ি</Link>
            <Link href="/shop" className="text-[#e11d48] hover:text-[#be123c] font-black transition">সব পোশাক</Link>
          </nav>

          {/* Actions (Cart, Admin Link & CTA) */}
          <div className="flex items-center gap-2.5">
            {/* Admin portal small link */}
            <Link
              href="/admin"
              className="hidden xl:flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-[#e11d48] px-2.5 py-1.5 rounded-lg border border-zinc-200 hover:border-rose-200"
              title="শপ এডমিন ড্যাশবোর্ড"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#e11d48]" />
              <span>এডমিন</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full hover:bg-zinc-100 text-zinc-900 transition cursor-pointer"
              aria-label="শপিং কার্ট"
            >
              <ShoppingBag className="w-6 h-6 text-zinc-900" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e11d48] text-white font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </button>

            {/* White+Rose+Black High-Contrast CTA Button */}
            <Link
              href="/#order-form"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-black rounded-full bg-[#09090b] hover:bg-[#e11d48] text-white shadow-md hover:shadow-rose-600/25 transition active:scale-95 border border-zinc-900 hover:border-[#e11d48]"
            >
              অর্ডার করুন
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-800 hover:bg-zinc-100 rounded-lg transition"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="থ্রি-পিস, বাচ্চাদের ফ্রক বা কুর্তি খুঁজুন..."
              className="w-full pl-4 pr-10 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#09090b] text-white flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-2.5 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 text-base font-bold text-zinc-800">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-rose-50 hover:text-[#e11d48] transition">হোম</Link>
            <Link href="/shop?category=womens" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-rose-50 hover:text-[#e11d48] transition">নারীদের রেডিমেড থ্রি-পিস</Link>
            <Link href="/shop?category=kids" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-rose-50 hover:text-[#e11d48] transition">বাচ্চাদের ফ্রক ও ড্রেস</Link>
            <Link href="/shop?category=sharee" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg hover:bg-rose-50 hover:text-[#e11d48] transition">শাড়ি কালেকশন</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-lg bg-rose-50 text-[#e11d48] font-black transition">সব পোশাক দেখুন (Shop All)</Link>
            <div className="border-t border-zinc-100 pt-2 flex flex-col space-y-1.5 text-xs text-zinc-600">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-[#e11d48] font-bold">🔐 শপ এডমিন ও স্টাফ লগইন</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 hover:text-[#e11d48]">আমাদের গল্প</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 hover:text-[#e11d48]">যোগাযোগ ও শোরুম</Link>
              <Link href="/policies" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 hover:text-[#e11d48]">রিটার্ন ও শিপিং পলিসি</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
