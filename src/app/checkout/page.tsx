'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CheckoutDetails } from '@/types';
import DeliveryForm from '@/components/checkout/DeliveryForm';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    deliveryFee,
    discount,
    total,
    setDeliveryArea,
    clearCart
  } = useCart();

  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: '',
    phone: '',
    address: '',
    district: 'ঢাকা (Dhaka)',
    notes: '',
    paymentMethod: 'cod',
    bkashNumber: '',
    trxId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleDistrictChange = (dist: string) => {
    setFormData((prev) => ({ ...prev, district: dist }));
    if (dist.includes('ঢাকা') || dist.includes('Dhaka')) {
      setDeliveryArea('inside');
    } else {
      setDeliveryArea('outside');
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'আপনার পূর্ণ নাম আবশ্যক';
    if (!formData.phone.trim()) {
      errs.phone = 'মোবাইল নম্বর আবশ্যক';
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)';
    }
    if (!formData.address.trim()) errs.address = 'ডেলিভারি ঠিকানা আবশ্যক';
    
    if (formData.paymentMethod === 'bkash' && !formData.trxId?.trim()) {
      errs.trxId = 'বিকাশ ট্রানজ্যাকশন আইডি (TrxID) দিন';
    }
    if (formData.paymentMethod === 'nagad' && !formData.trxId?.trim()) {
      errs.trxId = 'নগদ ট্রানজ্যাকশন আইডি (TrxID) দিন';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    const orderId = `MSK-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderId,
      items,
      customer: formData,
      subtotal,
      deliveryFee,
      discount,
      total,
      date: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    };

    try {
      localStorage.setItem('masakin_last_order', JSON.stringify(orderData));
    } catch {}

    setTimeout(() => {
      clearCart();
      router.push(`/order-success?orderId=${orderId}`);
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-800 mb-2">কার্টে কোনো পণ্য নেই</h2>
          <p className="text-xs text-slate-500 mb-6">চেকআউট করার আগে দয়া করে আপনার পছন্দের পণ্য কার্টে যোগ করুন।</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#09090b] text-white rounded-full text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>শপে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>কার্টে ফিরে যান</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            দ্রুত চেকআউট ও ডেলিভারি তথ্য
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            অ্যাকাউন্ট না থাকলেও কোনো সমস্যা নেই! সরাসরি তথ্য পূরণ করে এক ক্লিকে অর্ডার কনফার্ম করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer & Shipping Info (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <DeliveryForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              onDistrictChange={handleDistrictChange}
            />
            <PaymentMethodSelector
              formData={formData}
              setFormData={setFormData}
              total={total}
              errors={errors}
            />
          </div>

          {/* Order Summary & Submit Button (Right) */}
          <div className="lg:col-span-5 space-y-4">
            <CheckoutSummary
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>

      </div>
    </div>
  );
}
