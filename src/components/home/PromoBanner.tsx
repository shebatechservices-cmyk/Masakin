'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Copy, Check, Sparkles, Tag, ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleApplyCode = () => {
    navigator.clipboard.writeText('MASAKIN10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    // Smooth scroll directly to the 1-page order form
    const orderSection = document.getElementById('order-form');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#09090b] via-zinc-900 to-rose-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-rose-700/50">
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Offer Text (Left) */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>সীমিত সময়ের মহাধামাকা অফার</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                সব পোশাকে ফ্ল্যাট <span className="text-amber-400">১০% অতিরিক্ত ছাড়!</span>
              </h2>

              <p className="text-rose-100 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                চেকআউটে কুপন কোড ব্যবহার করলেই পাচ্ছেন ইনস্ট্যান্ট ছাড়। সাথে থাকছে ২৫০০৳ এর অর্ডারে সারা দেশে সম্পূর্ণ ফ্রি ডেলিভারি সুবিধা!
              </p>

              {/* Countdown timer */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
                <div className="bg-zinc-950/80 border border-rose-600/40 rounded-xl px-3 py-1.5 text-center min-w-[48px]">
                  <span className="font-mono text-lg font-black text-amber-300">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-zinc-400">ঘণ্টা</span>
                </div>
                <span className="font-bold text-amber-300">:</span>
                <div className="bg-zinc-950/80 border border-rose-600/40 rounded-xl px-3 py-1.5 text-center min-w-[48px]">
                  <span className="font-mono text-lg font-black text-amber-300">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-zinc-400">মিনিট</span>
                </div>
                <span className="font-bold text-amber-300">:</span>
                <div className="bg-zinc-950/80 border border-rose-600/40 rounded-xl px-3 py-1.5 text-center min-w-[48px]">
                  <span className="font-mono text-lg font-black text-amber-300">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-zinc-400">সেকেন্ড</span>
                </div>
              </div>
            </div>

            {/* Coupon Box (Right) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-md text-center shadow-xl">
                <div className="flex items-center justify-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Tag className="w-4 h-4" />
                  <span>কুপন কোড</span>
                </div>

                <div className="flex items-center justify-between bg-slate-950/60 border border-dashed border-amber-400/60 rounded-xl p-3 my-3">
                  <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-amber-300 ml-2">
                    MASAKIN10
                  </span>
                  <button
                    onClick={handleApplyCode}
                    className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-rose-700" />
                        <span>কপি ও অ্যাপ্লাইড!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি ও অর্ডার করুন</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-rose-200 mt-2">
                  *যেকোনো পণ্যের অর্ডারে প্রযোজ্য। ক্লিক করলে সরাসরি অর্ডারে নিয়ে যাবে।
                </p>

                <div className="mt-5">
                  <Link
                    href="/#order-form"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <span>১-ক্লিকে অর্ডার ফর্ম</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
