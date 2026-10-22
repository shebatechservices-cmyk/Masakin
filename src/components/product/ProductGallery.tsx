'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Video, Image as ImageIcon } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discountPercent: number;
  videoUrl?: string;
}

export default function ProductGallery({
  images,
  productName,
  discountPercent,
  videoUrl
}: ProductGalleryProps) {
  // If activeTab is a number, show images[activeTab]. If 'video', show video player
  const [activeTab, setActiveTab] = useState<number | 'video'>(0);

  return (
    <div className="space-y-4">
      {/* Main Display: Video or Image */}
      <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xs">
        {activeTab === 'video' && videoUrl ? (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full h-full bg-slate-100">
            <Image
              src={images[typeof activeTab === 'number' ? activeTab : 0] || images[0]}
              alt={productName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}

        {discountPercent > 0 && (
          <div className="absolute top-4 left-4 bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md z-10">
            {discountPercent}% বিশেষ ছাড়
          </div>
        )}
      </div>

      {/* Thumbnails row (Up to 3 images + 1 video thumbnail if available) */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {/* Image Thumbnails */}
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
              activeTab === idx
                ? 'border-rose-700 ring-2 ring-rose-500/20'
                : 'border-slate-200 opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`${productName} view ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}

        {/* Video Thumbnail Button */}
        {videoUrl && (
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition shrink-0 bg-zinc-900 text-white flex flex-col items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'video'
                ? 'border-rose-700 ring-2 ring-rose-500/30'
                : 'border-zinc-800 opacity-80 hover:opacity-100'
            }`}
          >
            <Video className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-[10px] font-black text-rose-300">ভিডিও লুক</span>
          </button>
        )}
      </div>
    </div>
  );
}
