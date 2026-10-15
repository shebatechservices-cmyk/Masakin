'use client';

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';
import { Product, CheckoutDetails, Order } from '@/types';
import QuickProductPicker from './QuickProductPicker';
import QuickOrderForm from './QuickOrderForm';
import OrderSuccessModal from './OrderSuccessModal';

export default function OnePageOrderSection() {
  const { products, addOrder, settings } = useShopData();
  const currentProduct = products[0] || {
    id: 'p-default',
    name: 'রেডিমেড পোশাক',
    category: 'womens',
    categoryName: 'নারীদের থ্রি-পিস',
    price: 1500,
    originalPrice: 2000,
    discountPercent: 25,
    rating: 5,
    reviewsCount: 10,
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'],
    inStock: true,
    stockCount: 10,
    sizes: ['38', '40'],
    colors: [],
    description: '',
    fabric: '',
    care: '',
    sku: 'MSK-01'
  };

  const [selectedProduct, setSelectedProduct] = useState<Product>(currentProduct);
  const [selectedSize, setSelectedSize] = useState<string>(currentProduct.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(currentProduct.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryArea, setDeliveryArea] = useState<'inside' | 'outside'>('inside');

  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: '',
    phone: '',
    address: '',
    district: 'ঢাকা (Dhaka)',
    notes: '',
    paymentMethod: 'cod',
    trxId: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{ id: string; total: number; name: string } | null>(null);

  const subtotal = selectedProduct.price * quantity;
  const deliveryFee = subtotal >= settings.freeDeliveryThreshold
    ? 0
    : deliveryArea === 'inside'
    ? settings.deliveryInsideDhaka
    : settings.deliveryOutsideDhaka;
  const total = subtotal + deliveryFee;

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
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const orderId = `MSK-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: orderId,
      items: [
        {
          id: `${selectedProduct.id}-${selectedSize}-${selectedColor}`,
          product: selectedProduct,
          selectedSize,
          selectedColor,
          quantity
        }
      ],
      customer: formData,
      subtotal,
      deliveryFee,
      discount: 0,
      total,
      date: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'pending'
    };

    // Save into live ShopDataContext (persisted to localStorage)
    addOrder(newOrder);

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrder({
        id: orderId,
        total,
        name: formData.fullName
      });
    }, 500);
  };

  return (
    <section id="order-form" className="py-14 sm:py-20 bg-gradient-to-b from-rose-50/40 via-white to-zinc-50/60 scroll-mt-20 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#09090b] text-rose-300 text-xs font-black uppercase tracking-wider mb-2.5 shadow-xs border border-zinc-800">
            <Zap className="w-3.5 h-3.5 fill-[#e11d48] text-[#e11d48]" />
            <span>১-ক্লিকে সরাসরি ক্যাশ অন ডেলিভারি অর্ডার</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">
            সহজেই অর্ডার করুন — কোনো রেজিস্ট্রেশন ঝামেলা নেই
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm mt-2">
            পোশাক নির্বাচন করুন, ঠিকানা দিন আর পণ্য হাতে পেয়ে মূল্য দিন।
          </p>
        </div>

        {/* 2-Column One-Page Order Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-6">
            <QuickProductPicker
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

          <div className="lg:col-span-6">
            <QuickOrderForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              isSubmitting={isSubmitting}
              onDistrictChange={handleDistrictChange}
            />
          </div>
        </form>

      </div>

      {/* Instant Order Success Modal */}
      {confirmedOrder && (
        <OrderSuccessModal
          orderId={confirmedOrder.id}
          total={confirmedOrder.total}
          customerName={confirmedOrder.name}
          onClose={() => setConfirmedOrder(null)}
        />
      )}
    </section>
  );
}
