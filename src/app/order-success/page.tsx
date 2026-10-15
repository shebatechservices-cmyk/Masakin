'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, Home, ShoppingBag, Truck, Phone, PackageCheck } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('masakin_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const orderId = order?.orderId || orderIdParam || 'MSK-983412';

  const whatsappMessage = `হ্যালো মাসাকিন গার্মেন্টস, আমি মাত্র একটি অর্ডার সম্পন্ন করেছি।\nঅর্ডার আইডি: ${orderId}\nমোট টাকা: ৳${order?.total || ''}\nদয়া করে আমার অর্ডারটি কনফার্ম করুন।`;
  const whatsappUrl = `https://wa.me/8801712345678?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md text-center">
          
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            ধন্যবাদ! আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
            আমরা আপনার অর্ডারটি পেয়েছি। আমাদের প্রতিনিধি শীঘ্রই আপনার মোবাইল নম্বরে কল করে অর্ডারটি নিশ্চিত করবেন।
          </p>

          {/* Order ID Badge */}
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 px-4 py-2 rounded-2xl text-rose-950 font-bold text-sm sm:text-base mb-8">
            <PackageCheck className="w-5 h-5 text-rose-600" />
            <span>অর্ডার ট্র্যাকিং আইডি:</span>
            <span className="font-mono font-black text-zinc-950">{orderId}</span>
          </div>

          {/* Details breakdown if available */}
          {order && (
            <div className="text-left bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 mb-8 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">
                ডেলিভারি বিবরণী
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div>
                  <span className="text-slate-500 block text-xs">গ্রাহকের নাম:</span>
                  <strong className="text-slate-900">{order.customer?.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">মোবাইল নম্বর:</span>
                  <strong className="text-slate-900 font-mono">{order.customer?.phone}</strong>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-xs">ঠিকানা ও জেলা:</span>
                  <span className="text-slate-900">{order.customer?.address}, {order.customer?.district}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">পেমেন্ট মেথড:</span>
                  <span className="font-bold text-rose-700 uppercase">
                    {order.customer?.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.customer?.paymentMethod}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">সর্বমোট প্রদেয় মূল্য:</span>
                  <strong className="text-rose-950 font-black text-base">৳{order.total}</strong>
                </div>
              </div>

              {/* Order Items List */}
              {order.items && order.items.length > 0 && (
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs text-slate-500 block mb-2 font-semibold">অর্ডারের পণ্যসমূহ:</span>
                  <div className="space-y-2">
                    {order.items.map((it: any) => (
                      <div key={it.id} className="flex justify-between items-center text-xs">
                        <span className="text-slate-800 font-medium">
                          {it.product.name} ({it.selectedSize}, {it.quantity}টি)
                        </span>
                        <span className="font-bold text-slate-900">
                          ৳{it.product.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>হোয়াটসঅ্যাপে তাৎক্ষণিক কনফার্ম করুন</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
            >
              <Home className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>আরও শপিং করুন</span>
            </Link>
          </div>

          {/* Helpline Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Phone className="w-3.5 h-3.5 text-rose-600" />
            <span>কোনো জিজ্ঞাসা থাকলে কল করুন হটলাইনে: <strong>01712-345678</strong></span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">অর্ডার লোড হচ্ছে...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
