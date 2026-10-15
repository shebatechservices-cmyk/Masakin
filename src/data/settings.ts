import { ShopSettings, CouponItem } from '@/types/store';

export const INITIAL_SETTINGS: ShopSettings = {
  storeName: 'মাসাকিন বস্ত্র বিতান',
  storeTagline: 'রেডিমেড প্রিমিয়াম পোশাকের বিশ্বস্ত প্রতিষ্ঠান (MASAKIN Bastrabitan)',
  phone: '+88 01782-282282',
  whatsapp: '8801782282282',
  email: 'masakinbastrabitan@gmail.com',
  website: 'www.masakinbastrabitan.com',
  logoUrl: '/images/logo.png',
  address: 'দোকান নং ১২, ইসলামপুর মার্কেট, ঢাকা',
  announcementText: 'বিশেষ অফার: ২৫০০৳ বা বেশি অর্ডারে ফ্রি হোম ডেলিভারি! সীমিত সময়ের জন্য।',
  freeDeliveryThreshold: 2500,
  deliveryInsideDhaka: 60,
  deliveryOutsideDhaka: 120,
  heroBannerTitle: 'আরামদায়ক ফেব্রিক ও নিখুঁত ফিনিশিংয়ে নতুন রেডিমেড কালেকশন',
  heroBannerSubtitle: 'সরাসরি ফ্যাক্টরি রেটে নারীদের থ্রি-পিস ও বাচ্চাদের এক্সক্লুসিভ ফ্রক। ক্যাশ অন ডেলিভারিতে সারাদেশে দ্রুত হোম ডেলিভারি!',
  heroBannerCta: 'এখনই অর্ডার করুন'
};

export const INITIAL_COUPONS: CouponItem[] = [
  { id: 'c1', code: 'MASAKIN10', discount: 10, status: 'active' },
  { id: 'c2', code: 'EID20', discount: 20, status: 'active' }
];
