'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Package, Search, Clock, CheckCircle, MapPin, Phone } from 'lucide-react';

export default function AccountPage() {
  const [trackId, setTrackId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('masakin_last_order');
      if (saved) {
        setTrackedOrder(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    if (!trackId.trim()) return;

    if (trackedOrder && trackedOrder.orderId?.toLowerCase() === trackId.trim().toLowerCase()) {
      // found
    } else {
      setSearchError('দুঃখিত, এই অর্ডার আইডিটি খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি লিখুন।');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            মাই অ্যাকাউন্ট ও অর্ডার ট্র্যাকিং
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            আপনার অর্ডারের বর্তমান অবস্থা জানুন এবং প্রোফাইল তথ্য দেখুন।
          </p>
        </div>

        {/* Order Tracker Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <h2 className="font-bold text-base text-slate-800 mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-rose-600" />
            <span>অর্ডার ট্র্যাক করুন</span>
          </h2>
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="আপনার অর্ডার আইডি লিখুন (যেমন: MSK-123456)"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm uppercase focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#09090b] hover:bg-zinc-900 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>ট্র্যাক করুন</span>
            </button>
          </form>
          {searchError && <p className="text-xs text-rose-600 mt-2">{searchError}</p>}
        </div>

        {/* Tracked Order Details */}
        {trackedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-500">অর্ডার আইডি</span>
                <h3 className="font-black text-lg text-rose-950">{trackedOrder.orderId}</h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                <CheckCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>প্রসেসিংয়ে আছে (Confirmed)</span>
              </div>
            </div>

            {/* Delivery Progress Bar */}
            <div className="py-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                <span className="text-rose-600">অর্ডার সম্পন্ন</span>
                <span className="text-rose-600">প্যাকেজিং চলছে</span>
                <span className="text-slate-400">ডেলিভারির পথে</span>
                <span className="text-slate-400">ডেলিভার্ড</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-600 h-full w-1/2 rounded-full transition-all" />
              </div>
            </div>

            {/* Items and Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs sm:text-sm">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">অর্ডারকৃত পণ্য:</h4>
                <div className="space-y-1 text-slate-600">
                  {trackedOrder.items?.map((it: any) => (
                    <div key={it.id} className="flex justify-between">
                      <span>{it.product.name} ({it.selectedSize}) x{it.quantity}</span>
                      <strong className="text-slate-900">৳{it.product.price * it.quantity}</strong>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
                    <span>সর্বমোট পরিশোধযোগ্য:</span>
                    <span className="text-rose-700">৳{trackedOrder.total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">ডেলিভারি ঠিকানা:</h4>
                <div className="text-slate-600 space-y-1 text-xs">
                  <p><strong>প্রাপক:</strong> {trackedOrder.customer?.fullName}</p>
                  <p><strong>মোবাইল:</strong> {trackedOrder.customer?.phone}</p>
                  <p><strong>ঠিকানা:</strong> {trackedOrder.customer?.address}, {trackedOrder.customer?.district}</p>
                  <p><strong>পেমেন্ট:</strong> {trackedOrder.customer?.paymentMethod?.toUpperCase()}</p>
                </div>
              </div>
            </div>

          </div>
        )}

        <div className="text-center">
          <Link
            href="/shop"
            className="text-xs font-bold text-rose-700 hover:text-rose-950"
          >
            ← শপিং ক্যাটালগে ফিরে যান
          </Link>
        </div>

      </div>
    </div>
  );
}
