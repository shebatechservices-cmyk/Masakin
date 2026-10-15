'use client';

import React, { useState } from 'react';
import { LedgerTransaction } from '@/types/finance';
import { useShopData } from '@/context/ShopDataContext';
import LedgerSummaryCards from '@/components/admin/ledger/LedgerSummaryCards';
import LedgerTable from '@/components/admin/ledger/LedgerTable';
import { Download } from 'lucide-react';

export default function LedgerPage() {
  const { ledger } = useShopData();
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');

  const totalCredit = ledger
    .filter((t) => t.type === 'credit')
    .reduce((s, t) => s + t.amount, 0);

  const totalDebit = ledger
    .filter((t) => t.type === 'debit')
    .reduce((s, t) => s + t.amount, 0);

  const cashCredit = ledger
    .filter((t) => t.type === 'credit' && t.paymentChannel === 'cash')
    .reduce((s, t) => s + t.amount, 0);
  const cashDebit = ledger
    .filter((t) => t.type === 'debit' && t.paymentChannel === 'cash')
    .reduce((s, t) => s + t.amount, 0);
  const cashBalance = cashCredit - cashDebit;

  const digitalCredit = ledger
    .filter((t) => t.type === 'credit' && t.paymentChannel === 'digital')
    .reduce((s, t) => s + t.amount, 0);
  const digitalDebit = ledger
    .filter((t) => t.type === 'debit' && t.paymentChannel === 'digital')
    .reduce((s, t) => s + t.amount, 0);
  const digitalBalance = digitalCredit - digitalDebit;

  const filtered = filterType === 'all'
    ? ledger
    : ledger.filter((t) => t.type === filterType);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900">
            একাউন্ট-লেজার ও ব্যালেন্স শিট (General Ledger)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            মোট আয়-ব্যয়, ক্যাশ ইন হ্যান্ড এবং লাভ-ক্ষতির পূর্ণাঙ্গ হিসাব খাতা।
          </p>
        </div>
        <button
          onClick={() => alert('লেজার রিপোর্ট ডাউনলোড প্রস্তুত হচ্ছে...')}
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>রিপোর্ট ডাউনলোড</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <LedgerSummaryCards
        totalCredit={totalCredit}
        totalDebit={totalDebit}
        cashBalance={cashBalance}
        digitalBalance={digitalBalance}
      />

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            filterType === 'all'
              ? 'bg-[#09090b] text-white shadow-xs'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          সকল হিসাব ({ledger.length})
        </button>
        <button
          onClick={() => setFilterType('credit')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            filterType === 'credit'
              ? 'bg-rose-700 text-white'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          শুধু জমা / আয় (Credit)
        </button>
        <button
          onClick={() => setFilterType('debit')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            filterType === 'debit'
              ? 'bg-rose-700 text-white'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          শুধু খরচ / ব্যয় (Debit)
        </button>
      </div>

      {/* Ledger Table */}
      <LedgerTable transactions={filtered} />
    </div>
  );
}
