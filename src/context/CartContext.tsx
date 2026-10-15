'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode: string;
  couponDiscountPercent: number;
  isCartOpen: boolean;
  deliveryArea: 'inside' | 'outside';
  setDeliveryArea: (area: 'inside' | 'outside') => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, selectedSize?: string, selectedColor?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [deliveryArea, setDeliveryArea] = useState<'inside' | 'outside'>('inside');
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('masakin_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('masakin_coupon');
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setCouponCode(parsed.code || '');
        setCouponDiscountPercent(parsed.percent || 0);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('masakin_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items, isMounted]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (
    product: Product,
    selectedSize?: string,
    selectedColor?: string,
    quantity: number = 1
  ) => {
    const size = selectedSize || product.sizes[0] || 'Standard';
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    const itemId = `${product.id}-${size}-${color}`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setCouponDiscountPercent(0);
    try {
      localStorage.removeItem('masakin_cart');
      localStorage.removeItem('masakin_coupon');
    } catch {}
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MASAKIN10') {
      setCouponCode('MASAKIN10');
      setCouponDiscountPercent(10);
      try {
        localStorage.setItem(
          'masakin_coupon',
          JSON.stringify({ code: 'MASAKIN10', percent: 10 })
        );
      } catch {}
      return { success: true, message: 'অভিনন্দন! ১০% ডিসকাউন্ট যোগ করা হয়েছে।' };
    }
    if (cleanCode === 'EID20') {
      setCouponCode('EID20');
      setCouponDiscountPercent(20);
      try {
        localStorage.setItem(
          'masakin_coupon',
          JSON.stringify({ code: 'EID20', percent: 20 })
        );
      } catch {}
      return { success: true, message: 'অভিনন্দন! ২০% ঈদ অফার ডিসকাউন্ট যুক্ত হয়েছে।' };
    }
    return { success: false, message: 'দুঃখিত, কুপন কোডটি সঠিক নয় বা মেয়াদ শেষ হয়েছে।' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
    try {
      localStorage.removeItem('masakin_coupon');
    } catch {}
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = Math.round((subtotal * couponDiscountPercent) / 100);
  // Free delivery for orders >= 2500 BDT or default rate
  const deliveryFee = subtotal >= 2500 || items.length === 0 ? 0 : deliveryArea === 'inside' ? 60 : 120;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        deliveryFee,
        discount,
        total,
        couponCode,
        couponDiscountPercent,
        isCartOpen,
        deliveryArea,
        setDeliveryArea,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
