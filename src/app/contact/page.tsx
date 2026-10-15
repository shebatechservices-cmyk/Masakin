'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Check, Globe } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

export default function ContactPage() {
  const { settings } = useShopData();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.phone) {
      setSubmitted(true);
    }
  };

  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`হ্যালো ${settings.storeName}, আমি একটি বিষয়ে জানতে চাই।`)}`;

  return (
    <div className="bg-zinc-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-14 h-14 rounded-full bg-white p-0.5 border border-rose-200 shadow-xs overflow-hidden mx-auto mb-3">
            <img src="/images/logo.png" alt={settings.storeName} className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="text-[#e11d48] font-bold text-xs uppercase tracking-widest block mb-1">
            {settings.storeName}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            যোগাযোগ ও কাস্টমার সাপোর্ট
          </h1>
          <p className="text-zinc-600 text-sm mt-2">
            অর্ডার, সাইজ পরিবর্তন, বা যেকোনো তথ্যের জন্য নির্দ্বিধায় আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information (Left) */}
          <div className="lg:col-span-5 space-y-6">
            
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
                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      {settings.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#e11d48] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 text-sm">হটলাইন ও অর্ডার কল:</h3>
                    <a href={`tel:${settings.phone}`} className="text-xs text-[#e11d48] hover:underline font-mono font-bold mt-0.5 block">
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
                      <a href={`mailto:${settings.email}`} className="text-xs text-zinc-600 hover:text-[#e11d48] mt-0.5 block">
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
                      <a href={`https://${settings.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#e11d48] hover:underline mt-0.5 block">
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

              {/* Direct WhatsApp CTA */}
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

          </div>

          {/* Contact Message Form (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h2 className="font-extrabold text-lg text-slate-900 mb-2">
                আমাদের মেসেজ পাঠান
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                নিচের ফর্মটি পূরণ করে পাঠান। আমাদের টিম সর্বোচ্চ ৩০ মিনিটের মধ্যে আপনার সাথে যোগাযোগ করবে।
              </p>

              {submitted ? (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">মেসেজ সফলভাবে পাঠানো হয়েছে!</h3>
                  <p className="text-xs text-slate-600">
                    ধন্যবাদ {form.name}। আমাদের প্রতিনিধি শীঘ্রই আপনার মোবাইল নম্বরে ({form.phone}) যোগাযোগ করবেন।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      আপনার নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      মোবাইল নম্বর <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      আপনার বার্তা বা জিজ্ঞাসা <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="আপনার প্রশ্ন বা মতামত বিস্তারিত লিখুন..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#09090b] hover:bg-zinc-900 text-white font-extrabold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>মেসেজ পাঠিয়ে দিন</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
