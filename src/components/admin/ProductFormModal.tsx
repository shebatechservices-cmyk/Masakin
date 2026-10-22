'use client';

import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Video, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import ProductHighlightToggles from './ProductHighlightToggles';

// Auto-convert Google Drive shareable link to direct image stream URL
function convertGoogleDriveLink(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  
  // Patterns like: https://drive.google.com/file/d/FILE_ID/view... or id=FILE_ID
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    return `https://lh3.googleusercontent.com/d/${matchFileD[1]}`;
  }

  const matchId = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    return `https://lh3.googleusercontent.com/d/${matchId[1]}`;
  }

  return trimmed;
}

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
  const [images, setImages] = useState<string[]>([
    product?.images?.[0] || '',
    product?.images?.[1] || '',
    product?.images?.[2] || ''
  ]);

  // Short Video state
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl || '');

  const [sizes, setSizes] = useState(product?.sizes.join(', ') || '38, 40, 42');
  const [featured, setFeatured] = useState(product?.featured || false);
  const [bestseller, setBestseller] = useState(product?.bestseller || false);

  // Multi-image file selection (select up to 3 images at once)
  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files).slice(0, 3);
    const newImages = [...images];

    fileList.forEach((file, idx) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} ফাইলটি ৫MB এর বেশি, তাই বাদ দেওয়া হলো।`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          setImages((prev) => {
            const copy = [...prev];
            copy[idx] = res;
            return copy;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Video file upload handler
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('ভিডিওর সাইজ সর্বোচ্চ ১৫MB হতে পারে!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) setVideoUrl(res);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (index: number, val: string) => {
    const converted = convertGoogleDriveLink(val);
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = converted;
      return updated;
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = '';
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPercent = Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

    // Filter valid images (at least 1 image is kept)
    const validImages = images
      .map((img) => convertGoogleDriveLink(img))
      .filter((img) => img.trim() !== '');

    const finalImages = validImages.length > 0 
      ? validImages 
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
      videoUrl: convertGoogleDriveLink(videoUrl).trim() || undefined,
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

          {/* 3 IMAGES AT ONCE - Upload & Google Drive Auto-convert */}
          <div className="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-200/70 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-rose-950 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-rose-600" />
                <span>৩টি ছবি (এক সাথে ৩টি সিলেক্ট করুন অথবা ড্রাইভ লিঙ্ক দিন)</span>
              </span>
              
              {/* 1-Click 3-Images Batch Upload Button */}
              <label className="px-3 py-1.5 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>এক সাথে ৩টি ছবি আপলোড</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleMultipleFiles}
                />
              </label>
            </div>

            <p className="text-[10px] text-zinc-500">
              * গুগল ড্রাইভের যে কোনো শেয়ার লিঙ্ক পেস্ট করলে সিস্টেম স্বয়ংক্রিয়ভাবে লাইভ ইমেজ লিঙ্কে রূপান্তর করবে।
            </p>

            {/* Image Inputs 1, 2, 3 */}
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="space-y-1 pt-1.5 border-t border-rose-100 first:border-0 first:pt-0">
                <div className="flex items-center justify-between text-[11px] font-bold text-zinc-700">
                  <span>
                    {idx === 0 ? 'ছবি ১ (মেইন কভার ছবি) *' : idx === 1 ? 'ছবি ২ (সাইড / ব্যাক ভিউ)' : 'ছবি ৩ (কাপড়ের নিখুঁত কাজ / ক্লোজ-আপ)'}
                  </span>
                  {images[idx] && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="text-rose-600 text-[10px] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> মুছুন
                    </button>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={images[idx]}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="গুগল ড্রাইভ বা ওয়েব ইমেজ লিঙ্ক পেস্ট করুন"
                    className="flex-1 px-3 py-1.5 border border-zinc-200 rounded-xl bg-white text-xs"
                  />
                  {images[idx] && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-rose-200 shrink-0 bg-white">
                      <img src={images[idx]} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Short Video Upload / Link Section */}
          <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-zinc-950 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#e11d48]" />
                <span>পোশাকের শর্ট ভিডিও (Short Video / Reel)</span>
              </span>
              <span className="text-[10px] text-zinc-500">গুগল ড্রাইভ লিঙ্ক বা MP4 ফাইল</span>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(convertGoogleDriveLink(e.target.value))}
                placeholder="গুগল ড্রাইভ বা ভিডিও লিঙ্ক পেস্ট করুন"
                className="flex-1 px-3 py-1.5 border border-zinc-200 rounded-xl bg-white text-xs"
              />
              <label className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-xl text-zinc-700 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>ভিডিও</span>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  className="hidden"
                  onChange={handleVideoUpload}
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

          {/* Highlight Toggles */}
          <ProductHighlightToggles
            featured={featured}
            bestseller={bestseller}
            onFeaturedChange={setFeatured}
            onBestsellerChange={setBestseller}
          />

          {/* Action Buttons */}
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
