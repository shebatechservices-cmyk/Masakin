'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import ProductHighlightToggles from './ProductHighlightToggles';

interface ProductFormModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
}

export default function ProductFormModal({
  product,
  isOpen,
  onClose,
  onSave
}: ProductFormModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState<ProductCategory>(product?.category || 'womens');
  const [price, setPrice] = useState(product?.price || 1500);
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice || 2000);
  const [stockCount, setStockCount] = useState(product?.stockCount || 20);
  const [imageUrl, setImageUrl] = useState(product?.images[0] || '');
  const [sizes, setSizes] = useState(product?.sizes.join(', ') || '38, 40, 42');
  const [featured, setFeatured] = useState(product?.featured || false);
  const [bestseller, setBestseller] = useState(product?.bestseller || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPercent = Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

    onSave({
      id: product?.id || `masakin-custom-${Date.now()}`,
      name,
      category,
      categoryName: category === 'womens' ? 'নারীদের রেডিমেড থ্রি-পিস' : category === 'kids' ? 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস' : 'রেডিমেড কালেকশন',
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercent,
      stockCount: Number(stockCount),
      inStock: Number(stockCount) > 0,
      images: imageUrl ? [imageUrl] : [product?.images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'],
      sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
      featured,
      bestseller
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
          <h3 className="font-extrabold text-base text-zinc-900">
            {product ? 'পোশাকের তথ্য এডিট করুন' : 'নতুন পোশাক যুক্ত করুন'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-zinc-700 mb-1">পোশাকের নাম *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: নারীদের রেডিমেড অর্গানজা থ্রি-পিস"
              className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">ক্যাটাগরি</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs focus:bg-white focus:outline-none"
              >
                <option value="womens">নারীদের রেডিমেড পোশাক</option>
                <option value="kids">বাচ্চাদের ফ্রক ও ড্রেস</option>
                <option value="sharee">জামদানি ও শাড়ি</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">স্টক পরিমাণ (পিস)</label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">বিক্রয় মূল্য (৳) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs font-bold text-[#e11d48]"
              />
            </div>
            <div>
              <label className="block font-bold text-zinc-700 mb-1">মূল মূল্য / কাটা মূল্য (৳)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs text-zinc-500 line-through"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">ছবির লিঙ্ক (Image URL)</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs"
              />
              <button
                type="button"
                onClick={() => setImageUrl('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80')}
                className="px-2.5 py-1 text-xs border border-zinc-200 rounded-xl text-zinc-600 hover:bg-zinc-100 cursor-pointer"
              >
                ডেমো
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">সাইজ সমূহ (কমা দিয়ে লিখুন)</label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              placeholder="38, 40, 42 অথবা ১-২ বছর, ৩-৪ বছর"
              className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs"
            />
          </div>

          <ProductHighlightToggles
            featured={featured}
            bestseller={bestseller}
            onFeaturedChange={setFeatured}
            onBestsellerChange={setBestseller}
          />

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
