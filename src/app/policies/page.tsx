'use client';

import React, { useState } from 'react';
import { RotateCcw, Truck, HelpCircle, Shield } from 'lucide-react';
import FaqAccordion from '@/components/policies/FaqAccordion';
import PageGuard from '@/components/common/PageGuard';

type Tab = 'returns' | 'shipping' | 'faq' | 'privacy';

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('returns');

  return (
    <PageGuard path="/policies" pageTitle="সহায়তা ও পলিসি">
      <div className="bg-slate-50 min-h-screen py-12 sm:py-16">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            শর্তাবলী, পলিসি ও সচরাচর জিজ্ঞাসা
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            মাসাকিন গার্মেন্টসের সেবা, রিটার্ন এবং শিপিং সংক্রান্ত সমস্ত নিয়মকানুন।
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setActiveTab('returns')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'returns'
                ? 'bg-[#09090b] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>রিটার্ন ও এক্সচেঞ্জ</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'shipping'
                ? 'bg-[#09090b] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>শিপিং ও ডেলিভারি</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'faq'
                ? 'bg-[#09090b] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>সাধারণ জিজ্ঞাসা (FAQ)</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-[#09090b] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>প্রাইভেসি পলিসি</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mt-4">
          {/* Returns Tab */}
          {activeTab === 'returns' && (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                রিটার্ন ও সাইজ পরিবর্তনের নীতিমালা
              </h2>
              <p>
                আমরা প্রতিটি পোশাক গ্রাহকের কাছে পাঠানোর আগে সতর্কতার সাথে কিউসি (Quality Check) করি। তবুও সাইজ সমস্যা বা অপছন্দ হলে আমাদের সহজ শর্তে রিটার্ন সুবিধা প্রযোজ্য:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
                <li>পণ্য হাতে পাওয়ার ৭ (সাত) কার্যদিবসের মধ্যে রিটার্ন বা পরিবর্তনের জন্য আবেদন করতে হবে।</li>
                <li>পোশাকের মূল ট্যাগ অক্ষত থাকতে হবে এবং পোশাকটি অব্যবহৃত ও অবিকৃত অবস্থায় থাকতে হবে।</li>
                <li>সাইজ পরিবর্তনের ক্ষেত্রে ডেলিভারি চার্জ প্রযোজ্য হতে পারে (উৎপাদন ত্রুটি থাকলে সম্পূর্ণ ফ্রি)।</li>
                <li>রিটার্ন গ্রহণ করার ৩-৫ কার্যদিবসের মধ্যে টাকা গ্রাহকের বিকাশ/নগদ অ্যাকাউন্টে রিফান্ড করা হয়।</li>
              </ul>
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                ডেলিভারি ও শিপিং সংক্রান্ত তথ্য
              </h2>
              <p>
                মাসাকিন গার্মেন্টস সারা বাংলাদেশের ৬৪টি জেলায় দ্রুততম হোম ডেলিভারি নিশ্চিত করতে রেডএক্স, পেপারফ্লাই এবং স্টিডফাস্ট কুরিয়ারের সাথে চুক্তিবদ্ধ।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-rose-700 mb-1">ঢাকার অভ্যন্তরে ডেলিভারি:</h4>
                  <p className="text-xs text-slate-600">সময়: ২৪ থেকে ৪৮ ঘণ্টা</p>
                  <p className="text-xs text-slate-600">চার্জ: মাত্র ৬০৳</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-rose-700 mb-1">ঢাকার বাইরে সারা দেশে:</h4>
                  <p className="text-xs text-slate-600">সময়: ২ থেকে ৩ কার্যদিবস</p>
                  <p className="text-xs text-slate-600">চার্জ: ১২০৳</p>
                </div>
              </div>
              <p className="text-xs text-rose-600 font-bold pt-2">
                * যেকোনো অর্ডারে মোট মূল্য ২৫০০৳ বা তার বেশি হলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!
              </p>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && <FaqAccordion />}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                গ্রাহকের তথ্যের গোপনীয়তা রক্ষা (Privacy Policy)
              </h2>
              <p>
                মাসাকিন গার্মেন্টস আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা দিতে প্রতিশ্রুতিবদ্ধ।
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
                <li>আপনার নাম, ফোন নম্বর এবং ঠিকানা শুধুমাত্র পার্সেল ডেলিভারি ও অর্ডার কনফার্মেশনের জন্য ব্যবহৃত হয়।</li>
                <li>আমরা কখনোই কোনো তৃতীয় পক্ষের সাথে আপনার তথ্য ভাগ বা বিক্রি করি না।</li>
                <li>আপনার যেকোনো অনলাইন লেনদেন এনক্রিপ্ট করা ও সম্পূর্ণ সুরক্ষিত।</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </PageGuard>
);
}
