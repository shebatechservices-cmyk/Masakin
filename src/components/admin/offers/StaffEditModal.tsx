'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Trash2, Edit3, User, Mail, Phone, Lock } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { SystemUser } from '@/types/auth';

interface StaffEditModalProps {
  staff: SystemUser | null;
  onClose: () => void;
}

export default function StaffEditModal({ staff, onClose }: StaffEditModalProps) {
  const { updateUserDetails, deleteUser } = useAdminAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    if (staff) {
      setName(staff.name);
      setEmail(staff.email);
      setPhone(staff.phone || '');
      setPassword(staff.password);
      setStatusMsg(null);
    }
  }, [staff]);

  if (!staff) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || password.length < 4) {
      setStatusMsg({ text: 'সঠিক তথ্য দিন (পাসওয়ার্ড কমপক্ষে ৪ অক্ষর)।', isError: true });
      return;
    }

    const success = updateUserDetails(staff.id, { name, email, phone, password });
    if (success) {
      setStatusMsg({ text: 'স্টাফের তথ্য সফলভাবে আপডেট হয়েছে!', isError: false });
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setStatusMsg({ text: 'আপডেট ব্যর্থ হয়েছে।', isError: true });
    }
  };

  const handleDelete = () => {
    if (window.confirm(`আপনি কি নিশ্চিত যে "${staff.name}" একাউন্টটি মুছে ফেলতে চান?`)) {
      deleteUser(staff.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-zinc-200">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-zinc-900">
                স্টাফ তথ্য সংশোধন ও এডিট
              </h3>
              <p className="text-[10px] text-zinc-400">নাম, মোবাইল নম্বর, ইমেইল বা পাসওয়ার্ড পরিবর্তন</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-zinc-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              <span>কর্মীর পূর্ণ নাম *</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>মোবাইল নম্বর (লগইন আইডি হিসেবে ব্যবহারযোগ্য)</span>
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
            <label className="block font-bold text-zinc-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>লগইন ইমেইল ঠিকানা *</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>লগইন পাসওয়ার্ড *</span>
            </label>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48] font-mono"
            />
          </div>

          {statusMsg && (
            <div
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                statusMsg.isError ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {statusMsg.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-2">
            {staff.id !== 'usr-staff-01' && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition"
                title="স্টাফ ডিলিট করুন"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ডিলিট</span>
              </button>
            )}
            <div className="flex-1 flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-zinc-200 rounded-xl font-bold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-xl shadow-xs cursor-pointer"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
