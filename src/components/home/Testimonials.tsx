import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/products';

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-rose-600 font-bold text-xs uppercase tracking-widest block mb-2">
            আসল গ্রাহক রিভিউ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            আমাদের সম্মানিত কাস্টমারদের মতামত
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            প্রতিটি রিভিউ সরাসরি আমাদের ভেরিফায়েড ক্রেতাদের অভিজ্ঞতা থেকে সংগৃহীত।
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 rotate-180" />
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* User info */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {review.userName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {review.userName}
                    </h4>
                    {review.verified && (
                      <span title="ভেরিফায়েড ক্রেতা">
                        <CheckCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {review.userLocation} • {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Score Bar */}
        <div className="mt-12 max-w-xl mx-auto bg-rose-50 rounded-2xl p-4 sm:p-5 border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-rose-950">৪.৯</span>
            <div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-medium">
                ১৫০০+ সন্তুষ্ট কাস্টমার রেটিং
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-white px-3 py-1.5 rounded-full border border-rose-200 shadow-2xs">
            ১০০% নিরাপদ কেনাকাটা
          </span>
        </div>

      </div>
    </section>
  );
}
