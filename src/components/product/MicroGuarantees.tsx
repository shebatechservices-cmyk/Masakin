'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';

export default function MicroGuarantees() {
  return (
    <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600">
      <div className="flex flex-col items-center">
        <Truck className="w-4 h-4 text-rose-600 mb-1" />
        <span>ক্যাশ অন ডেলিভারি</span>
      </div>
      <div className="flex flex-col items-center">
        <RotateCcw className="w-4 h-4 text-rose-600 mb-1" />
        <span>৭ দিনে সাইজ বদল</span>
      </div>
      <div className="flex flex-col items-center">
        <ShieldCheck className="w-4 h-4 text-rose-600 mb-1" />
        <span>১০০% আসল পোশাক</span>
      </div>
    </div>
  );
}
