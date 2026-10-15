'use client';

import React, { useState } from 'react';
import { Mail, Check, Gift, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [contact, setContact] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#09090b] to-zinc-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          
          {/* Subtle glow */}
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
              <Gift className="w-3.5 h-3.5" />
              <span>প্রথম অর্ডারে বিশেষ উপহার</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              সাবস্ক্রাইব করুন ও পান ১০% ডিসকাউন্ট ভাউচার
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              আপনার ইমেইল বা মোবাইল নাম্বার দিয়ে যুক্ত থাকুন। নতুন কালেকশন প্রকাশ, প্রাইভেট ফ্ল্যাশ সেল এবং ঈদ অফারের আপডেট সবার আগে পান।
            </p>

            {isSubscribed ? (
              <div className="bg-[#09090b]/80 border border-rose-400/40 rounded-2xl p-4 text-center animate-in fade-in">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 text-white mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">ধন্যবাদ! আপনি সফলভাবে যুক্ত হয়েছেন।</h4>
                <p className="text-xs text-rose-200 mt-1">
                  আপনার কুপন কোড: <strong className="text-amber-300 font-mono">MASAKIN10</strong> (চেকআউটে ব্যবহার করুন)
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="আপনার মোবাইল নম্বর বা ইমেইল লিখুন..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
                >
                  <span>যুক্ত হন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <span className="block text-[11px] text-slate-400 pt-2">
              🔒 আমরা স্প্যাম করি না। যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
