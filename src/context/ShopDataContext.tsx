'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order } from '@/types';
import { ExpenseItem, LedgerTransaction } from '@/types/finance';
import { ShopSettings, CouponItem } from '@/types/store';
import { ShopDataContextType } from '@/types/shopData';
import { PRODUCTS } from '@/data/products';
import { INITIAL_EXPENSES, INITIAL_LEDGER } from '@/data/finance';
import { INITIAL_SETTINGS, INITIAL_COUPONS } from '@/data/settings';
import { loadStoredShopData } from './shopDataLoader';

const ShopDataContext = createContext<ShopDataContextType | undefined>(undefined);

export const ShopDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [ledger, setLedger] = useState<LedgerTransaction[]>(INITIAL_LEDGER);
  const [settings, setSettings] = useState<ShopSettings>(INITIAL_SETTINGS);
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);

  useEffect(() => {
    const data = loadStoredShopData();
    if (data.products) setProducts(data.products);
    if (data.orders) setOrders(data.orders);
    if (data.expenses) setExpenses(data.expenses);
    if (data.ledger) setLedger(data.ledger);
    if (data.settings) setSettings(data.settings);
    if (data.coupons) setCoupons(data.coupons);
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

  const addLedgerEntry = (entry: LedgerTransaction) => {
    setLedger((prev) => {
      const updated = [entry, ...prev];
      localStorage.setItem('msk_ledger', JSON.stringify(updated));
      return updated;
    });
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem('msk_orders', JSON.stringify(updated));
      return updated;
    });
    addLedgerEntry({
      id: `led-${Date.now()}`,
      date: order.date,
      type: 'credit',
      title: `অর্ডার #${order.id} (${order.customer.fullName})`,
      source: `অনলাইন অর্ডার (${order.customer.paymentMethod.toUpperCase()})`,
      amount: order.total,
      paymentChannel: order.customer.paymentMethod === 'cod' ? 'cash' : 'digital'
    });
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
    addLedgerEntry({
      id: `led-${Date.now()}`,
      date: expense.date,
      type: 'debit',
      title: expense.title,
      source: expense.categoryName,
      amount: expense.amount,
      paymentChannel: expense.paymentMethod === 'cash' ? 'cash' : 'digital'
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem('msk_expenses', JSON.stringify(updated));
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
      const updated = exists ? prev.map((c) => (c.id === coupon.id ? coupon : c)) : [...prev, coupon];
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
        c.id === id ? { ...c, status: (c.status === 'active' ? 'inactive' : 'active') as 'active' | 'inactive' } : c
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
  if (!context) throw new Error('useShopData must be used within ShopDataProvider');
  return context;
};
