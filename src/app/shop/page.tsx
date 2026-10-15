'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useShopData } from '@/context/ShopDataContext';
import ProductCard from '@/components/product/ProductCard';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopFilters from '@/components/shop/ShopFilters';
import MobileFilterDrawer from '@/components/shop/MobileFilterDrawer';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products } = useShopData();

  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state whenever URL query params change (e.g. clicking category link in header/footer)
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    const targetUrl = cat === 'all' ? '/shop' : `/shop?category=${cat}`;
    router.replace(targetUrl, { scroll: false });
  };

  // Available Sizes & Colors from dynamic products
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes?.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) =>
      p.colors?.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      })
    );
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesEn = product.nameEn?.toLowerCase().includes(query) || false;
        const matchesDesc = product.description?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesEn && !matchesDesc) return false;
      }
      if (product.price > maxPrice) {
        return false;
      }
      if (selectedSize !== 'all' && !product.sizes?.includes(selectedSize)) {
        return false;
      }
      if (selectedColor !== 'all' && !product.colors?.some((c) => c.name === selectedColor)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0;
    });
  }, [products, selectedCategory, searchQuery, maxPrice, selectedSize, selectedColor, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setMaxPrice(5000);
    setSearchQuery('');
    setSortBy('featured');
    router.replace('/shop', { scroll: false });
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    maxPrice < 5000 ||
    searchQuery !== '';

  return (
    <div className="bg-zinc-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar: Search & Sorting */}
        <ShopHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredProducts.length}
          hasActiveFilters={hasActiveFilters}
          onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
        />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ShopFilters
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleSelectCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            allSizes={allSizes}
            allColors={allColors}
            hasActiveFilters={hasActiveFilters}
            onReset={resetFilters}
          />

          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200/90 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-zinc-900 mb-2">
                  কোনো পোশাক খুঁজে পাওয়া যায়নি
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto mb-6">
                  আপনার নির্বাচিত ক্যাটাগরি বা ফিল্টারে বর্তমানে কোনো পণ্য নেই। ফিল্টার রিসেট করে সব পোশাক দেখুন।
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#09090b] hover:bg-[#e11d48] text-white font-bold rounded-xl text-xs transition shadow-md cursor-pointer"
                >
                  সব পোশাক দেখুন (রিসেট)
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>

      </div>

      <MobileFilterDrawer
        products={products}
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectCategory}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onReset={resetFilters}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-500 font-bold">পোশাক লোড হচ্ছে...</div>}>
      <ShopContent />
    </Suspense>
  );
}
