'use client';

import React from 'react';
import { CheckCircle2, MessageCircle, X, PackageCheck } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

interface OrderSuccessModalProps {
  orderId: string;
  total: number;
  customerName: string;
  onClose: () => void;
}

export default function OrderSuccessModal({
  orderId,
  total,
  customerName,
  onClose
}: OrderSuccessModalProps) {
  const { settings } = useShopData();
  const whatsappMsg = `হ্যালো ${settings.storeName}, আমি মাত্র হোমপেইজ থেকে অর্ডার সম্পন্ন করেছি।\nঅর্ডার আইডি: #${orderId}\nমোট টাকা: ৳${total}\nদয়া করে কনফার্ম করুন।`;
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-200 text-center animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-white p-0.5 border border-rose-200 shadow-xs overflow-hidden">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-1">
          ধন্যবাদ {customerName}!
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। আমাদের প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।
        </p>

        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 mb-6 inline-flex items-center gap-2 text-xs font-bold text-zinc-950">
          <PackageCheck className="w-4 h-4 text-rose-600" />
          <span>অর্ডার ট্র্যাকিং আইডি:</span>
          <span className="font-mono font-black text-sm">{orderId}</span>
        </div>

        <div className="space-y-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>হোয়াটসঅ্যাপে তাৎক্ষণিক কনফার্ম করুন</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition"
          >
            ওয়েবসাইট ব্রাউজ চালিয়ে যান
          </button>
        </div>
      </div>
    </div>
  );
}
