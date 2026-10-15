'use client';

import React, { useState } from 'react';
import { ExpenseItem, ExpenseCategory } from '@/types/finance';
import { X, Check } from 'lucide-react';

interface AddExpenseModalProps {
  onClose: () => void;
  onAdd: (expense: ExpenseItem) => void;
}

const CATEGORY_NAMES: Record<ExpenseCategory, string> = {
  rent: 'দোকান ভাড়া',
  salary: 'কর্মচারী বেতন ও ভাতা',
  utility: 'বিদ্যুৎ ও সেবা বিল',
  ads: 'বিজ্ঞাপন ও প্রমোশন',
  packaging: 'প্যাকেজিং সামগ্রী',
  courier: 'কুরিয়ার ও ডেলিভারি',
  other: 'অন্যান্য খরচ'
};

export default function AddExpenseModal({ onClose, onAdd }: AddExpenseModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('packaging');
  const [amount, setAmount] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bkash' | 'bank'>('cash');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense: ExpenseItem = {
      id: `exp-${Date.now()}`,
      title,
      category,
      categoryName: CATEGORY_NAMES[category],
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      paymentMethod,
      note: note.trim() || undefined
    };

    onAdd(newExpense);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <h2 className="font-bold text-sm">নতুন খরচ এন্ট্রি করুন</h2>
          <button onClick={onClose} className="p-1 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-stone-600 font-bold mb-1">খরচের বিবরণ / টাইটেল</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: ১০০০ পিস শপিং ব্যাগ..."
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#e11d48]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-600 font-bold mb-1">খরচের ক্যাটাগরি</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#e11d48]"
              >
                {Object.entries(CATEGORY_NAMES).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-zinc-600 font-bold mb-1">টাকার পরিমাণ (৳)</label>
              <input
                type="number"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="৳ 0"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#e11d48]"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-600 font-bold mb-1.5">পেমেন্ট মাধ্যম</label>
            <div className="grid grid-cols-3 gap-2">
              {(['cash', 'bkash', 'bank'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 rounded-xl border capitalize font-bold transition cursor-pointer ${
                    paymentMethod === method
                      ? 'bg-[#09090b] text-white border-[#09090b]'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {method === 'cash' ? 'ক্যাশ' : method === 'bkash' ? 'বিকাশ' : 'ব্যাংক'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-zinc-600 font-bold mb-1">নোট বা মন্তব্য (ঐচ্ছিক)</label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="অতিরিক্ত কোনো তথ্য থাকলে লিখুন..."
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#e11d48]"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>সংরক্ষণ করুন</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl transition cursor-pointer"
            >
              বাতিল
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
