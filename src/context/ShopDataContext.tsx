'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order } from '@/types';
import { ExpenseItem, LedgerTransaction } from '@/types/finance';
import { ShopSettings, CouponItem } from '@/types/store';
import { PRODUCTS } from '@/data/products';
import { INITIAL_EXPENSES, INITIAL_LEDGER } from '@/data/finance';
import { INITIAL_SETTINGS, INITIAL_COUPONS } from '@/data/settings';

export interface ShopDataContextType {
  products: Product[];
  orders: Order[];
  expenses: ExpenseItem[];
  ledger: LedgerTransaction[];
  settings: ShopSettings;
  coupons: CouponItem[];
  // Product actions
  saveProduct: (product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleTrending: (id: string) => void;
  toggleBestseller: (id: string) => void;
  // Order actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  // Expense actions
  addExpense: (expense: ExpenseItem) => void;
  deleteExpense: (id: string) => void;
  // Ledger actions
  addLedgerEntry: (entry: LedgerTransaction) => void;
  // Settings actions
  updateSettings: (newSettings: Partial<ShopSettings>) => void;
  // Coupon actions
  saveCoupon: (coupon: CouponItem) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponStatus: (id: string) => void;
}

const ShopDataContext = createContext<ShopDataContextType | undefined>(undefined);

export const ShopDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [ledger, setLedger] = useState<LedgerTransaction[]>(INITIAL_LEDGER);
  const [settings, setSettings] = useState<ShopSettings>(INITIAL_SETTINGS);
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const p = localStorage.getItem('msk_products');
      if (p) {
        const parsedProducts = JSON.parse(p);
        setProducts(
          parsedProducts.map((prod: Product) =>
            (prod.category as string) === 'panjabi'
              ? { ...prod, category: 'kids' as const, categoryName: 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস' }
              : prod
          )
        );
      }
      const o = localStorage.getItem('msk_orders');
      if (o) setOrders(JSON.parse(o));
      const e = localStorage.getItem('msk_expenses');
      if (e) setExpenses(JSON.parse(e));
      const l = localStorage.getItem('msk_ledger');
      if (l) setLedger(JSON.parse(l));
      const s = localStorage.getItem('msk_settings');
      if (s) {
        const parsed = JSON.parse(s);
        setSettings({
          ...INITIAL_SETTINGS,
          ...parsed,
          storeName: (!parsed.storeName || parsed.storeName === 'মাসাকিন গার্মেন্টস') ? INITIAL_SETTINGS.storeName : parsed.storeName,
          phone: (!parsed.phone || parsed.phone === '01700-000000') ? INITIAL_SETTINGS.phone : parsed.phone,
          email: parsed.email || INITIAL_SETTINGS.email,
          website: parsed.website || INITIAL_SETTINGS.website,
          logoUrl: parsed.logoUrl || INITIAL_SETTINGS.logoUrl,
        });
      }
      const c = localStorage.getItem('msk_coupons');
      if (c) setCoupons(JSON.parse(c));
    } catch (err) {
      console.error('Storage read error', err);
    }
  }, []);

  const saveProduct = (productData: Partial<Product>) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === productData.id);
      const updated = exists
        ? prev.map((p) => (p.id === productData.id ? ({ ...p, ...productData } as Product) : p))
        : [productData as Product, ...prev];
      localStorage.setItem('msk_products', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('msk_products', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleTrending = (id: string) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p));
      localStorage.setItem('msk_products', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleBestseller = (id: string) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, bestseller: !p.bestseller } : p));
      localStorage.setItem('msk_products', JSON.stringify(updated));
      return updated;
    });
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem('msk_orders', JSON.stringify(updated));
      return updated;
    });
    // Record into Ledger
    const ledgerEntry: LedgerTransaction = {
      id: `led-${Date.now()}`,
      date: order.date,
      type: 'credit',
      title: `অর্ডার #${order.id} (${order.customer.fullName})`,
      source: `অনলাইন অর্ডার (${order.customer.paymentMethod.toUpperCase()})`,
      amount: order.total,
      paymentChannel: order.customer.paymentMethod === 'cod' ? 'cash' : 'digital'
    };
    addLedgerEntry(ledgerEntry);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === id ? { ...o, status } : o));
      localStorage.setItem('msk_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const addExpense = (expense: ExpenseItem) => {
    setExpenses((prev) => {
      const updated = [expense, ...prev];
      localStorage.setItem('msk_expenses', JSON.stringify(updated));
      return updated;
    });
    const ledgerEntry: LedgerTransaction = {
      id: `led-${Date.now()}`,
      date: expense.date,
      type: 'debit',
      title: expense.title,
      source: expense.categoryName,
      amount: expense.amount,
      paymentChannel: expense.paymentMethod === 'cash' ? 'cash' : 'digital'
    };
    addLedgerEntry(ledgerEntry);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem('msk_expenses', JSON.stringify(updated));
      return updated;
    });
  };

  const addLedgerEntry = (entry: LedgerTransaction) => {
    setLedger((prev) => {
      const updated = [entry, ...prev];
      localStorage.setItem('msk_ledger', JSON.stringify(updated));
      return updated;
    });
  };

  const updateSettings = (newSettings: Partial<ShopSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('msk_settings', JSON.stringify(updated));
      return updated;
    });
  };

  const saveCoupon = (coupon: CouponItem) => {
    setCoupons((prev) => {
      const exists = prev.some((c) => c.id === coupon.id);
      const updated = exists
        ? prev.map((c) => (c.id === coupon.id ? coupon : c))
        : [...prev, coupon];
      localStorage.setItem('msk_coupons', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem('msk_coupons', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) => {
      const updated: CouponItem[] = prev.map((c) =>
        c.id === id
          ? { ...c, status: (c.status === 'active' ? 'inactive' : 'active') as 'active' | 'inactive' }
          : c
      );
      localStorage.setItem('msk_coupons', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ShopDataContext.Provider
      value={{
        products,
        orders,
        expenses,
        ledger,
        settings,
        coupons,
        saveProduct,
        deleteProduct,
        toggleTrending,
        toggleBestseller,
        addOrder,
        updateOrderStatus,
        addExpense,
        deleteExpense,
        addLedgerEntry,
        updateSettings,
        saveCoupon,
        deleteCoupon,
        toggleCouponStatus
      }}
    >
      {children}
    </ShopDataContext.Provider>
  );
};

export const useShopData = () => {
  const context = useContext(ShopDataContext);
  if (!context) {
    throw new Error('useShopData must be used within ShopDataProvider');
  }
  return context;
};
