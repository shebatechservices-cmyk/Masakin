import { Product } from './index';

export type ExpenseCategory = 
  | 'rent' 
  | 'salary' 
  | 'utility' 
  | 'ads' 
  | 'packaging' 
  | 'courier' 
  | 'other';

export interface ExpenseItem {
  id: string;
  title: string;
  category: ExpenseCategory;
  categoryName: string;
  amount: number;
  date: string;
  paymentMethod: 'cash' | 'bkash' | 'bank';
  note?: string;
}

export interface LedgerTransaction {
  id: string;
  date: string;
  type: 'credit' | 'debit'; // credit = income, debit = expense
  title: string;
  source: string;
  amount: number;
  paymentChannel: 'cash' | 'digital';
}

export interface PosCartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  unitPrice: number;
  subtotal: number;
}

export interface PosSaleReceipt {
  invoiceNo: string;
  date: string;
  customerPhone?: string;
  customerName?: string;
  items: PosCartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paidAmount: number;
  changeAmount: number;
  paymentMethod: 'cash' | 'bkash' | 'nagad';
  cashierName: string;
}
