'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '@/types';

interface CartItemListProps {
  items: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
}

export default function CartItemList({
  items,
  updateQuantity,
  removeFromCart
}: CartItemListProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs divide-y divide-slate-100">
        {items.map((item) => (
          <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-6 items-center">
            {/* Thumbnail */}
            <div className="relative w-20 sm:w-24 aspect-3/4 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <Link
                  href={`/product/${item.product.id}`}
                  className="font-bold text-sm sm:text-base text-slate-800 hover:text-rose-600 transition line-clamp-1"
                >
                  {item.product.name}
                </Link>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-rose-600 transition p-1"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                <span className="bg-slate-100 px-2 py-0.5 rounded">সাইজ: {item.selectedSize}</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">রং: {item.selectedColor}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 text-xs font-bold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Price */}
                <div className="text-right">
                  <span className="text-sm sm:text-base font-extrabold text-rose-950">
                    ৳{item.product.price * item.quantity}
                  </span>
                  {item.quantity > 1 && (
                    <span className="block text-[10px] text-slate-400">
                      (প্রতি পিস ৳{item.product.price})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-2">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>আরও পণ্য যুক্ত করুন</span>
        </Link>
      </div>
    </div>
  );
}
