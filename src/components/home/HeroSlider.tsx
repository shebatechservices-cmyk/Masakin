'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'মহিলাদের রেডিমেড কালেকশন ২০২৬',
    title: 'নারীদের রেডিমেড থ্রি-পিস ও কুর্তিতে সেরা আভিজাত্য',
    subtitle: '১০০% সুতি, অর্গানজা ও জর্জেটের প্রিমিয়াম রেডি-টু-ওয়্যার ড্রেস। নিখুঁত সাইজ ও আধুনিক ডিজাইনে নিজেকে সাজিয়ে নিন।',
    ctaText: 'এখনই অর্ডার করুন',
    ctaLink: '/#order-form',
    secondaryText: 'সব ড্রেস দেখুন',
    secondaryLink: '/shop?category=womens',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
    discountBadge: '২৫% পর্যন্ত বিশেষ ছাড়'
  },
  {
    id: 2,
    tag: 'কিডস ফেস্টিভ ও পার্টি কালেকশন',
    title: 'বাচ্চাদের রেডিমেড কিউট ফ্রক ও বেবি ড্রেস',
    subtitle: 'কোমল ও নরম সুতি কাপড়ে তৈরি আরামদায়ক বেবি ফ্রক ও বয়েজ ড্রেস। আপনার সোনামণির উৎসবের সেরা পছন্দ।',
    ctaText: 'বাচ্চাদের পোশাক',
    ctaLink: '/shop?category=kids',
    secondaryText: '১-ক্লিকে অর্ডার',
    secondaryLink: '/#order-form',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=80',
    discountBadge: 'কুপনে অতিরিক্ত ১০% ছাড়'
  },
  {
    id: 3,
    tag: 'ঐতিহ্যবাহী জামদানি ও পার্টি শাড়ি কালেকশন',
    title: 'এক্সক্লুসিভ জামদানি, সিল্ক ও জমকালো পার্টি শাড়ি',
    subtitle: 'আভিজাত্য ও ঐতিহ্যের সেরা কম্বিনেশন। বিয়ের উৎসব ও পার্টিতে নিজেকে সাজান প্রিমিয়াম জামদানিতে।',
    ctaText: 'শাড়ি কালেকশন',
    ctaLink: '/shop?category=sharee',
    secondaryText: '১-ক্লিকে অর্ডার',
    secondaryLink: '/#order-form',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
    discountBadge: 'সারা দেশে ক্যাশ অন ডেলিভারি'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#09090b] via-[#18181b] to-[#09090b] text-white border-b border-zinc-800">
      {/* Background Decorative Rose and Dark Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e11d48]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#be123c]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content (Left) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-semibold backdrop-blur-xs shadow-md">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>{slide.tag}</span>
              <span className="bg-[#e11d48] text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                {slide.discountBadge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              {slide.title}
            </h1>

            {/* Subtext */}
            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {slide.subtitle}
            </p>

            {/* CTA Buttons (Vibrant Rose + Pure Black / White Border) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={slide.ctaLink}
                className="w-full sm:w-auto px-8 py-4 bg-[#e11d48] hover:bg-[#be123c] text-white font-black rounded-2xl shadow-xl shadow-rose-950/50 hover:shadow-rose-600/40 transition-all flex items-center justify-center gap-2.5 text-base group active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={slide.secondaryLink}
                className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-xs transition text-base text-center"
              >
                {slide.secondaryText}
              </Link>
            </div>

            {/* Trust Bar */}
            <div className="pt-6 border-t border-zinc-800 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-zinc-300 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-rose-400 shrink-0" />
                <span>ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                <span>১০০% কোয়ালিটি গ্যারান্টি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
                <span>৭ দিনে সাইজ বদল</span>
              </div>
            </div>
          </div>

          {/* Visual (Right) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden border-2 border-rose-500/30 shadow-2xl shadow-rose-950/40 bg-zinc-900">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover transform transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black text-rose-400 uppercase tracking-widest block">
                      লিমিটেড রেডিমেড স্টক
                    </span>
                    <h4 className="text-white font-bold text-sm">প্রিমিয়াম কালেকশন</h4>
                  </div>
                  <Link
                    href="/#order-form"
                    className="text-xs bg-[#e11d48] hover:bg-[#be123c] text-white font-black px-3.5 py-2 rounded-xl transition shadow"
                  >
                    অর্ডার করুন
                  </Link>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                  className="p-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                  aria-label="পূর্ববর্তী স্লাইড"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'w-8 bg-[#e11d48]' : 'w-2.5 bg-zinc-700'
                      }`}
                      aria-label={`স্লাইড ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="p-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                  aria-label="পরবর্তী স্লাইড"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
