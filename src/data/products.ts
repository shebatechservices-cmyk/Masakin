import { Product, ProductCategory } from '@/types';

// Re-exports for clean modular structure
export * from './categories';
export * from './districts';
export * from './testimonials';

export const PRODUCTS: Product[] = [
  {
    id: 'masakin-p01',
    name: 'রেডিমেড এক্সক্লুসিভ অর্গানজা থ্রি-পিস সেট',
    nameEn: 'Readymade Exclusive Organza Three Piece Set',
    category: 'womens',
    categoryName: 'নারীদের রেডিমেড থ্রি-পিস',
    price: 2450,
    originalPrice: 3200,
    discountPercent: 23,
    rating: 4.9,
    reviewsCount: 68,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    stockCount: 22,
    sizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    colors: [
      { name: 'অলিভ গ্রিন', hex: '#4d7c0f' },
      { name: 'ডিপ অরেঞ্জ', hex: '#ea580c' },
      { name: 'পিচ পিংক', hex: '#fb923c' }
    ],
    description: 'সম্পূর্ণ রেডিমেড প্রিমিয়াম অর্গানজা ওড়না ও কামিজের সাথে আরামদায়ক সুতি ট্রাউজার ও সফট ইনার। গলায় ও দামানে নিখুঁত কারচুপির কাজ। পার্টি বা যেকোনো পারিবারিক আয়োজনে চমৎকার মানাবে।',
    fabric: 'প্রিমিয়াম অর্গানজা ও সফট কটন ইনার',
    care: 'ড্রাই ক্লিন অথবা হালকা ডিটারজেন্ট দিয়ে ড্রাই ওয়াশ।',
    sku: 'MSK-WOM-001'
  },
  {
    id: 'masakin-p02',
    name: 'বেবি গার্লস রাজকীয় ফেস্টিভ ফ্রক ড্রেস',
    nameEn: 'Baby Girls Royal Festive Frock Dress',
    category: 'kids',
    categoryName: 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস',
    price: 1250,
    originalPrice: 1650,
    discountPercent: 24,
    rating: 4.9,
    reviewsCount: 54,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    stockCount: 16,
    sizes: ['১-২ বছর', '২-৩ বছর', '৩-৪ বছর', '৫-৬ বছর', '৭-৮ বছর'],
    colors: [
      { name: 'গাঢ় কমলা', hex: '#ea580c' },
      { name: 'গোল্ডেন ইয়েলো', hex: '#ca8a04' },
      { name: 'পিস্তা গ্রিন', hex: '#65a30d' }
    ],
    description: 'বাচ্চাদের নরম ত্বকের উপযোগী ভেতরে ১০০% সুতি নরম লাইনিং দেওয়া। বাইরে চমৎকার ঘেরযুক্ত নেট ও লেইস ফ্রক। জন্মদিনের পার্টি বা বিয়ে বাড়ির অনুষ্ঠানে আপনার সোনামণির সবচেয়ে সুন্দর লুক।',
    fabric: 'নরম কটন লাইনিং ও সফট নেট',
    care: 'হালকা শ্যাম্পু বা বেবি ওয়াশে নরমাল হ্যান্ড ওয়াশ করুন।',
    sku: 'MSK-KID-002'
  },
  {
    id: 'masakin-p03',
    name: 'নারীদের প্রিমিয়াম কটন রেডিমেড কুর্তি ও প্যান্ট সেট',
    nameEn: 'Womens Premium Cotton Kurti & Pant Set',
    category: 'womens',
    categoryName: 'নারীদের রেডিমেড থ্রি-পিস',
    price: 1650,
    originalPrice: 2150,
    discountPercent: 23,
    rating: 4.8,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    bestseller: false,
    inStock: true,
    stockCount: 19,
    sizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    colors: [
      { name: 'অলিভ গ্রিন', hex: '#3f6212' },
      { name: 'সরিষা হলুদ', hex: '#d97706' },
      { name: 'টেরাকোটা অরেঞ্জ', hex: '#c2410c' }
    ],
    description: 'অফিস, ভার্সিটি বা ক্যাজুয়াল আড্ডার জন্য সবচেয়ে আরামদায়ক ১০০% সুতি ফেব্রিকের রেডিমেড কুর্তি ও ট্রাউজার সেট। বোতাম ও গলায় হ্যান্ড এমব্রয়ডারি ডিটেইলিং।',
    fabric: '১০০% পিওর কটন খাদি ব্লেন্ড',
    care: 'মেশিন ওয়াশ বা নরমাল হ্যান্ড ওয়াশ।',
    sku: 'MSK-WOM-003'
  },
  {
    id: 'masakin-p04',
    name: 'কিডস বয়েজ ফেস্টিভ রেডিমেড পাঞ্জাবি ও পায়জামা সেট',
    nameEn: 'Kids Boys Festive Readymade Panjabi Set',
    category: 'kids',
    categoryName: 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস',
    price: 1150,
    originalPrice: 1500,
    discountPercent: 23,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    stockCount: 25,
    sizes: ['২-৩ বছর', '৪-৫ বছর', '৬-৭ বছর', '৮-৯ বছর', '১০-১১ বছর'],
    colors: [
      { name: 'অলিভ গ্রিন', hex: '#4d7c0f' },
      { name: 'রয়্যাল অফ-হোয়াইট', hex: '#f8fafc' },
      { name: 'ডিপ অরেঞ্জ', hex: '#ea580c' }
    ],
    description: 'ঈদের দিন ও যেকোনো অনুষ্ঠানে শিশুদের জন্য প্রিমিয়াম সুতি কাপড়ের আরামদায়ক পাঞ্জাবি ও পাজামা। সফট কলার যা বাচ্চার গলায় চুলকাবে না।',
    fabric: '১০০% সফট কম্বড কটন',
    care: 'হালকা ডিটারজেন্ট দিয়ে হ্যান্ড ওয়াশ।',
    sku: 'MSK-KID-004'
  },
  {
    id: 'masakin-p05',
    name: 'প্রিমিয়াম জর্জেট ফেস্টিভ পার্টি গাউন',
    nameEn: 'Premium Georgette Festive Party Gown',
    category: 'womens',
    categoryName: 'নারীদের রেডিমেড থ্রি-পিস',
    price: 2950,
    originalPrice: 3800,
    discountPercent: 22,
    rating: 4.8,
    reviewsCount: 47,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    bestseller: true,
    inStock: true,
    stockCount: 14,
    sizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    colors: [
      { name: 'ডিপ অরেঞ্জ বার্নট', hex: '#c2410c' },
      { name: 'ডার্ক অলিভ', hex: '#365314' }
    ],
    description: 'হাই কোয়ালিটি ফক্স জর্জেট ফ্যাব্রিকে নিখুঁত সিকুইন ও সুতোর কাজ। সম্পূর্ণ রেডিমেড ও নিখুঁত ফিটিংস। বিয়ে বা গায়ে হলুদের অনুষ্ঠানের জমকালো ড্রেস।',
    fabric: 'প্রিমিয়াম ফক্স জর্জেট ও সাটিন ইনার',
    care: 'ড্রাই ক্লিন রেকমেন্ডেড।',
    sku: 'MSK-WOM-005'
  },
  {
    id: 'masakin-p06',
    name: 'টডলার কিউট বেবি টু-পিস সেট (শার্ট + শর্টস)',
    nameEn: 'Toddler Cute Baby Two-Piece Set',
    category: 'kids',
    categoryName: 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস',
    price: 790,
    originalPrice: 1050,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 62,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    bestseller: true,
    inStock: true,
    stockCount: 30,
    sizes: ['৬-১২ মাস', '১-২ বছর', '২-৩ বছর'],
    colors: [
      { name: 'ব্রাইট অরেঞ্জ', hex: '#ea580c' },
      { name: 'অলিভ প্রিন্ট', hex: '#65a30d' }
    ],
    description: 'খেলোধুলা ও ঘুমানোর জন্য অত্যন্ত আরামদায়ক ব্রিদেবল কটন ফেব্রিক। কালার ফাস্টনেস শতভাগ নিশ্চিত। শিশুদের দৈনন্দিন ব্যবহারের সেরা উপহার।',
    fabric: '১০০% অর্গানিক নরম সুতি',
    care: 'মেশিন ওয়াশ উপযোগী।',
    sku: 'MSK-KID-006'
  },
  {
    id: 'masakin-p07',
    name: 'বাচ্চাদের রেডিমেড প্রিন্টেড কটন ফ্রক সেট',
    nameEn: 'Kids Printed Cotton Frock Set',
    category: 'kids',
    categoryName: 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস',
    price: 1250,
    originalPrice: 1650,
    discountPercent: 24,
    rating: 4.9,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    bestseller: false,
    inStock: true,
    stockCount: 18,
    sizes: ['২-৩ বছর', '৪-৫ বছর', '৬-৭ বছর'],
    colors: [
      { name: 'গোলাপি', hex: '#ec4899' },
      { name: 'অফ হোয়াইট', hex: '#f8fafc' }
    ],
    description: '১০০% প্রিমিয়াম কম্বড কটন ফ্যাব্রিকে নিখুঁত সেলাই ও প্রিন্ট। বাচ্চাদের খেলাধূলা ও উৎসবের জন্য সেরা।',
    fabric: '১০০% প্রিমিয়াম সফট কটন',
    care: 'মেশিন ওয়াশ উপযোগী।',
    sku: 'MSK-KID-007'
  },
  {
    id: 'masakin-p08',
    name: 'ট্রেডিশনাল হ্যান্ডলুম জামদানি মোটিফ শাড়ি',
    nameEn: 'Traditional Handloom Jamdani Motif Sharee',
    category: 'sharee',
    categoryName: 'ঐতিহ্যবাহী জামদানি ও শাড়ি',
    price: 3200,
    originalPrice: 4200,
    discountPercent: 23,
    rating: 4.8,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    bestseller: false,
    inStock: true,
    stockCount: 9,
    sizes: ['ফ্রি সাইজ (১২ হাত)'],
    colors: [
      { name: 'ডিপ অরেঞ্জ ও গোল্ডেন', hex: '#ea580c' },
      { name: 'অলিভ গ্রিন ও জরি', hex: '#3f6212' }
    ],
    description: 'দক্ষ তাঁতশিল্পীদের হাতে বোনা মনোমুগ্ধকর জামদানি মোটিফের শাড়ি। আঁচল ও পারে ঐতিহ্যবাহী কারুকাজ ও সফট ফিনিশিং।',
    fabric: 'প্রিমিয়াম কটন সিল্ক ব্লেন্ড',
    care: 'প্রথমবার ড্রাই ওয়াশ।',
    sku: 'MSK-SHR-008'
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}

export function getBestsellerProducts(): Product[] {
  return PRODUCTS.filter(p => p.bestseller);
}
