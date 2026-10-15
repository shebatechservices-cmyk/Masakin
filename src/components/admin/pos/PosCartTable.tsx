'use client';

import React from 'react';
import { PosCartItem } from '@/types/finance';
import { Trash2, Plus, Minus } from 'lucide-react';

interface PosCartTableProps {
  items: PosCartItem[];
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
}

export default function PosCartTable({ items, onUpdateQty, onRemoveItem }: PosCartTableProps) {
  if (items.length === 0) {
    return (
      <div className="bg-stone-50 border border-dashed border-stone-200 rounded-2xl p-8 text-center text-stone-400 text-xs sm:text-sm">
        কার্টে কোনো আইটেম নেই। বারকোড স্ক্যান করুন অথবা নিচের পণ্য তালিকা থেকে ক্লিক করুন।
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
      <div className="max-h-[340px] overflow-y-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold sticky top-0">
            <tr>
              <th className="p-3">পণ্য / সাইজ</th>
              <th className="p-3 text-center">মূল্য</th>
              <th className="p-3 text-center">পরিমাণ</th>
              <th className="p-3 text-right">মোট</th>
              <th className="p-3 text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {items.map((item) => (
              <tr key={`${item.product.id}-${item.selectedSize}`} className="hover:bg-stone-50/70">
                <td className="p-3">
                  <p className="font-bold text-stone-800 line-clamp-1">{item.product.name}</p>
                  <p className="text-[10px] text-stone-400 font-medium">
                    সাইজ: <span className="font-bold text-stone-600">{item.selectedSize || 'ফ্রি'}</span> | SKU: {item.product.sku || 'N/A'}
                  </p>
                </td>
                <td className="p-3 text-center font-bold text-stone-700 whitespace-nowrap">
                  ৳{item.unitPrice}
                </td>
                <td className="p-3 text-center">
                  <div className="inline-flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.product.id, item.selectedSize, -1)}
                      className="p-1 hover:bg-stone-100 text-stone-500"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-bold text-stone-800">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.product.id, item.selectedSize, 1)}
                      className="p-1 hover:bg-stone-100 text-stone-500"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="p-3 text-right font-black text-[#e11d48] whitespace-nowrap">
                  ৳{item.subtotal}
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                    className="p-1.5 text-stone-400 hover:text-red-500 transition rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
