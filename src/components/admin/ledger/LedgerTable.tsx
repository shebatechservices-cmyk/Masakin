'use client';

import React from 'react';
import { LedgerTransaction } from '@/types/finance';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface LedgerTableProps {
  transactions: LedgerTransaction[];
}

export default function LedgerTable({ transactions }: LedgerTableProps) {
  let runningBalance = 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold">
            <tr>
              <th className="p-3.5">তারিখ</th>
              <th className="p-3.5">লেনদেনের বিবরণ ও উৎস</th>
              <th className="p-3.5">প্রকার (Type)</th>
              <th className="p-3.5">পদ্ধতি</th>
              <th className="p-3.5 text-right">আদায় (Credit)</th>
              <th className="p-3.5 text-right">ব্যয় (Debit)</th>
              <th className="p-3.5 text-right">ব্যালেন্স</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {transactions.map((tx) => {
              if (tx.type === 'credit') {
                runningBalance += tx.amount;
              } else {
                runningBalance -= tx.amount;
              }

              return (
                <tr key={tx.id} className="hover:bg-stone-50/70">
                  <td className="p-3.5 text-stone-500 font-medium whitespace-nowrap">{tx.date}</td>
                  <td className="p-3.5">
                    <p className="font-bold text-stone-900">{tx.title}</p>
                    <p className="text-[10px] text-stone-400">{tx.source}</p>
                  </td>
                  <td className="p-3.5">
                    {tx.type === 'credit' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                        <ArrowDownLeft className="w-3 h-3" />
                        <span>জমা (আয়)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>খরচ (ব্যয়)</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className="capitalize font-semibold text-stone-600">
                      {tx.paymentChannel === 'cash' ? 'কাউন্টার ক্যাশ' : 'ডিজিটাল (বিকাশ/ব্যাংক)'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-black text-rose-600 whitespace-nowrap">
                    {tx.type === 'credit' ? `+৳${tx.amount.toLocaleString()}` : '—'}
                  </td>
                  <td className="p-3.5 text-right font-black text-rose-600 whitespace-nowrap">
                    {tx.type === 'debit' ? `-৳${tx.amount.toLocaleString()}` : '—'}
                  </td>
                  <td className="p-3.5 text-right font-black text-stone-800 whitespace-nowrap">
                    ৳{runningBalance.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
