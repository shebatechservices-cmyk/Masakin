import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto">
      <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
        <ShoppingBag className="w-10 h-10" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        আপনার কার্ট বর্তমানে খালি!
      </h2>
      <p className="text-sm text-slate-500 mb-8">
        আপনি এখনো কোনো পণ্য যোগ করেননি। আমাদের নতুন কালেকশন থেকে পোশাক নির্বাচন করুন।
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#09090b] hover:bg-zinc-900 text-white font-extrabold text-sm rounded-full transition shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>শপিং শুরু করুন</span>
      </Link>
    </div>
  );
}
