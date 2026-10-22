'use client';

import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.phone) {
      setSubmitted(true);
    }
  };

  return (
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
            className="w-full py-3.5 bg-[#09090b] hover:bg-zinc-900 text-white font-extrabold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>মেসেজ পাঠিয়ে দিন</span>
          </button>
        </form>
      )}
    </div>
  );
}
