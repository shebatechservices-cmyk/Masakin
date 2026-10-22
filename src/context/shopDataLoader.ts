import { Product, Order } from '@/types';
import { ExpenseItem, LedgerTransaction } from '@/types/finance';
import { ShopSettings, CouponItem } from '@/types/store';
import { INITIAL_SETTINGS } from '@/data/settings';

export interface InitialShopData {
  products: Product[];
  orders: Order[];
  expenses: ExpenseItem[];
  ledger: LedgerTransaction[];
  settings: ShopSettings;
  coupons: CouponItem[];
}

export function loadStoredShopData(): Partial<InitialShopData> {
  const result: Partial<InitialShopData> = {};
  try {
    const p = localStorage.getItem('msk_products');
    if (p) {
      const parsedProducts = JSON.parse(p);
      result.products = parsedProducts.map((prod: Product) =>
        (prod.category as string) === 'panjabi'
          ? { ...prod, category: 'kids' as const, categoryName: 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস' }
          : prod
      );
    }
    const o = localStorage.getItem('msk_orders');
    if (o) result.orders = JSON.parse(o);

    const e = localStorage.getItem('msk_expenses');
    if (e) result.expenses = JSON.parse(e);

    const l = localStorage.getItem('msk_ledger');
    if (l) result.ledger = JSON.parse(l);

    const s = localStorage.getItem('msk_settings');
    if (s) {
      const parsed = JSON.parse(s);
      result.settings = {
        ...INITIAL_SETTINGS,
        ...parsed,
        storeName: (!parsed.storeName || parsed.storeName === 'মাসাকিন গার্মেন্টস') ? INITIAL_SETTINGS.storeName : parsed.storeName,
        phone: (!parsed.phone || parsed.phone === '01700-000000') ? INITIAL_SETTINGS.phone : parsed.phone,
        email: parsed.email || INITIAL_SETTINGS.email,
        website: parsed.website || INITIAL_SETTINGS.website,
        logoUrl: parsed.logoUrl || INITIAL_SETTINGS.logoUrl,
      };
    }
    const c = localStorage.getItem('msk_coupons');
    if (c) result.coupons = JSON.parse(c);
  } catch (err) {
    console.error('Storage read error', err);
  }
  return result;
}
