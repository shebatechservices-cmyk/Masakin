import { CartItem, Product } from './index';

export interface CartContextType {
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
