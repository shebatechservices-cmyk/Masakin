'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { PosCartItem, PosSaleReceipt, LedgerTransaction } from '@/types/finance';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useShopData } from '@/context/ShopDataContext';
import BarcodeInput from '@/components/admin/pos/BarcodeInput';
import PosCartTable from '@/components/admin/pos/PosCartTable';
import PosProductGrid from '@/components/admin/pos/PosProductGrid';
import PosBillingPanel from '@/components/admin/pos/PosBillingPanel';
import ThermalReceiptModal from '@/components/admin/pos/ThermalReceiptModal';

export default function PosPage() {
  const { user } = useAdminAuth();
  const { products, addLedgerEntry } = useShopData();
  const [cart, setCart] = useState<PosCartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bkash' | 'nagad'>('cash');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [activeReceipt, setActiveReceipt] = useState<PosSaleReceipt | null>(null);

  const handleAddProduct = (product: Product, size?: string) => {
    const selectedSize = size || product.sizes?.[0] || 'ফ্রি';
    setCart((prev) => {
      const idx = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedSize === selectedSize
      );
      if (idx > -1) {
        const next = [...prev];
        const nextQty = next[idx].quantity + 1;
        next[idx] = {
          ...next[idx],
          quantity: nextQty,
          subtotal: nextQty * next[idx].unitPrice
        };
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize,
          unitPrice: product.price,
          subtotal: product.price
        }
      ];
    });
  };

  const handleUpdateQty = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) => {
          if (it.product.id === productId && it.selectedSize === size) {
            const nextQty = it.quantity + delta;
            return {
              ...it,
              quantity: nextQty,
              subtotal: nextQty * it.unitPrice
            };
          }
          return it;
        })
        .filter((it) => it.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) => prev.filter((it) => !(it.product.id === productId && it.selectedSize === size)));
  };

  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    const subtotal = cart.reduce((s, i) => s + i.subtotal, 0);
    const total = Math.max(0, subtotal - discount);
    const finalPaid = paidAmount > 0 ? paidAmount : total;
    const change = Math.max(0, finalPaid - total);
    const invNumber = `INV-${Date.now().toString().slice(-6)}`;

    const receipt: PosSaleReceipt = {
      invoiceNo: invNumber,
      date: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      customerPhone: customerPhone.trim() || undefined,
      items: [...cart],
      subtotal,
      discount,
      total,
      paidAmount: finalPaid,
      changeAmount: change,
      paymentMethod,
      cashierName: user?.name || 'কাউন্টার স্টাফ'
    };

    // Auto-credit in Ledger
    const ledgerTx: LedgerTransaction = {
      id: `led-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'credit',
      title: `কাউন্টার সেল #${invNumber}`,
      source: `POS সেলস (${paymentMethod.toUpperCase()})`,
      amount: total,
      paymentChannel: paymentMethod === 'cash' ? 'cash' : 'digital'
    };
    addLedgerEntry(ledgerTx);

    setActiveReceipt(receipt);
  };

  const handleReset = () => {
    setCart([]);
    setDiscount(0);
    setPaidAmount(0);
    setCustomerPhone('');
    setActiveReceipt(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900">
          কাউন্টার সেলস ও থার্মাল প্রিন্টার (POS)
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          বারকোড স্ক্যানার দিয়ে সরাসরি সেল করুন এবং কাস্টমারের জন্য রসিদ প্রিন্ট নিন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Barcode & Items */}
        <div className="lg:col-span-7 space-y-4">
          <BarcodeInput products={products} onAddProduct={handleAddProduct} />
          <PosCartTable
            items={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
          />
          <PosProductGrid products={products} onAddProduct={handleAddProduct} />
        </div>

        {/* Right Column: Billing & Tender */}
        <div className="lg:col-span-5 sticky top-20">
          <PosBillingPanel
            items={cart}
            discount={discount}
            paidAmount={paidAmount}
            paymentMethod={paymentMethod}
            customerPhone={customerPhone}
            onDiscountChange={setDiscount}
            onPaidAmountChange={setPaidAmount}
            onPaymentMethodChange={setPaymentMethod}
            onCustomerPhoneChange={setCustomerPhone}
            onCompleteSale={handleCompleteSale}
          />
        </div>
      </div>

      {activeReceipt && (
        <ThermalReceiptModal receipt={activeReceipt} onClose={handleReset} />
      )}
    </div>
  );
}
