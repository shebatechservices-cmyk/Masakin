'use client';

import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface VisualSizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'womens' | 'kids';
}

export default function VisualSizeGuideModal({
  isOpen,
  onClose,
  defaultTab = 'womens'
}: VisualSizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'womens' | 'kids'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-zinc-950">
                পারফেক্ট সাইজ মেজারমেন্ট গাইড
              </h3>
              <p className="text-xs text-zinc-500">
                অর্ডার করার আগে আপনার সঠিক মাপ মিলিয়ে নিন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 my-5 p-1 bg-zinc-100 rounded-2xl">
          <button
            onClick={() => setActiveTab('womens')}
            className={`flex-1 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition cursor-pointer ${
              activeTab === 'womens'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            নারীদের রেডিমেড থ্রি-পিস
          </button>
          <button
            onClick={() => setActiveTab('kids')}
            className={`flex-1 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition cursor-pointer ${
              activeTab === 'kids'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস
          </button>
        </div>

        {/* Table Content */}
        {activeTab === 'womens' ? (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-[#09090b] text-white text-[11px] uppercase font-mono">
                  <tr>
                    <th className="py-2.5 px-3">সাইজ</th>
                    <th className="py-2.5 px-3">বডি (ইঞ্চি)</th>
                    <th className="py-2.5 px-3">কামিজ ঝুল</th>
                    <th className="py-2.5 px-3">হাতা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-medium text-zinc-800">
                  <tr className="hover:bg-rose-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">36 (S)</td>
                    <td className="py-2.5 px-3">৩৬"</td>
                    <td className="py-2.5 px-3">৪৪"</td>
                    <td className="py-2.5 px-3">১৭"</td>
                  </tr>
                  <tr className="hover:bg-rose-50/50 bg-zinc-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">38 (M)</td>
                    <td className="py-2.5 px-3">৩৮"</td>
                    <td className="py-2.5 px-3">৪৪" - ৪৫"</td>
                    <td className="py-2.5 px-3">১৭.৫"</td>
                  </tr>
                  <tr className="hover:bg-rose-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">40 (L)</td>
                    <td className="py-2.5 px-3">৪০"</td>
                    <td className="py-2.5 px-3">৪৫"</td>
                    <td className="py-2.5 px-3">১৮"</td>
                  </tr>
                  <tr className="hover:bg-rose-50/50 bg-zinc-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">42 (XL)</td>
                    <td className="py-2.5 px-3">৪২"</td>
                    <td className="py-2.5 px-3">৪৬"</td>
                    <td className="py-2.5 px-3">১৮"</td>
                  </tr>
                  <tr className="hover:bg-rose-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">44 (XXL)</td>
                    <td className="py-2.5 px-3">৪৪"</td>
                    <td className="py-2.5 px-3">৪৬"</td>
                    <td className="py-2.5 px-3">১৮.৫"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-zinc-500 italic">
              * কামিজের ভেতরের কটন ইনার ও সুতি সেলোয়ারের মাপ স্ট্যান্ডার্ড সাইজ অনুযায়ী পারফেক্ট ফিটিংস তৈরি করা।
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-[#09090b] text-white text-[11px] uppercase font-mono">
                  <tr>
                    <th className="py-2.5 px-3">বয়স</th>
                    <th className="py-2.5 px-3">বডি (ইঞ্চি)</th>
                    <th className="py-2.5 px-3">ফ্রক ঝুল</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-medium text-zinc-800">
                  <tr className="hover:bg-rose-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">১-২ বছর</td>
                    <td className="py-2.5 px-3">২০" - ২২"</td>
                    <td className="py-2.5 px-3">১৮" - ২০"</td>
                  </tr>
                  <tr className="hover:bg-rose-50/50 bg-zinc-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">৩-৪ বছর</td>
                    <td className="py-2.5 px-3">২৪"</td>
                    <td className="py-2.5 px-3">২২"</td>
                  </tr>
                  <tr className="hover:bg-rose-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">৫-৬ বছর</td>
                    <td className="py-2.5 px-3">২৬"</td>
                    <td className="py-2.5 px-3">২৪"</td>
                  </tr>
                  <tr className="hover:bg-rose-50/50 bg-zinc-50/50">
                    <td className="py-2.5 px-3 font-bold text-rose-600">৭-৮ বছর</td>
                    <td className="py-2.5 px-3">২৮"</td>
                    <td className="py-2.5 px-3">২৬"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-zinc-500 italic">
              * বাচ্চার স্বাস্থ্য বা উচ্চতা বেশি হলে এক সাইজ বড় নির্বাচন করার পরামর্শ দেওয়া হয়।
            </p>
          </div>
        )}

        {/* Guarantee Banner */}
        <div className="mt-5 p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-950 font-bold">
          <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
          <span>সাইজে কোনো সমস্যা হলে ৭ দিনের ভেতর সম্পূর্ণ ফ্রিতে সাইজ পরিবর্তন সুবিধা রয়েছে!</span>
        </div>
      </div>
    </div>
  );
}
