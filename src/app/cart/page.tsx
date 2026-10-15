'use client';

import React from 'react';
import { Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemList from '@/components/cart/CartItemList';
import CartSummaryCard from '@/components/cart/CartSummaryCard';

export default function CartPage() {
  const {
    items,
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    deliveryArea,
    setDeliveryArea,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            আপনার শপিং কার্ট ({items.length} টি আইটেম)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            অর্ডার নিশ্চিত করার আগে আপনার কার্টের পণ্য ও পরিমাণ পর্যালোচনা করুন।
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (Left) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free delivery alert banner */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-rose-950 font-medium">
                <Truck className="w-5 h-5 text-rose-600 shrink-0" />
                {subtotal >= 2500 ? (
                  <span>
                    🎉 <strong>অভিনন্দন!</strong> আপনার কার্টের মূল্য ২৫০০৳ অতিক্রম করায় আপনি পাচ্ছেন <strong>সম্পূর্ণ ফ্রি ডেলিভারি</strong>।
                  </span>
                ) : (
                  <span>
                    আর মাত্র <strong>৳{2500 - subtotal}</strong> টাকার কেনাকাটা করলেই উপভোগ করুন <strong>ফ্রি হোম ডেলিভারি!</strong>
                  </span>
                )}
              </div>

              <CartItemList
                items={items}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            </div>

            {/* Order Summary & Coupon (Right) */}
            <div className="lg:col-span-4">
              <CartSummaryCard
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                discount={discount}
                total={total}
                couponCode={couponCode}
                deliveryArea={deliveryArea}
                setDeliveryArea={setDeliveryArea}
                applyCoupon={applyCoupon}
                removeCoupon={removeCoupon}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
