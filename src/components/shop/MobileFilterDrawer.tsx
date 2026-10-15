'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';

interface MobileFilterDrawerProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  onReset: () => void;
}

export default function MobileFilterDrawer({
  products,
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  onReset
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xs bg-white shadow-xl flex flex-col p-5 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <h3 className="font-black text-base text-zinc-900">ফিল্টার সমূহ</h3>
            <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-2">ক্যাটাগরি</h4>
            <div className="space-y-1">
              <button
                onClick={() => { setSelectedCategory('all'); onClose(); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-rose-50 text-[#e11d48] border border-rose-200'
                    : 'text-zinc-700 hover:bg-zinc-50'
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
                    onClick={() => { setSelectedCategory(cat.id); onClose(); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-rose-50 text-[#e11d48] border border-rose-200'
                        : 'text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-zinc-400 font-mono">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-xs font-black text-zinc-500 uppercase tracking-wider">সর্বোচ্চ মূল্য</h4>
              <span className="text-xs font-black text-[#e11d48]">৳{maxPrice}</span>
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

          <div className="pt-4 border-t border-zinc-100 flex gap-2">
            <button
              onClick={() => { onReset(); onClose(); }}
              className="flex-1 py-2.5 text-center text-xs font-bold border border-zinc-200 rounded-xl text-zinc-700 hover:bg-zinc-50 cursor-pointer"
            >
              রিসেট
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-center text-xs font-bold bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl shadow-xs cursor-pointer"
            >
              প্রয়োগ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
