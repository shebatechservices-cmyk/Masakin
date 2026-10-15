'use client';

import React from 'react';

interface ProductHighlightTogglesProps {
  featured: boolean;
  bestseller: boolean;
  onFeaturedChange: (val: boolean) => void;
  onBestsellerChange: (val: boolean) => void;
}

export default function ProductHighlightToggles({
  featured,
  bestseller,
  onFeaturedChange,
  onBestsellerChange
}: ProductHighlightTogglesProps) {
  return (
    <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200/80 space-y-2">
      <span className="font-bold text-rose-950 block text-xs">
        সোশ্যাল মিডিয়া হাইলাইট ও ট্রেন্ডিং:
      </span>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => onFeaturedChange(e.target.checked)}
          className="accent-[#e11d48] w-4 h-4"
        />
        <span className="text-xs font-semibold text-zinc-900">
          🔥 টিকটক/ফেসবুক ট্রেন্ডিং ব্যাজ হিসেবে দেখান
        </span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={(e) => onBestsellerChange(e.target.checked)}
          className="accent-[#e11d48] w-4 h-4"
        />
        <span className="text-xs font-semibold text-zinc-900">
          ⭐ হোমপেজ বেস্টসেলার হিসেবে হাইলাইট করুন
        </span>
      </label>
    </div>
  );
}
