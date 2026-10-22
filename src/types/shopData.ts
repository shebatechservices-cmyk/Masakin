import { Product, Order } from './index';
import { ExpenseItem, LedgerTransaction } from './finance';
import { ShopSettings, CouponItem } from './store';

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
