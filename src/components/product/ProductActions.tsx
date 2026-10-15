'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Ruler
} from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import SizeGuideModal from './SizeGuideModal';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappOrderUrl = `https://wa.me/8801712345678?text=${encodeURIComponent(
    `হ্যালো মাসাকিন গার্মেন্টস! আমি এই পোশাকটি সরাসরি অর্ডার করতে চাই:\n\nপণ্য: ${product.name}\nসাইজ: ${selectedSize}\nকালার: ${selectedColor}\nপরিমাণ: ${quantity}\nমূল্য: ৳${product.price * quantity}\nলিঙ্ক: ${currentUrl}`
  )}`;

  return (
    <div>
      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div className="py-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-700">
              রঙ নির্বাচন করুন: <strong className="text-rose-700">{selectedColor}</strong>
            </span>
          </div>
          <div className="flex gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                  selectedColor === color.name
                    ? 'border-rose-700 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="py-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-700">
            সাইজ নির্বাচন করুন: <strong className="text-rose-700">{selectedSize}</strong>
          </span>
          <button
            onClick={() => setIsSizeChartOpen(true)}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 transition"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>সাইজ চার্ট দেখুন</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-[48px] py-2 px-3 rounded-xl border text-xs font-bold transition ${
                selectedSize === size
                  ? 'border-rose-700 bg-[#09090b] text-white shadow-xs'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="py-3 flex items-center gap-4">
        <span className="text-xs font-bold text-slate-700">পরিমাণ:</span>
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold"
          >
            -
          </button>
          <span className="px-3 text-sm font-bold text-slate-800">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2 border-zinc-900 transition ${
              isAdded
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white hover:bg-rose-50 text-rose-700'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>কার্টে যোগ হয়েছে</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>কার্টে যোগ করুন</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[#09090b] hover:bg-zinc-900 text-white shadow-md transition"
          >
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>এখনই অর্ডার করুন</span>
          </button>
        </div>

        <a
          href={whatsappOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white transition shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন</span>
        </a>
      </div>

      {/* Micro Guarantees */}
      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600">
        <div className="flex flex-col items-center">
          <Truck className="w-4 h-4 text-rose-600 mb-1" />
          <span>ক্যাশ অন ডেলিভারি</span>
        </div>
        <div className="flex flex-col items-center">
          <RotateCcw className="w-4 h-4 text-rose-600 mb-1" />
          <span>৭ দিনে সাইজ বদল</span>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-4 h-4 text-rose-600 mb-1" />
          <span>১০০% আসল পোশাক</span>
        </div>
      </div>

      {/* Size Chart Modal */}
      <SizeGuideModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />
    </div>
  );
}
