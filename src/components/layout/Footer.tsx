'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, ShieldCheck, Truck, RotateCcw, HeartHandshake, Mail, Globe } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

export default function Footer() {
  const { settings } = useShopData();

  return (
    <footer className="bg-[#09090b] text-zinc-300 pt-16 pb-24 md:pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-zinc-800 text-center">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <ShieldCheck className="w-8 h-8 text-[#e11d48] mb-2" />
            <h4 className="text-white font-bold text-sm">১০০% আসল পোশাক</h4>
            <p className="text-xs text-zinc-400 mt-1">সর্বোচ্চ মানসম্মত ফেব্রিক ও নিখুঁত সেলাই</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <Truck className="w-8 h-8 text-white mb-2" />
            <h4 className="text-white font-bold text-sm">দ্রুত ডেলিভারি</h4>
            <p className="text-xs text-zinc-400 mt-1">ঢাকাতে ২৪-৪৮ ঘণ্টা, সারা দেশে ২-৩ দিন</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <RotateCcw className="w-8 h-8 text-[#e11d48] mb-2" />
            <h4 className="text-white font-bold text-sm">সহজ রিটার্ন পলিসি</h4>
            <p className="text-xs text-zinc-400 mt-1">সাইজ বা কোয়ালিটি সমস্যায় ৭ দিনের রিটার্ন</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <HeartHandshake className="w-8 h-8 text-white mb-2" />
            <h4 className="text-white font-bold text-sm">ক্যাশ অন ডেলিভারি</h4>
            <p className="text-xs text-zinc-400 mt-1">পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা</p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white p-0.5 overflow-hidden shrink-0 shadow-sm border border-rose-200">
                <img
                  src={settings.logoUrl || '/images/logo.png'}
                  alt={settings.storeName}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  {settings.storeName}
                </span>
                <span className="text-[10px] font-bold text-[#e11d48] tracking-widest uppercase">
                  MASAKIN BASTRABITAN
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {settings.storeTagline}
            </p>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition">
                  হটলাইন: {settings.phone}
                </a>
              </div>
              {settings.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition">
                    {settings.email}
                  </a>
                </div>
              )}
              {settings.website && (
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-rose-400 shrink-0" />
                  <a href={`https://${settings.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    {settings.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">ক্যাটাগরি</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/shop?category=womens" className="hover:text-rose-400 transition">নারীদের থ্রি-পিস ও কুর্তি</Link></li>
              <li><Link href="/shop?category=kids" className="hover:text-rose-400 transition">কিডস ফেস্টিভ কালেকশন</Link></li>
              <li><Link href="/shop?category=sharee" className="hover:text-rose-400 transition">জামদানি ও সিল্ক শাড়ি</Link></li>
              <li><Link href="/shop" className="text-rose-400 hover:underline font-bold transition">সব পোশাক দেখুন</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">কোম্পানি</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/about" className="hover:text-rose-400 transition">আমাদের গল্প</Link></li>
              <li><Link href="/contact" className="hover:text-rose-400 transition">যোগাযোগ ও শোরুম</Link></li>
              <li><Link href="/shop" className="hover:text-rose-400 transition">নতুন কালেকশন</Link></li>
              <li><Link href="/admin" className="text-rose-400 font-bold hover:underline transition">শপ এডমিন পোর্টাল</Link></li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">সহায়তা ও পলিসি</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/policies" className="hover:text-rose-400 transition">রিটার্ন ও এক্সচেঞ্জ পলিসি</Link></li>
              <li><Link href="/policies" className="hover:text-rose-400 transition">ডেলিভারি ও শিপিং পলিসি</Link></li>
              <li><Link href="/policies" className="hover:text-rose-400 transition">প্রাইভেসি পলিসি</Link></li>
            </ul>
          </div>
        </div>

        {/* Payment Methods and Copyright */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center md:text-left">
            © {new Date().getFullYear()} {settings.storeName}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          
          {/* Payment Gateways / Logos */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-zinc-400 mr-2 font-medium">পেমেন্ট মাধ্যম:</span>
            <span className="px-2.5 py-1 bg-zinc-900 text-rose-300 text-xs font-bold rounded border border-rose-900/60">
              bKash
            </span>
            <span className="px-2.5 py-1 bg-zinc-900 text-orange-300 text-xs font-bold rounded border border-zinc-800">
              Nagad
            </span>
            <span className="px-2.5 py-1 bg-zinc-900 text-white text-xs font-bold rounded border border-zinc-800">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
