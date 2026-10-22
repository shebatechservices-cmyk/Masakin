'use client';

import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Video, Upload, Link as LinkIcon, Trash2 } from 'lucide-react';
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
  
  // 3 Images state
  const [image1, setImage1] = useState(product?.images?.[0] || '');
  const [image2, setImage2] = useState(product?.images?.[1] || '');
  const [image3, setImage3] = useState(product?.images?.[2] || '');

  // Short Video state
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl || '');

  const [sizes, setSizes] = useState(product?.sizes.join(', ') || '38, 40, 42');
  const [featured, setFeatured] = useState(product?.featured || false);
  const [bestseller, setBestseller] = useState(product?.bestseller || false);

  // File upload helper for local preview / base64
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void,
    maxSizeMB = 5
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`ফাইলের সাইজ সর্বোচ্চ ${maxSizeMB}MB হতে পারে!`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) setter(res);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPercent = Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

    // Filter valid images (at least 1 is required)
    const activeImages = [image1, image2, image3].filter((img) => img.trim() !== '');
    const finalImages = activeImages.length > 0 
      ? activeImages 
      : ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'];

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
      images: finalImages,
      videoUrl: videoUrl.trim() || undefined,
      sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
      featured,
      bestseller
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl z-10 border border-zinc-200 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
          <h3 className="font-extrabold text-base text-zinc-900">
            {product ? 'পোশাকের তথ্য এডিট করুন' : 'নতুন পোশাক যুক্ত করুন'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Product Name */}
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

          {/* Category & Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">ক্যাটাগরি</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs focus:bg-white focus:outline-none cursor-pointer"
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

          {/* Pricing */}
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

          {/* 3 Images Upload / URL Section */}
          <div className="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-rose-950 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-rose-600" />
                <span>৩টি প্রোডাক্ট ছবি (ফাইল আপলোড বা লিঙ্ক)</span>
              </span>
              <span className="text-[10px] text-zinc-500">৩টি অ্যাঙ্গেলের ছবি দিন</span>
            </div>

            {/* Image 1 (Main) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-700">
                <span>ছবি ১ (প্রধান ছবি - মেইন কভার) *</span>
                {image1 && (
                  <button type="button" onClick={() => setImage1('')} className="text-rose-600 text-[10px] hover:underline flex items-center gap-0.5">
                    <Trash2 className="w-3 h-3" /> মুছুন
                  </button>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                  placeholder="ইমেজ লিঙ্ক পেস্ট করুন অথবা ফাইল আপলোড করুন"
                  className="flex-1 px-3 py-1.5 border border-zinc-200 rounded-xl bg-white text-xs"
                />
                <label className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl text-zinc-700 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setImage1)}
                  />
                </label>
              </div>
              {image1 && (
                <div className="w-12 h-14 rounded-lg overflow-hidden border border-rose-200 mt-1 relative">
                  <img src={image1} alt="Preview 1" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Image 2 */}
            <div className="space-y-1 pt-1 border-t border-rose-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-700">
                <span>ছবি ২ (পার্শ্ব বা পেছন ভিউ)</span>
                {image2 && (
                  <button type="button" onClick={() => setImage2('')} className="text-rose-600 text-[10px] hover:underline flex items-center gap-0.5">
                    <Trash2 className="w-3 h-3" /> মুছুন
                  </button>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  placeholder="ইমেজ লিঙ্ক পেস্ট করুন বা ফাইল আপলোড করুন"
                  className="flex-1 px-3 py-1.5 border border-zinc-200 rounded-xl bg-white text-xs"
                />
                <label className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl text-zinc-700 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setImage2)}
                  />
                </label>
              </div>
              {image2 && (
                <div className="w-12 h-14 rounded-lg overflow-hidden border border-rose-200 mt-1 relative">
                  <img src={image2} alt="Preview 2" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Image 3 */}
            <div className="space-y-1 pt-1 border-t border-rose-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-700">
                <span>ছবি ৩ (ফেব্রিক / নিখুঁত কারুকাজ ভিউ)</span>
                {image3 && (
                  <button type="button" onClick={() => setImage3('')} className="text-rose-600 text-[10px] hover:underline flex items-center gap-0.5">
                    <Trash2 className="w-3 h-3" /> মুছুন
                  </button>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                  placeholder="ইমেজ লিঙ্ক পেস্ট করুন বা ফাইল আপলোড করুন"
                  className="flex-1 px-3 py-1.5 border border-zinc-200 rounded-xl bg-white text-xs"
                />
                <label className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl text-zinc-700 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setImage3)}
                  />
                </label>
              </div>
              {image3 && (
                <div className="w-12 h-14 rounded-lg overflow-hidden border border-rose-200 mt-1 relative">
                  <img src={image3} alt="Preview 3" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Short Video Upload / Link Section */}
          <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-zinc-950 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#e11d48]" />
                <span>পোশাকের শর্ট ভিডিও (Short Video / Reel)</span>
              </span>
              <span className="text-[10px] text-zinc-500">MP4 ফাইল বা সরাসরি লিঙ্ক</span>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="ভিডিও লিঙ্ক পেস্ট করুন বা MP4 ফাইল আপলোড করুন"
                className="flex-1 px-3 py-1.5 border border-zinc-200 rounded-xl bg-white text-xs"
              />
              <label className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl text-zinc-700 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>ভিডিও</span>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, setVideoUrl, 15)}
                />
              </label>
            </div>

            {videoUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-zinc-300 bg-black aspect-video max-w-[200px]">
                <video src={videoUrl} controls className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Sizes */}
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

          {/* Trending & Bestseller Toggles */}
          <ProductHighlightToggles
            featured={featured}
            bestseller={bestseller}
            onFeaturedChange={setFeatured}
            onBestsellerChange={setBestseller}
          />

          {/* Actions */}
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
