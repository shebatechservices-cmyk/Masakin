export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductCategory = 
  | 'panjabi' 
  | 'sharee' 
  | 'mens' 
  | 'womens' 
  | 'kids' 
  | 'winter';

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
  inStock: boolean;
  stockCount: number;
  sizes: string[];
  colors: ProductColor[];
  description: string;
  fabric: string;
  care: string;
  sku: string;
}

export interface CartItem {
  id: string; // unique item key: productId-size-color
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  address: string;
  district: string;
  notes?: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  bkashNumber?: string;
  trxId?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CheckoutDetails;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

export interface Review {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
