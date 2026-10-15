'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

interface LedgerSummaryCardsProps {
  totalCredit: number; // Income
  totalDebit: number;  // Expense
  cashBalance: number;
  digitalBalance: number;
}

export default function LedgerSummaryCards({
  totalCredit,
  totalDebit,
  cashBalance,
  digitalBalance
}: LedgerSummaryCardsProps) {
  const netProfit = totalCredit - totalDebit;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Income */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-stone-500">মোট বিক্রয় / আয় (Credit)</p>
          <p className="text-xl font-black text-rose-600 mt-1">৳{totalCredit.toLocaleString()}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* Total Expense */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-stone-500">মোট ব্যয় / খরচ (Debit)</p>
          <p className="text-xl font-black text-rose-600 mt-1">৳{totalDebit.toLocaleString()}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <TrendingDown className="w-5 h-5" />
        </div>
      </div>

      {/* Net Profit */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-stone-500">চলতি লাভ (Net Profit)</p>
          <p className={`text-xl font-black mt-1 ${netProfit >= 0 ? 'text-zinc-900' : 'text-rose-600'}`}>
            ৳{netProfit.toLocaleString()}
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-xs">
          <DollarSign className="w-5 h-5 text-rose-300" />
        </div>
      </div>

      {/* Cash vs Digital In Hand */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-stone-500">ক্যাশ ইন হ্যান্ড ও ডিজিটাল</p>
          <p className="text-xs font-black text-stone-800 mt-1">
            ক্যাশ: <span className="text-[#e11d48]">৳{cashBalance.toLocaleString()}</span>
          </p>
          <p className="text-[10px] font-bold text-stone-500">
            বিকাশ/ব্যাংক: ৳{digitalBalance.toLocaleString()}
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
          <Wallet className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
