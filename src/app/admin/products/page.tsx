'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Flame, Star, Search, Trash2 } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';
import { Product } from '@/types';
import ProductFormModal from '@/components/admin/ProductFormModal';

export default function AdminProductsPage() {
  const {
    products,
    saveProduct,
    deleteProduct,
    toggleTrending,
    toggleBestseller
  } = useShopData();

  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = products.filter((p) =>
    search.trim() ? p.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
            পোশাক ইনভেন্টরি, ট্রেন্ডিং ও হাইলাইট
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            নতুন পোশাক যোগ করুন, দাম পরিবর্তন করুন এবং সোশ্যাল মিডিয়া ট্রেন্ডিং নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
          className="px-4 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs rounded-xl transition shadow-md shadow-rose-950/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন পোশাক যোগ করুন</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="পোশাকের নাম দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-xs bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-[#e11d48] focus:border-transparent"
          />
        </div>
        <span className="text-xs font-bold text-zinc-500">
          মোট {filtered.length} টি পোশাক
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-zinc-50 text-zinc-600 font-bold border-b border-zinc-200">
            <tr>
              <th className="py-3 px-3">পোশাক</th>
              <th className="py-3 px-3">ক্যাটাগরি</th>
              <th className="py-3 px-3">বিক্রয় মূল্য</th>
              <th className="py-3 px-3">স্টক</th>
              <th className="py-3 px-3">🔥 ট্রেন্ডিং টগল</th>
              <th className="py-3 px-3">⭐ বেস্টসেলার টগল</th>
              <th className="py-3 px-3 text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-700">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-zinc-50/60">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-950 line-clamp-1 max-w-xs">{product.name}</h4>
                      <span className="text-[10px] text-zinc-400 font-mono">SKU: {product.sku}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-semibold text-zinc-600">
                  {product.categoryName}
                </td>
                <td className="py-3 px-3 font-black text-[#e11d48]">
                  ৳{product.price}
                  {product.originalPrice > product.price && (
                    <span className="block text-[10px] text-zinc-400 line-through">৳{product.originalPrice}</span>
                  )}
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    product.stockCount > 5 ? 'bg-zinc-100 text-zinc-800' : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {product.stockCount} টি
                  </span>
                </td>
                <td className="py-3 px-3">
                  <button
                    onClick={() => toggleTrending(product.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      product.featured
                        ? 'bg-rose-50 text-[#e11d48] border border-rose-300'
                        : 'bg-zinc-100 text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>{product.featured ? 'ট্রেন্ডিং চালু' : 'বন্ধ'}</span>
                  </button>
                </td>
                <td className="py-3 px-3">
                  <button
                    onClick={() => toggleBestseller(product.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      product.bestseller
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>{product.bestseller ? 'বেস্টসেলার চালু' : 'বন্ধ'}</span>
                  </button>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                      className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:text-[#e11d48] hover:bg-rose-50 transition cursor-pointer"
                      title="এডিট করুন"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('আপনি কি এই পোশাকটি তালিকা থেকে মুছে ফেলতে চান?')) {
                          deleteProduct(product.id);
                        }
                      }}
                      className="p-1.5 rounded-lg border border-zinc-200 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={saveProduct}
      />
    </div>
  );
}
