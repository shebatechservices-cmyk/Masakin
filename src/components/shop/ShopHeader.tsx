'use client';

import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';

interface ShopHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  totalCount: number;
  hasActiveFilters: boolean;
  onOpenMobileFilter: () => void;
}

export default function ShopHeader({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  totalCount,
  hasActiveFilters,
  onOpenMobileFilter
}: ShopHeaderProps) {
  const { settings } = useShopData();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
          {settings.storeName} কালেকশন ও শপ
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          মোট <strong>{totalCount}</strong> টি রেডিমেড পোশাক পাওয়া গেছে
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-zinc-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নারীদের থ্রি-পিস, বাচ্চাদের ফ্রক বা মডেল দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e11d48] focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter (Mobile) & Sort Dropdown */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
          <button
            onClick={onOpenMobileFilter}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-xl text-xs sm:text-sm font-bold text-zinc-800 bg-zinc-50 hover:bg-zinc-100 cursor-pointer"
          >
            <Filter className="w-4 h-4 text-[#e11d48]" />
            <span>ফিল্টার</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-bold whitespace-nowrap hidden sm:inline">
              সর্টিং:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#e11d48] cursor-pointer"
            >
              <option value="featured">ফিচারড (জনপ্রিয়)</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
              <option value="rating">সর্বোচ্চ রেটিং</option>
              <option value="discount">সর্বোচ্চ ছাড়</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
