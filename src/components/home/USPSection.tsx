import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Clock, CheckCircle2 } from 'lucide-react';

const USPS = [
  {
    icon: ShieldCheck,
    title: 'প্রিমিয়াম কোয়ালিটি গ্যারান্টি',
    description: '১০০% পরীক্ষিত ও উন্নত মানের সুতি, সিল্ক ও ফেব্রিক। প্রতিটি পোশাকে দীর্ঘস্থায়ী রঙের নিশ্চয়তা ও নিখুঁত সেলাই।',
    color: 'rose'
  },
  {
    icon: Truck,
    title: 'সারা দেশে ক্যাশ অন ডেলিভারি',
    description: 'আগে টাকা দেওয়ার কোনো ঝুঁকি নেই। বাংলাদেশের যেকোনো প্রান্তে পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করার পূর্ণ সুবিধা।',
    color: 'amber'
  },
  {
    icon: RotateCcw,
    title: '৭ দিনের সহজ রিটার্ন ও এক্সচেঞ্জ',
    description: 'সাইজে সমস্যা বা পছন্দ না হলে কোনো ঝামেলা ছাড়াই দ্রুত সাইজ পরিবর্তন বা সহজ রিটার্নের নিশ্চয়তা।',
    color: 'rose'
  },
  {
    icon: Clock,
    title: 'দ্রুততম হোম ডেলিভারি',
    description: 'ঢাকার ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে সর্বোচ্চ ২-৩ কার্যদিবসের মধ্যে এক্সপ্রেস ডেলিভারি।',
    color: 'amber'
  }
];

export default function USPSection() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-rose-600 font-bold text-xs uppercase tracking-widest block mb-2">
            আমাদের প্রতিশ্রুতি
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            কেন মাসাকিন বস্ত্র বিতান থেকে কেনাকাটা করবেন?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            অনলাইনে বিশ্বস্ততার সাথে কেনাকাটা করার জন্য আমরা গ্রাহকদের সর্বোচ্চ সেবা নিশ্চিত করি।
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {USPS.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-rose-300 transition-all duration-300 flex flex-col group"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-rose-700 transition-colors">
                  {usp.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed flex-1">
                  {usp.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-rose-600 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>মাসাকিন ভেরিফায়েড</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
