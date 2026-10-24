'use client';

import React, { useState } from 'react';
import { X, UserPlus, Check, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface StaffCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StaffCreateModal({ isOpen, onClose }: StaffCreateModalProps) {
  const { createStaffMember } = useAdminAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password.length < 4) {
      setErrorMsg('পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।');
      return;
    }

    const res = createStaffMember({ name, email, phone, password });
    if (res.success) {
      setSuccessMsg(res.message);
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1200);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-zinc-200">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#e11d48] flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-zinc-900">
                নতুন স্টাফ কর্মী যোগ করুন
              </h3>
              <p className="text-[10px] text-zinc-400">পিওএস ও অর্ডার প্রসেসিংয়ের কর্মী</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-zinc-700 mb-1">কর্মীর পূর্ণ নাম *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. মোঃ রফিকুল ইসলাম"
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              মোবাইল নম্বর (লগইন আইডি হিসেবে ব্যবহারযোগ্য)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 01711223344"
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">লগইন ইমেইল ঠিকানা *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rafiq@masakin.com"
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">লগইন পাসওয়ার্ড *</label>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৪ অক্ষরের পাসওয়ার্ড"
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48] font-mono"
            />
          </div>

          <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 text-[10px] text-zinc-600 space-y-1">
            <p className="font-bold text-zinc-800">কর্মীর নির্ধারিত অনুমতিসমূহ:</p>
            <p className="text-emerald-700 font-medium">✓ পিওএস (POS) কাউন্টার ও বারকোড বিলিং</p>
            <p className="text-emerald-700 font-medium">✓ কাস্টমারদের অনলাইন অর্ডার প্রসেসিং ও ডেলিভারি স্ট্যাটাস</p>
            <p className="text-rose-600 line-through">✗ দোকানের খরচ, একাউন্ট লেজার ও শপ সেটিংস (লকড)</p>
          </div>

          {successMsg && (
            <p className="text-emerald-700 font-bold flex items-center gap-1.5 p-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </p>
          )}

          {errorMsg && (
            <p className="text-rose-700 font-bold flex items-center gap-1.5 p-2 bg-rose-50 rounded-xl border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-zinc-200 rounded-xl font-bold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-xl shadow-xs cursor-pointer"
            >
              স্টাফ সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
