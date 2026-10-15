'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { useShopData } from '@/context/ShopDataContext';

export default function CategoryGrid() {
  const { products } = useShopData();

  // Dynamically calculate counts based on active products in store
  const categoriesWithLiveCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.id).length
  }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-rose-600 font-bold text-xs uppercase tracking-widest block mb-2">
              পপুলার কালেকশন
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              ক্যাটাগরি অনুযায়ী কেনাকাটা করুন
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-rose-600 hover:text-rose-700 transition group"
          >
            <span>সবগুলো কালেকশন দেখুন ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {categoriesWithLiveCounts.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group relative rounded-3xl overflow-hidden bg-zinc-900 flex flex-col hover:shadow-2xl transition-all duration-300 border border-zinc-200/80 hover:border-rose-400"
            >
              {/* Image */}
              <div className="relative aspect-4/3 sm:aspect-4/5 w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-left space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-rose-400 transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1">{cat.description}</p>
                  <span className="inline-block text-[11px] font-bold text-amber-300 pt-1">
                    {cat.count}টি পোশাক স্টক রয়েছে →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
