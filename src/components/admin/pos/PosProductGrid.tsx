'use client';

import React from 'react';
import { Product } from '@/types';
import { Plus } from 'lucide-react';

interface PosProductGridProps {
  products: Product[];
  onAddProduct: (product: Product, size?: string) => void;
}

export default function PosProductGrid({ products, onAddProduct }: PosProductGridProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
      <h3 className="text-xs font-bold text-stone-700">দ্রুত পণ্য নির্বাচন (ক্লিক করে কার্টে যোগ করুন)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
        {products.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onAddProduct(p, p.sizes?.[0])}
            className="text-left p-2.5 rounded-xl border border-zinc-200 hover:border-[#e11d48] bg-zinc-50/70 hover:bg-rose-50/30 transition flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <p className="text-[10px] text-zinc-400 font-mono font-bold">{p.sku || 'N/A'}</p>
              <p className="text-xs font-bold text-zinc-800 line-clamp-1 group-hover:text-[#e11d48] transition">
                {p.name}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                {p.categoryName}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200/60">
              <span className="text-xs font-black text-zinc-900 group-hover:text-[#e11d48] transition">৳{p.price}</span>
              <span className="w-5 h-5 rounded-md bg-zinc-200/80 group-hover:bg-[#e11d48] group-hover:text-white flex items-center justify-center transition">
                <Plus className="w-3 h-3" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
