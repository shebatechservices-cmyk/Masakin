import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Users, Award, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-white p-0.5 border border-rose-200 shadow-xs overflow-hidden mx-auto mb-3">
            <img src="/images/logo.png" alt="মাসাকিন বস্ত্র বিতান" className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="text-[#e11d48] font-bold text-xs uppercase tracking-widest block">
            আমাদের গল্প ও পথচলা
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            মাসাকিন বস্ত্র বিতান — আভিজাত্য ও বিশ্বাসের অনন্য মেলবন্ধন
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            মাসাকিন বস্ত্র বিতান (MASAKIN Bastrabitan) যাত্রা শুরু করেছিল একটি স্পষ্ট উদ্দেশ্য নিয়ে—বাংলাদেশের প্রতিটি রুচিশীল পরিবারের কাছে আন্তর্জাতিক মানের আরামদায়ক ও ঐতিহ্যবাহী রেডিমেড পোশাক ন্যায্যমূল্যে পৌঁছে দেওয়া।
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
              alt="Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div className="space-y-4 text-sm text-zinc-600 leading-relaxed">
            <h2 className="text-xl font-bold text-zinc-900">নিখুঁত কারুকাজ ও উন্নত ফেব্রিক</h2>
            <p>
              আমরা প্রতিটি সুতা ও কাপড় ব্যক্তিগতভাবে বাছাই করি। আমাদের নারীদের থ্রি-পিস, ফ্রক এবং বাচ্চাদের পোশাকে ব্যবহার করা হয় ১০০% পিওর কটন, অর্গানজা, জর্জেট ও প্রিমিয়াম সিল্ক ব্লেন্ড।
            </p>
            <p>
              আমাদের সুদক্ষ কারিগরদের হাতের ছোঁয়ায় প্রতিটি পোশাকে ফুটে ওঠে নিখুঁত সেলাই ও নান্দনিক ডিজাইন। যেকোনো উৎসব বা সাধারণ দিনে মাসাকিন বস্ত্র বিতানের পোশাকে আপনি পাবেন সর্বোচ্চ স্বাচ্ছন্দ্য।
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs text-center">
            <div className="w-12 h-12 bg-rose-50 text-[#e11d48] rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 mb-1">অতুলনীয় মান</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">কোনো প্রকার আপোষহীন সর্বোচ্চ কোয়ালিটি কন্ট্রোল ও কালার ফাস্টনেস।</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs text-center">
            <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 mb-1">স্বচ্ছতা ও সততা</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">পণ্য দেখে মূল্য পরিশোধের সুবিধা এবং সহজ ৭ দিনের রিটার্ন পলিসি।</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs text-center">
            <div className="w-12 h-12 bg-rose-50 text-[#e11d48] rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-zinc-900 mb-1">গ্রাহক সন্তুষ্টি</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">সারা দেশের হাজারো গ্রাহকের ভালোবাসা ও বিশ্বাস আমাদের শক্তি।</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-full text-sm shadow-md transition"
          >
            <span>আমাদের কালেকশন ব্রাউজ করুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
