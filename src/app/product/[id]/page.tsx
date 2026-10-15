'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import { PRODUCTS, getProductById } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import ProductGallery from '@/components/product/ProductGallery';
import ProductActions from '@/components/product/ProductActions';
import ProductInfoTabs from '@/components/product/ProductInfoTabs';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <Link href="/" className="hover:text-rose-600 transition">হোম</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-rose-600 transition">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Images */}
          <div className="lg:col-span-6">
            <ProductGallery
              images={product.images}
              productName={product.name}
              discountPercent={product.discountPercent}
            />
          </div>

          {/* Details & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold text-rose-600 uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span>SKU: {product.sku}</span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center gap-4 mt-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {product.rating} ({product.reviewsCount} কাস্টমার রিভিউ)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>স্টক অ্যাভেইলেবল ({product.stockCount} টি অবশিষ্ট)</span>
                </div>
              </div>

              {/* Price */}
              <div className="py-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-rose-950">
                  ৳{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  ৳{product.originalPrice - product.price} সাশ্রয়
                </span>
              </div>

              {/* Action Controls */}
              <ProductActions product={product} />
            </div>
          </div>
        </div>

        {/* Product Details & Fabric Care */}
        <ProductInfoTabs
          description={product.description}
          fabric={product.fabric}
          care={product.care}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
              সম্পর্কিত অন্যান্য কালেকশন
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
