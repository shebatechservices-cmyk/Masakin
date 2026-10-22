'use client';

import React from 'react';
import { ProductCategory } from '@/types';

interface ProductBasicInfoFieldsProps {
  name: string;
  onChangeName: (val: string) => void;
  category: ProductCategory;
  onChangeCategory: (cat: ProductCategory) => void;
  price: number;
  onChangePrice: (val: number) => void;
  originalPrice: number;
  onChangeOriginalPrice: (val: number) => void;
  stockCount: number;
  onChangeStockCount: (val: number) => void;
  sizes: string;
  onChangeSizes: (val: string) => void;
}

export default function ProductBasicInfoFields({
  name,
  onChangeName,
  category,
  onChangeCategory,
  price,
  onChangePrice,
  originalPrice,
  onChangeOriginalPrice,
  stockCount,
  onChangeStockCount,
  sizes,
  onChangeSizes
}: ProductBasicInfoFieldsProps) {
  return (
    <div className="space-y-3 text-xs">
      {/* Product Name */}
      <div>
        <label className="block font-bold text-zinc-700 mb-1">পোশাকের নাম *</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="যেমন: নারীদের রেডিমেড অর্গানজা থ্রি-পিস"
          className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
        />
      </div>

      {/* Category & Stock in 1 Row */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block font-bold text-zinc-700 mb-1">ক্যাটাগরি</label>
          <select
            value={category}
            onChange={(e) => onChangeCategory(e.target.value as ProductCategory)}
            className="w-full px-2.5 py-2 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none cursor-pointer text-xs"
          >
            <option value="womens">নারীদের রেডিমেড পোশাক</option>
            <option value="kids">বাচ্চাদের ফ্রক ও ড্রেস</option>
            <option value="sharee">জামদানি ও শাড়ি</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-zinc-700 mb-1">স্টক (পিস)</label>
          <input
            type="number"
            value={stockCount}
            onChange={(e) => onChangeStockCount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs"
          />
        </div>
      </div>

      {/* Prices in 1 Row */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block font-bold text-zinc-700 mb-1">বিক্রয় মূল্য (৳) *</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => onChangePrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs font-bold text-[#e11d48]"
          />
        </div>
        <div>
          <label className="block font-bold text-zinc-700 mb-1">কাটা মূল্য (৳)</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => onChangeOriginalPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs text-zinc-500 line-through"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="block font-bold text-zinc-700 mb-1">সাইজ সমূহ (কমা দিয়ে লিখুন)</label>
        <input
          type="text"
          value={sizes}
          onChange={(e) => onChangeSizes(e.target.value)}
          placeholder="38, 40, 42 অথবা ১-২ বছর, ৩-৪ বছর"
          className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs"
        />
      </div>
    </div>
  );
}
