'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Sparkles, ShoppingBag } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

export default function ReelsShowcase() {
  const { products } = useShopData();

  // Pick top 4 products dynamically from live store
  const displayProducts = products.slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-14 bg-gradient-to-b from-white via-rose-50/30 to-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-rose-600 font-bold text-xs uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>ভিডিওতে দেখুন আসল কোয়ালিটি</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              পোশাকের নিখুঁত ফল ও ভিডিও লুক
            </h2>
          </div>
          <Link
            href="/#order-form"
            className="text-xs sm:text-sm font-extrabold text-rose-600 hover:text-rose-700 flex items-center gap-1 group"
          >
            <span>সরাসরি ১-ক্লিকে অর্ডার ফর্ম</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((p, idx) => (
            <div
              key={p.id}
              className="group relative rounded-3xl overflow-hidden bg-zinc-950 aspect-9/16 shadow-lg border border-zinc-200/80 hover:shadow-2xl hover:border-rose-300 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Poster Image */}
              <Image
                src={p.images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'}
                alt={p.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-95"
                sizes="(max-width: 640px) 50vw, 25vw"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

              {/* Top Badge */}
              <div className="relative z-10 p-3 flex items-center justify-between">
                <span className="bg-rose-600/90 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {p.categoryName}
                </span>
                <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                  ০:১{idx + 5}
                </span>
              </div>

              {/* Center Play Button Pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-600 transition-all duration-300 shadow-xl">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Details & 1-Click Order */}
              <div className="relative z-10 p-3.5 space-y-2.5">
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-xs sm:text-sm line-clamp-2 leading-tight">
                    {p.name}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-zinc-300">
                    <span className="font-extrabold text-amber-300 text-sm">৳{p.price}</span>
                    <span className="text-[10px] text-zinc-400">{(idx + 2) * 8}কে ভিউ</span>
                  </div>
                </div>

                <Link
                  href={`/product/${p.id}`}
                  className="w-full py-2 bg-white/95 hover:bg-rose-600 hover:text-white text-zinc-950 text-xs font-black rounded-xl transition duration-200 flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>অর্ডার করুন</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
