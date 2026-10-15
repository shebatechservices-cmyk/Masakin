'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg font-bold text-slate-800">
                আপনার শপিং ব্যাগ ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-full transition"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery threshold banner */}
          <div className="bg-rose-50 px-4 py-2 text-xs text-rose-700 font-medium border-b border-rose-100 text-center">
            {subtotal >= 2500 ? (
              <span className="text-rose-600 font-bold">🎉 অভিনন্দন! আপনার অর্ডারে ফ্রি ডেলিভারি যুক্ত হয়েছে!</span>
            ) : (
              <span>
                আর <strong>৳{2500 - subtotal}</strong> টাকার কেনাকাটা করলেই পাচ্ছেন <strong>ফ্রি ডেলিভারি!</strong>
              </span>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-700 mb-1">
                  আপনার ব্যাগ বর্তমানে খালি
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  আমাদের নতুন কালেকশন থেকে আপনার পছন্দের পোশাক যুক্ত করুন।
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-rose-700 hover:bg-[#09090b] text-white rounded-full text-sm font-semibold transition shadow-sm"
                >
                  পণ্য ব্রাউজ করুন
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xs transition"
                >
                  {/* Image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden relative shrink-0 bg-slate-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 transition p-1"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap gap-2">
                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          সাইজ: {item.selectedSize}
                        </span>
                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          কালার: {item.selectedColor}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 bg-white rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:text-slate-800 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-700 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-slate-800 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-rose-700">
                          ৳{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout Button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3">
              <div className="flex justify-between text-base font-bold text-slate-900">
                <span>সর্বমোট (Subtotal)</span>
                <span className="text-rose-700 text-lg">৳{subtotal}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                * ডেলিভারি চার্জ চেকআউট পেইজে হিসাব করা হবে
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-2.5 text-center text-sm font-bold border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl transition"
                >
                  কার্ট পেইজ
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-2.5 text-center text-sm font-bold bg-rose-700 hover:bg-[#09090b] text-white rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <span>চেকআউট</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
