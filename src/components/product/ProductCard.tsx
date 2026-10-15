'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, product.colors[0]?.name, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const imageSrc = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-rose-300 hover:shadow-xl transition-all duration-300 flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.discountPercent > 0 && (
          <span className="bg-rose-600 text-white font-bold text-[11px] px-2 py-0.5 rounded-full shadow-xs">
            {product.discountPercent}% ছাড়
          </span>
        )}
        {product.bestseller && (
          <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
            বেস্টসেলার
          </span>
        )}
      </div>

      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block relative aspect-3/4 overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <span className="bg-white/95 text-slate-800 text-xs font-bold py-2 px-4 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-3.5 h-3.5 text-rose-600" />
            বিস্তারিত দেখুন
          </span>
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block mb-1">
            {product.categoryName}
          </span>

          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-bold text-slate-800 hover:text-rose-600 transition line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-rose-950">
              ৳{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          {/* Quick Size Selection Pill (if sizes > 1) */}
          {product.sizes.length > 1 && (
            <div className="flex items-center gap-1 mb-3 overflow-x-auto py-0.5 no-scrollbar">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(size);
                  }}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded border transition ${
                    selectedSize === size
                      ? 'border-rose-700 bg-rose-700 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-rose-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition duration-200 ${
              !product.inStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isAdded
                ? 'bg-rose-600 text-white'
                : 'bg-[#09090b] hover:bg-zinc-900 text-white shadow-xs hover:shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>যোগ হয়েছে!</span>
              </>
            ) : !product.inStock ? (
              <span>স্টক আউট</span>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>কার্টে যোগ করুন</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
