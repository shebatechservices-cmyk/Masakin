'use client';

import React, { useRef } from 'react';
import { PosSaleReceipt } from '@/types/finance';
import { useShopData } from '@/context/ShopDataContext';
import { Printer, X, CheckCircle } from 'lucide-react';

interface ThermalReceiptModalProps {
  receipt: PosSaleReceipt;
  onClose: () => void;
}

export default function ThermalReceiptModal({ receipt, onClose }: ThermalReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const { settings } = useShopData();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header toolbar */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#4ade80]" />
            <span className="font-bold text-sm">বিল ও রসিদ তৈরি সম্পন্ন</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thermal Printable Area (80mm width standard) */}
        <div className="p-6 overflow-y-auto bg-stone-100 flex justify-center">
          <div
            ref={receiptRef}
            id="printable-receipt"
            className="bg-white p-5 shadow-xs border border-stone-200 text-stone-900 font-mono text-[11px] leading-tight w-[80mm] max-w-full rounded-sm"
          >
            {/* Header */}
            <div className="text-center pb-3 border-b border-dashed border-stone-400 space-y-1">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 mx-auto object-contain rounded-full mb-1" />
              <h2 className="text-base font-black tracking-wide">{settings.storeName}</h2>
              <p className="text-[10px] text-stone-600">{settings.address}</p>
              <p className="text-[10px] text-stone-600">হেল্পলাইন: {settings.phone}</p>
              <div className="pt-1 text-[9px] uppercase tracking-wider font-bold">
                ক্যাশ মেমো / রসিদ
              </div>
            </div>

            {/* Receipt Meta */}
            <div className="py-2 border-b border-dashed border-stone-400 space-y-0.5 text-[10px]">
              <div className="flex justify-between">
                <span>চালান নং:</span>
                <span className="font-bold">{receipt.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span>তারিখ:</span>
                <span>{receipt.date}</span>
              </div>
              {receipt.customerPhone && (
                <div className="flex justify-between">
                  <span>গ্রাহক মোবাইল:</span>
                  <span>{receipt.customerPhone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ক্যাশিয়ার:</span>
                <span>{receipt.cashierName}</span>
              </div>
            </div>

            {/* Itemized List */}
            <div className="py-2 border-b border-dashed border-stone-400">
              <div className="flex justify-between font-bold pb-1 text-[10px]">
                <span className="w-1/2">আইটেম</span>
                <span className="w-1/4 text-center">পরিমাণ</span>
                <span className="w-1/4 text-right">মূল্য</span>
              </div>
              <div className="space-y-1 pt-1">
                {receipt.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="w-1/2 pr-1">
                      <div className="font-semibold line-clamp-1">{it.product.name}</div>
                      <div className="text-[9px] text-stone-500">
                        {it.selectedSize || 'ফ্রি'} (৳{it.unitPrice})
                      </div>
                    </div>
                    <div className="w-1/4 text-center">{it.quantity}</div>
                    <div className="w-1/4 text-right font-bold">৳{it.subtotal}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financials */}
            <div className="py-2 border-b border-dashed border-stone-400 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>মোট বিল:</span>
                <span>৳{receipt.subtotal}</span>
              </div>
              {receipt.discount > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>ছাড় / ডিসকাউন্ট:</span>
                  <span>-৳{receipt.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm pt-1 border-t border-stone-200">
                <span>সর্বমোট দেয়:</span>
                <span>৳{receipt.total}</span>
              </div>
              <div className="flex justify-between text-[10px] pt-1">
                <span>গৃহীত টাকা ({receipt.paymentMethod.toUpperCase()}):</span>
                <span>৳{receipt.paidAmount}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span>ফেরত / চেঞ্জ:</span>
                <span>৳{receipt.changeAmount}</span>
              </div>
            </div>

            {/* Footer Notice & Barcode Mock */}
            <div className="text-center pt-3 space-y-1 text-[9px] text-stone-500">
              <p>ক্রয়কৃত পণ্য ৭ দিনের মধ্যে ক্যাশ মেমোসহ পরিবর্তনযোগ্য (শর্তসাপেক্ষ)।</p>
              <p className="font-bold text-stone-700">{settings.storeName}-এ কেনাকাটার জন্য ধন্যবাদ!</p>
              <p className="tracking-widest font-mono text-[10px] text-stone-400 pt-1">
                *{receipt.invoiceNo}*
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-white border-t border-stone-200 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 bg-[#09090b] hover:bg-[#e11d48] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>থার্মাল প্রিন্টারে প্রিন্ট দিন</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition cursor-pointer"
          >
            নতুন সেল
          </button>
        </div>
      </div>
    </div>
  );
}
