'use client';

import React, { useState } from 'react';
import { ExpenseItem, ExpenseCategory } from '@/types/finance';
import { useShopData } from '@/context/ShopDataContext';
import AddExpenseModal from '@/components/admin/expenses/AddExpenseModal';
import ExpenseTable from '@/components/admin/expenses/ExpenseTable';
import { Plus, Receipt, Filter } from 'lucide-react';

export default function ExpensesPage() {
  const { expenses, addExpense, deleteExpense } = useShopData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  const filtered = selectedCat === 'all'
    ? expenses
    : expenses.filter((e) => e.category === selectedCat);

  const handleDelete = (id: string) => {
    if (confirm('আপনি কি এই খরচটি নিশ্চিতভাবে মুছে ফেলতে চান?')) {
      deleteExpense(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900">
            দোকানের খরচ ম্যানেজমেন্ট (Expenses)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            দোকান ভাড়া, বেতন, প্যাকেজিং ও বিজ্ঞাপনের খরচ লিখে রাখুন এবং লেজারে হিসাব রাখুন।
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন খরচ লিখুন</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#e11d48] flex items-center justify-center shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-500">মোট খরচ</p>
            <p className="text-lg font-black text-[#e11d48]">৳{totalExpense.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-500">ফিল্টারকৃত খরচ</p>
            <p className="text-lg font-black text-zinc-900">
              ৳{filtered.reduce((s, e) => s + e.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0">
            <span className="font-bold text-sm">#</span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-500">মোট এন্ট্রি সংখ্যা</p>
            <p className="text-lg font-black text-zinc-900">{expenses.length} টি</p>
          </div>
        </div>
      </div>

      {/* Category Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer ${
            selectedCat === 'all'
              ? 'bg-[#09090b] text-white shadow-xs'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          সব খরচ ({expenses.length})
        </button>
        {['rent', 'salary', 'utility', 'ads', 'packaging', 'courier'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer capitalize ${
              selectedCat === cat
                ? 'bg-[#09090b] text-white shadow-xs'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            {cat === 'rent' ? 'দোকান ভাড়া' : cat === 'salary' ? 'বেতন' : cat === 'utility' ? 'বিদ্যুৎ' : cat === 'ads' ? 'বিজ্ঞাপন' : cat === 'packaging' ? 'প্যাকেজিং' : 'কুরিয়ার'}
          </button>
        ))}
      </div>

      {/* Table */}
      <ExpenseTable expenses={filtered} onDelete={handleDelete} />

      {/* Add Modal */}
      {isModalOpen && (
        <AddExpenseModal onClose={() => setIsModalOpen(false)} onAdd={addExpense} />
      )}
    </div>
  );
}
