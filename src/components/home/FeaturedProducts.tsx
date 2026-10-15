'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';
import ProductCard from '@/components/product/ProductCard';

type TabType = 'all' | 'womens' | 'kids' | 'sharee' | 'bestseller';

export default function FeaturedProducts() {
  const { products } = useShopData();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'bestseller') return p.bestseller;
    return p.category === activeTab;
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-rose-600 font-bold text-xs uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 fill-rose-600" />
              <span>বেস্টসেলার ও ট্রেন্ডিং</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              আমাদের জনপ্রিয় ও হট প্রোডাক্টসমূহ
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-zinc-200'
              }`}
            >
              সবগুলো ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'bestseller'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-zinc-200'
              }`}
            >
              বেস্টসেলার
            </button>
            <button
              onClick={() => setActiveTab('womens')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'womens'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-zinc-200'
              }`}
            >
              নারীদের থ্রি-পিস
            </button>
            <button
              onClick={() => setActiveTab('kids')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'kids'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-zinc-200'
              }`}
            >
              কিডস কালেকশন
            </button>
            <button
              onClick={() => setActiveTab('sharee')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'sharee'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-zinc-200'
              }`}
            >
              শাড়ি
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
            <p className="text-zinc-500 font-medium text-sm">এই ক্যাটাগরিতে বর্তমানে কোনো প্রোডাক্ট নেই।</p>
            <Link href="/admin/products" className="inline-block mt-3 text-xs font-bold text-rose-600 hover:underline">
              + অ্যাডমিন থেকে নতুন প্রোডাক্ট যুক্ত করুন
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-rose-50 text-rose-700 font-extrabold text-sm rounded-full border-2 border-zinc-900 transition duration-200 shadow-xs hover:shadow-md"
          >
            <span>সব পণ্য ক্যাটালগ দেখুন ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
