'use client';

import React, { useState } from 'react';
import { X, Save, Plus, Video, Trash2, Link as LinkIcon } from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import ProductHighlightToggles from './ProductHighlightToggles';

// Auto-convert Google Drive shareable link to direct image stream URL
function convertGoogleDriveLink(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  
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

  // Active Link input popup modal/prompt for a slot
  const [activeLinkSlot, setActiveLinkSlot] = useState<number | 'video' | null>(null);
  const [linkInputValue, setLinkInputValue] = useState('');

  // Short Video state
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl || '');

  const [sizes, setSizes] = useState(product?.sizes.join(', ') || '38, 40, 42');
  const [featured, setFeatured] = useState(product?.featured || false);
  const [bestseller, setBestseller] = useState(product?.bestseller || false);

  // Single file upload for specific slot
  const handleSingleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('ছবির সাইজ সর্বোচ্চ ৫MB হতে পারে!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) {
        setImages((prev) => {
          const updated = [...prev];
          updated[index] = res;
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Video file upload handler
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      alert('ভিডিওর সাইজ সর্বোচ্চ ২০MB হতে পারে!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) setVideoUrl(res);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyLink = () => {
    const converted = convertGoogleDriveLink(linkInputValue);
    if (activeLinkSlot === 'video') {
      setVideoUrl(converted);
    } else if (typeof activeLinkSlot === 'number') {
      setImages((prev) => {
        const copy = [...prev];
        copy[activeLinkSlot] = converted;
        return copy;
      });
    }
    setActiveLinkSlot(null);
    setLinkInputValue('');
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
      
      {/* Compact Modal Box */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl z-10 border border-zinc-200 my-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 mb-3">
          <h3 className="font-extrabold text-sm sm:text-base text-zinc-900">
            {product ? 'পোশাক এডিট করুন' : 'নতুন পোশাক যুক্ত করুন'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* Product Name */}
          <div>
            <label className="block font-bold text-zinc-700 mb-1">পোশাকের নাম *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
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
                onChange={(e) => setStockCount(Number(e.target.value))}
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
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs font-bold text-[#e11d48]"
              />
            </div>
            <div>
              <label className="block font-bold text-zinc-700 mb-1">কাটা মূল্য (৳)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 text-xs text-zinc-500 line-through"
              />
            </div>
          </div>

          {/* COMPACT SIDE-BY-SIDE MEDIA ROW: 3 IMAGES + 1 SHORT VIDEO (4 BOXES IN 1 ROW) */}
          <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[11px] text-rose-950">
                মিডিয়া আপলোড (+ বাটনে ট্যাপ করুন)
              </span>
              <span className="text-[10px] text-zinc-500">৩টি ছবি + ১টি শর্ট ভিডিও</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Image 1 Box */}
              <div className="relative aspect-square rounded-2xl border-2 border-dashed border-rose-300 bg-white overflow-hidden flex flex-col items-center justify-center group hover:border-[#e11d48] transition">
                {images[0] ? (
                  <>
                    <img src={images[0]} alt="ছবি ১" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(0)}
                      className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-rose-600 transition"
                      title="মুছুন"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
                      প্রধান ছবি
                    </span>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#e11d48] flex items-center justify-center mb-1 group-hover:scale-110 transition">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-700">ছবি ১ *</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleSingleImageUpload(0, e)}
                    />
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => { setActiveLinkSlot(0); setLinkInputValue(images[0] || ''); }}
                  className="absolute bottom-1 left-1 p-0.5 bg-white/90 text-zinc-700 rounded border border-zinc-200 hover:text-rose-600 text-[8px] flex items-center gap-0.5"
                  title="লিংক দিন"
                >
                  <LinkIcon className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Image 2 Box */}
              <div className="relative aspect-square rounded-2xl border-2 border-dashed border-rose-300 bg-white overflow-hidden flex flex-col items-center justify-center group hover:border-[#e11d48] transition">
                {images[1] ? (
                  <>
                    <img src={images[1]} alt="ছবি ২" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(1)}
                      className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-rose-600 transition"
                      title="মুছুন"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
                      ছবি ২
                    </span>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#e11d48] flex items-center justify-center mb-1 group-hover:scale-110 transition">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-700">ছবি ২</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleSingleImageUpload(1, e)}
                    />
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => { setActiveLinkSlot(1); setLinkInputValue(images[1] || ''); }}
                  className="absolute bottom-1 left-1 p-0.5 bg-white/90 text-zinc-700 rounded border border-zinc-200 hover:text-rose-600 text-[8px] flex items-center gap-0.5"
                  title="লিংক দিন"
                >
                  <LinkIcon className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Image 3 Box */}
              <div className="relative aspect-square rounded-2xl border-2 border-dashed border-rose-300 bg-white overflow-hidden flex flex-col items-center justify-center group hover:border-[#e11d48] transition">
                {images[2] ? (
                  <>
                    <img src={images[2]} alt="ছবি ৩" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(2)}
                      className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-rose-600 transition"
                      title="মুছুন"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
                      ছবি ৩
                    </span>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-[#e11d48] flex items-center justify-center mb-1 group-hover:scale-110 transition">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-700">ছবি ৩</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleSingleImageUpload(2, e)}
                    />
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => { setActiveLinkSlot(2); setLinkInputValue(images[2] || ''); }}
                  className="absolute bottom-1 left-1 p-0.5 bg-white/90 text-zinc-700 rounded border border-zinc-200 hover:text-rose-600 text-[8px] flex items-center gap-0.5"
                  title="লিংক দিন"
                >
                  <LinkIcon className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Short Video Box */}
              <div className="relative aspect-square rounded-2xl border-2 border-dashed border-zinc-400 bg-zinc-900 overflow-hidden flex flex-col items-center justify-center group hover:border-[#e11d48] transition">
                {videoUrl ? (
                  <>
                    <video src={videoUrl} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setVideoUrl('')}
                      className="absolute top-1 right-1 p-1 bg-black/80 text-white rounded-full hover:bg-rose-600 transition"
                      title="ভিডিও মুছুন"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-0 inset-x-0 bg-rose-600 text-white text-[9px] font-bold text-center py-0.5">
                      ভিডিও যুক্ত
                    </span>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-1 text-center">
                    <div className="w-7 h-7 rounded-full bg-zinc-800 text-rose-400 flex items-center justify-center mb-1 group-hover:scale-110 transition">
                      <Video className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-white">+ ভিডিও</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => { setActiveLinkSlot('video'); setLinkInputValue(videoUrl || ''); }}
                  className="absolute bottom-1 left-1 p-0.5 bg-black/80 text-zinc-300 rounded border border-zinc-700 hover:text-rose-400 text-[8px] flex items-center gap-0.5"
                  title="ড্রাইভ/ওয়েব ভিডিও লিঙ্ক"
                >
                  <LinkIcon className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Optional Direct / Drive Link Prompt Overlay if user clicks the link button */}
          {activeLinkSlot !== null && (
            <div className="p-2.5 bg-white rounded-xl border border-rose-300 shadow-sm space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-between text-[11px] font-bold text-zinc-800">
                <span>
                  {activeLinkSlot === 'video' ? 'ভিডিও লিঙ্ক (গুগল ড্রাইভ বা ওয়েব URL):' : `ছবি ${Number(activeLinkSlot) + 1}-এর লিঙ্ক:`}
                </span>
                <button type="button" onClick={() => setActiveLinkSlot(null)} className="text-zinc-400 hover:text-zinc-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={linkInputValue}
                  onChange={(e) => setLinkInputValue(e.target.value)}
                  placeholder="গুগল ড্রাইভ শেয়ার লিঙ্ক পেস্ট করুন..."
                  className="flex-1 px-2.5 py-1 text-xs border border-zinc-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleApplyLink}
                  className="px-3 py-1 bg-[#e11d48] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  যুক্ত করুন
                </button>
              </div>
            </div>
          )}

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
