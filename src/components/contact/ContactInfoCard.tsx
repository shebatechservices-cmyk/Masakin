'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Globe } from 'lucide-react';
import { ShopSettings } from '@/types/store';

interface ContactInfoCardProps {
  settings: ShopSettings;
}

export default function ContactInfoCard({ settings }: ContactInfoCardProps) {
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `হ্যালো ${settings.storeName}, আমি একটি বিষয়ে জানতে চাই।`
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-6">
      <h2 className="font-extrabold text-lg text-zinc-900 border-b border-zinc-100 pb-3">
        সরাসরি যোগাযোগের ঠিকানা
      </h2>

      <div className="space-y-4 text-sm text-zinc-700">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#e11d48] flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 text-sm">দোকানের ঠিকানা:</h3>
            <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">{settings.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#e11d48] flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 text-sm">হটলাইন ও অর্ডার কল:</h3>
            <a
              href={`tel:${settings.phone}`}
              className="text-xs text-[#e11d48] hover:underline font-mono font-bold mt-0.5 block"
            >
              {settings.phone}
            </a>
          </div>
        </div>

        {settings.email && (
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#e11d48] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm">ইমেইল:</h3>
              <a
                href={`mailto:${settings.email}`}
                className="text-xs text-zinc-600 hover:text-[#e11d48] mt-0.5 block"
              >
                {settings.email}
              </a>
            </div>
          </div>
        )}

        {settings.website && (
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#e11d48] flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm">ওয়েবসাইট:</h3>
              <a
                href={`https://${settings.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#e11d48] hover:underline mt-0.5 block"
              >
                {settings.website}
              </a>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 text-sm">কাস্টমার সেবা সময়:</h3>
            <p className="text-xs text-zinc-600 mt-0.5">
              প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত (সাপ্তাহিক ছুটি নেই)
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-[#09090b] hover:bg-[#e11d48] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>হোয়াটসঅ্যাপে সরাসরি চ্যাট করুন</span>
        </a>
      </div>
    </div>
  );
}
