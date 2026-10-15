import { Product, ProductCategory, Review } from './index';
import { ExpenseItem, LedgerTransaction } from './finance';

export interface ShopSettings {
  storeName: string;
  storeTagline: string;
  phone: string;
  whatsapp: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  address: string;
  announcementText: string;
  freeDeliveryThreshold: number;
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  heroBannerTitle: string;
  heroBannerSubtitle: string;
  heroBannerCta: string;
}

export interface CouponItem {
  id: string;
  code: string;
  discount: number;
  status: 'active' | 'inactive';
}
