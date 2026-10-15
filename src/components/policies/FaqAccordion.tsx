'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    q: 'অর্ডার করার পর কতদিনের মধ্যে পণ্য হাতে পাব?',
    a: 'ঢাকার ভেতরে সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে জেলা শহরগুলোতে ২ থেকে ৩ কার্যদিবস সময় লাগে।'
  },
  {
    q: 'সাইজ না মিললে বা ত্রুটিযুক্ত পণ্য পেলে কীভাবে পরিবর্তন করব?',
    a: 'পণ্য গ্রহণের ৭ দিনের মধ্যে আমাদের কাস্টমার কেয়ার বা হোয়াটসঅ্যাপে জানালেই আমরা কোনো ঝামেলা ছাড়াই বিনামূল্যে সাইজ পরিবর্তন বা রিটার্ন গ্রহণ করব।'
  },
  {
    q: 'ক্যাশ অন ডেলিভারিতে কি পণ্য দেখে নেওয়ার সুযোগ আছে?',
    a: 'হ্যাঁ, ডেলিভারি ম্যানের সামনে পার্সেল খুলে কোয়ালিটি ও সাইজ চেক করে সম্পূর্ণ নিশ্চিন্ত হয়ে মূল্য পরিশোধ করতে পারবেন।'
  },
  {
    q: 'বিকাশ বা নগদে অগ্রিম পেমেন্ট করলে কি কোনো বিশেষ সুবিধা আছে?',
    a: 'অগ্রিম পেমেন্টে আমরা এক্সপ্রেস ট্র্যাকিং সুবিধা এবং বিশেষ উপহার বা ভাউচার প্রদান করি।'
  },
  {
    q: 'ডেলিভারি চার্জ কত?',
    a: 'ঢাকার ভেতরে মাত্র ৬০৳ এবং ঢাকার বাইরে ১২০৳। তবে যেকোনো পণ্যের অর্ডারে মোট মূল্য ২৫০০৳ বা তার বেশি হলে সম্পূর্ণ ফ্রি ডেলিভারি!'
  }
];

export default function FaqAccordion({ items = DEFAULT_FAQS }: { items?: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
        সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
      </h2>
      {items.map((faq, idx) => (
        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition">
          <button
            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 flex justify-between items-center hover:bg-slate-50"
          >
            <span>{faq.q}</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                openFaq === idx ? 'rotate-180 text-rose-600' : ''
              }`}
            />
          </button>
          {openFaq === idx && (
            <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
