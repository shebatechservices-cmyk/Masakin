'use client';

import React from 'react';
import { ExpenseItem } from '@/types/finance';
import { Trash2 } from 'lucide-react';

interface ExpenseTableProps {
  expenses: ExpenseItem[];
  onDelete: (id: string) => void;
}

export default function ExpenseTable({ expenses, onDelete }: ExpenseTableProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-400 text-xs sm:text-sm shadow-xs">
        কোনো খরচ পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold">
            <tr>
              <th className="p-3.5">তারিখ</th>
              <th className="p-3.5">খরচের বিবরণ</th>
              <th className="p-3.5">ক্যাটাগরি</th>
              <th className="p-3.5">পেমেন্ট মাধ্যম</th>
              <th className="p-3.5 text-right">পরিমাণ (৳)</th>
              <th className="p-3.5 text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {expenses.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50/70">
                <td className="p-3.5 text-stone-500 font-medium whitespace-nowrap">{item.date}</td>
                <td className="p-3.5">
                  <p className="font-bold text-stone-900">{item.title}</p>
                  {item.note && <p className="text-[11px] text-stone-400 mt-0.5">{item.note}</p>}
                </td>
                <td className="p-3.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {item.categoryName}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="capitalize font-semibold text-stone-600">
                    {item.paymentMethod === 'cash' ? 'ক্যাশ' : item.paymentMethod === 'bkash' ? 'বিকাশ' : 'ব্যাংক'}
                  </span>
                </td>
                <td className="p-3.5 text-right font-black text-red-600 whitespace-nowrap">
                  ৳{item.amount.toLocaleString()}
                </td>
                <td className="p-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="ডিলিট করুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
