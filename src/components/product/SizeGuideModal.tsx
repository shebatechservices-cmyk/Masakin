'use client';

import React from 'react';
import { Ruler, X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl z-10 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base text-slate-900">সাইজ গাইড চার্ট (ইঞ্চিতে)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">সাইজ</th>
                <th className="py-2.5 px-3">বুক (Chest)</th>
                <th className="py-2.5 px-3">দৈর্ঘ্য (Length)</th>
                <th className="py-2.5 px-3">হাতা (Sleeve)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-700">৩৮ (M)</td>
                <td className="py-2.5 px-3">৪০ ইঞ্চি</td>
                <td className="py-2.5 px-3">৪০ ইঞ্চি</td>
                <td className="py-2.5 px-3">২৪ ইঞ্চি</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-700">৪০ (L)</td>
                <td className="py-2.5 px-3">৪২ ইঞ্চি</td>
                <td className="py-2.5 px-3">৪২ ইঞ্চি</td>
                <td className="py-2.5 px-3">২৫ ইঞ্চি</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-700">৪২ (XL)</td>
                <td className="py-2.5 px-3">৪৪ ইঞ্চি</td>
                <td className="py-2.5 px-3">৪৪ ইঞ্চি</td>
                <td className="py-2.5 px-3">২৫.৫ ইঞ্চি</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-700">৪৪ (XXL)</td>
                <td className="py-2.5 px-3">৪৬ ইঞ্চি</td>
                <td className="py-2.5 px-3">৪৬ ইঞ্চি</td>
                <td className="py-2.5 px-3">২৬ ইঞ্চি</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
          * সঠিক মাপের পোশাক পেতে আপনার রেগুলার ফিটিংসের সাথে মিলিয়ে নিন। কোনো বিভ্রান্তি থাকলে আমাদের হটলাইনে বা হোয়াটসঅ্যাপে যোগাযোগ করুন।
        </p>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 bg-[#09090b] text-white rounded-xl text-xs font-bold"
        >
          বন্ধ করুন
        </button>
      </div>
    </div>
  );
}
