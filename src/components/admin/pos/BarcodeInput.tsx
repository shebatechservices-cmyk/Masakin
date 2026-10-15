'use client';

import React, { useState } from 'react';
import { Barcode, Search, Plus } from 'lucide-react';
import { Product } from '@/types';

interface BarcodeInputProps {
  products: Product[];
  onAddProduct: (product: Product, size?: string) => void;
}

export default function BarcodeInput({ products, onAddProduct }: BarcodeInputProps) {
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleScanOrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const term = query.trim().toLowerCase();
    if (!term) return;

    // Search by exact SKU, ID, or partial name
    const found = products.find(
      (p) =>
        p.sku?.toLowerCase() === term ||
        p.id.toLowerCase() === term ||
        p.name.toLowerCase().includes(term) ||
        p.nameEn?.toLowerCase().includes(term)
    );

    if (found) {
      onAddProduct(found, found.sizes?.[0]);
      setQuery('');
    } else {
      setErrorMsg(`"${query}" বারকোড বা SKU দিয়ে কোনো পণ্য পাওয়া যায়নি!`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
      <form onSubmit={handleScanOrSubmit} className="space-y-2">
        <label className="block text-xs font-bold text-stone-700">
          বারকোড স্ক্যানার বা SKU কোড ইনপুট (প্রেস এন্টার)
        </label>
        <div className="relative flex items-center">
          <Barcode className="w-5 h-5 absolute left-3.5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="বারকোড স্ক্যান করুন বা যেমন: MSK-WOM-001..."
            autoFocus
            className="w-full pl-11 pr-24 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-800 placeholder:text-zinc-400 placeholder:font-normal focus:bg-white focus:outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 bg-[#09090b] hover:bg-[#e11d48] text-white text-xs font-bold rounded-lg flex items-center gap-1 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>যোগ করুন</span>
          </button>
        </div>
      </form>
      {errorMsg && (
        <p className="text-xs font-bold text-red-500 mt-2 bg-red-50 p-2 rounded-lg">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
