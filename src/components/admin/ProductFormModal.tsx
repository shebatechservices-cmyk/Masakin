'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import ProductHighlightToggles from './ProductHighlightToggles';
import ProductMediaUploader from './ProductMediaUploader';
import ProductBasicInfoFields from './ProductBasicInfoFields';
import { convertGoogleDriveLink } from '@/utils/googleDrive';

interface ProductFormModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
}

export default function ProductFormModal({
  product,
  isOpen,
  onClose,
  onSave
}: ProductFormModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState<ProductCategory>(product?.category || 'womens');
  const [price, setPrice] = useState(product?.price || 1500);
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice || 2000);
  const [stockCount, setStockCount] = useState(product?.stockCount || 20);
  const [images, setImages] = useState<string[]>([
    product?.images?.[0] || '',
    product?.images?.[1] || '',
    product?.images?.[2] || ''
  ]);
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl || '');
  const [sizes, setSizes] = useState(product?.sizes?.join(', ') || '38, 40, 42');
  const [featured, setFeatured] = useState(product?.featured || false);
  const [bestseller, setBestseller] = useState(product?.bestseller || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPercent = Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

    const validImages = images
      .map((img) => convertGoogleDriveLink(img))
      .filter((img) => img.trim() !== '');

    const finalImages = validImages.length > 0 
      ? validImages 
      : ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'];

    onSave({
      id: product?.id || `masakin-custom-${Date.now()}`,
      name,
      category,
      categoryName: category === 'womens' ? 'নারীদের রেডিমেড থ্রি-পিস' : category === 'kids' ? 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস' : 'রেডিমেড কালেকশন',
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercent,
      stockCount: Number(stockCount),
      inStock: Number(stockCount) > 0,
      images: finalImages,
      videoUrl: convertGoogleDriveLink(videoUrl).trim() || undefined,
      sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
      featured,
      bestseller
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      {/* Compact Modal Box */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl z-10 border border-zinc-200 my-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 mb-3">
          <h3 className="font-extrabold text-sm sm:text-base text-zinc-900">
            {product ? 'পোশাক এডিট করুন' : 'নতুন পোশাক যুক্ত করুন'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <ProductBasicInfoFields
            name={name}
            onChangeName={setName}
            category={category}
            onChangeCategory={setCategory}
            price={price}
            onChangePrice={setPrice}
            originalPrice={originalPrice}
            onChangeOriginalPrice={setOriginalPrice}
            stockCount={stockCount}
            onChangeStockCount={setStockCount}
            sizes={sizes}
            onChangeSizes={setSizes}
          />

          <ProductMediaUploader
            images={images}
            onChangeImages={setImages}
            videoUrl={videoUrl}
            onChangeVideo={setVideoUrl}
          />

          <ProductHighlightToggles
            featured={featured}
            bestseller={bestseller}
            onFeaturedChange={setFeatured}
            onBestsellerChange={setBestseller}
          />

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
