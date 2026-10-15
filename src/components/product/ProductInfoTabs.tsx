import React from 'react';

interface ProductInfoTabsProps {
  description: string;
  fabric: string;
  care: string;
}

export default function ProductInfoTabs({
  description,
  fabric,
  care
}: ProductInfoTabsProps) {
  return (
    <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
      <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
        পণ্যের বিবরণ ও ফ্যাব্রিক তথ্য
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
        <div className="space-y-3">
          <p>{description}</p>
          <div className="pt-2 space-y-1.5 text-xs">
            <div><strong>ফেব্রিক:</strong> {fabric}</div>
            <div><strong>ওয়াশ কেয়ার:</strong> {care}</div>
          </div>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-3">
          <h3 className="font-bold text-slate-800 text-sm">ডেলিভারি তথ্য</h3>
          <ul className="text-xs space-y-2 text-slate-600">
            <li>• ঢাকার মধ্যে ডেলিভারি সময়: <strong>২৪-৪৮ ঘণ্টা</strong> (চার্জ ৬০৳)</li>
            <li>• ঢাকার বাইরে সারা দেশে: <strong>২-৩ কার্যদিবস</strong> (চার্জ ১২০৳)</li>
            <li>• ২৫০০৳ বা তার বেশি অর্ডারে <strong>সম্পূর্ণ ফ্রি ডেলিভারি</strong>।</li>
            <li>• পার্সেল ডেলিভারি ম্যানের সামনে খুলে দেখে চেক করার সুবিধা রয়েছে।</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
