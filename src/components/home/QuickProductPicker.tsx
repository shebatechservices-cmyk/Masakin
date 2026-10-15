'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Ruler } from 'lucide-react';
import { Product } from '@/types';
import { useShopData } from '@/context/ShopDataContext';
import VisualSizeGuideModal from './VisualSizeGuideModal';

interface QuickProductPickerProps {
  selectedProduct: Product;
  setSelectedProduct: (p: Product) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  quantity: number;
  setQuantity: (q: number) => void;
}

export default function QuickProductPicker({
  selectedProduct,
  setSelectedProduct,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity
}: QuickProductPickerProps) {
  const { products } = useShopData();
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <h3 className="font-extrabold text-sm sm:text-base text-zinc-950 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#09090b] text-white text-xs flex items-center justify-center font-black">
            ১
          </span>
          <span>পোশাক ও সাইজ নির্বাচন করুন</span>
        </h3>
        <span className="text-xs font-bold text-[#e11d48] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
          {products.length}টি লাইভ আইটেম
        </span>
      </div>

      {/* Product Thumbnails Select Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto pr-1">
        {products.map((p) => {
          const isSelected = p.id === selectedProduct.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setSelectedProduct(p);
                setSelectedSize(p.sizes?.[0] || 'Standard');
                setSelectedColor(p.colors?.[0]?.name || 'Standard');
              }}
              className={`p-2 rounded-2xl border-2 text-left transition relative flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-[#e11d48] bg-rose-50/50 shadow-sm ring-1 ring-[#fb7185]'
                  : 'border-zinc-200 hover:border-zinc-300 bg-white'
              }`}
            >
              <div className="aspect-3/4 rounded-xl overflow-hidden relative mb-2 bg-zinc-100">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
              <h4 className="font-bold text-[11px] text-zinc-900 line-clamp-1 leading-tight">
                {p.name}
              </h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-black text-[#e11d48]">৳{p.price}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Product Summary & Size/Color/Qty */}
      <div className="bg-zinc-50 rounded-2xl p-3.5 border border-zinc-200 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <span className="text-[10px] font-bold text-[#e11d48] uppercase tracking-wide">
              নির্বাচিত: {selectedProduct.categoryName}
            </span>
            <h4 className="font-extrabold text-sm text-zinc-950">{selectedProduct.name}</h4>
          </div>
          <span className="text-base font-black text-zinc-950">
            ৳{selectedProduct.price * quantity}
          </span>
        </div>

        {/* Size Selector + Size Guide Link */}
        {selectedProduct.sizes?.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-700">সাইজ:</span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[11px] font-extrabold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>সাইজ গাইড চার্ট</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedProduct.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition cursor-pointer ${
                    selectedSize === s
                      ? 'border-[#09090b] bg-[#09090b] text-white shadow-xs'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-rose-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-zinc-700">পরিমাণ:</span>
          <div className="flex items-center border border-zinc-300 rounded-xl bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 font-bold cursor-pointer"
            >
              -
            </button>
            <span className="px-3 text-xs font-black text-zinc-950">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 font-bold cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Visual Size Guide Modal */}
      <VisualSizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultTab={selectedProduct.category === 'kids' ? 'kids' : 'womens'}
      />
    </div>
  );
}
