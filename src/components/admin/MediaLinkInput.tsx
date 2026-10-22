'use client';

import React from 'react';
import { X } from 'lucide-react';

interface MediaLinkInputProps {
  slot: number | 'video';
  value: string;
  onChange: (val: string) => void;
  onApply: () => void;
  onClose: () => void;
}

export default function MediaLinkInput({
  slot,
  value,
  onChange,
  onApply,
  onClose
}: MediaLinkInputProps) {
  return (
    <div className="p-2.5 bg-white rounded-xl border border-rose-300 shadow-xs space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-bold text-zinc-800">
        <span>
          {slot === 'video'
            ? 'ভিডিও লিঙ্ক (গুগল ড্রাইভ বা ওয়েব URL):'
            : `ছবি ${Number(slot) + 1}-এর লিঙ্ক:`}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex gap-1.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="গুগল ড্রাইভ শেয়ার লিঙ্ক পেস্ট করুন..."
          className="flex-1 px-2.5 py-1 text-xs border border-zinc-300 rounded-lg"
        />
        <button
          type="button"
          onClick={onApply}
          className="px-3 py-1 bg-[#e11d48] text-white text-xs font-bold rounded-lg cursor-pointer"
        >
          যুক্ত করুন
        </button>
      </div>
    </div>
  );
}
