'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discountPercent: number;
}

export default function ProductGallery({
  images,
  productName,
  discountPercent
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
        <Image
          src={images[selectedImage] || images[0]}
          alt={productName}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {discountPercent > 0 && (
          <div className="absolute top-4 left-4 bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
            {discountPercent}% বিশেষ ছাড়
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition ${
                selectedImage === idx
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
        </div>
      )}
    </div>
  );
}
