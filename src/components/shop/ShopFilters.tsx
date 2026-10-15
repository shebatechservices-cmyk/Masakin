'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';

interface ShopFiltersProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  allSizes: string[];
  allColors: { name: string; hex: string }[];
  hasActiveFilters: boolean;
  onReset: () => void;
}

export default function ShopFilters({
  products,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  allSizes,
  allColors,
  hasActiveFilters,
  onReset
}: ShopFiltersProps) {
  return (
    <aside className="hidden lg:block lg:col-span-1 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-xs space-y-6 sticky top-24">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2 font-black text-zinc-900 text-base">
            <SlidersHorizontal className="w-4 h-4 text-[#e11d48]" />
            <span>ফিল্টার করুন</span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs text-[#e11d48] hover:text-[#be123c] font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>রিসেট</span>
            </button>
          )}
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-3">
            ক্যাটাগরি
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-rose-50 text-[#e11d48] border border-rose-200'
                  : 'text-zinc-700 hover:bg-zinc-50 border border-transparent'
              }`}
            >
              <span>সকল পোশাক</span>
              <span className="text-[11px] text-zinc-400 font-mono">{products.length}</span>
            </button>
            {CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-rose-50 text-[#e11d48] border border-rose-200'
                      : 'text-zinc-700 hover:bg-zinc-50 border border-transparent'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] text-zinc-400 font-mono">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider">
              সর্বোচ্চ মূল্য
            </h3>
            <span className="text-xs font-black text-[#e11d48]">
              ৳{maxPrice}
            </span>
          </div>
          <input
            type="range"
            min="300"
            max="6000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#e11d48] cursor-pointer"
          />
        </div>

        {/* Size Filter */}
        {allSizes.length > 0 && (
          <div>
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-2.5">
              সাইজ নির্বাচন
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-2.5 py-1 text-xs rounded-lg border font-bold transition cursor-pointer ${
                  selectedSize === 'all'
                    ? 'bg-[#09090b] text-white border-[#09090b]'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                সব
              </button>
              {allSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-bold transition cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-[#09090b] text-white border-[#09090b]'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
