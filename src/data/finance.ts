import { ExpenseItem, LedgerTransaction } from '@/types/finance';

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-101',
    title: 'দোকান ভাড়া (চলতি মাস)',
    category: 'rent',
    categoryName: 'দোকান ভাড়া',
    amount: 18000,
    date: '2026-10-01',
    paymentMethod: 'bank',
    note: 'মালিক মোতালেব সাহেবকে ব্যাংক ট্রান্সফার'
  },
  {
    id: 'exp-102',
    title: 'ফেসবুক ও টিকটক স্পন্সর বুস্টিং অ্যাড',
    category: 'ads',
    categoryName: 'বিজ্ঞাপন ও প্রমোশন',
    amount: 6500,
    date: '2026-10-04',
    paymentMethod: 'bkash',
    note: 'ডলারে ক্রেডিট কার্ড পেমেন্ট বিকাশ ব্যালেন্স থেকে'
  },
  {
    id: 'exp-103',
    title: 'গার্মেন্টস ব্র্যান্ডেড পলি ব্যাগ ও শপিং ব্যাগ (১০০০ পিস)',
    category: 'packaging',
    categoryName: 'প্যাকেজিং সামগ্রী',
    amount: 3200,
    date: '2026-10-05',
    paymentMethod: 'cash',
    note: 'চকবাজার থেকে কেনা'
  },
  {
    id: 'exp-104',
    title: 'দোকানের বিদ্যুৎ ও এসি বিল',
    category: 'utility',
    categoryName: 'বিদ্যুৎ ও সেবা বিল',
    amount: 2450,
    date: '2026-10-06',
    paymentMethod: 'bkash',
    note: 'ডেসকো পোস্টপেইড বিল'
  },
  {
    id: 'exp-105',
    title: 'স্টাফ বেতন ও দৈনিক নাস্তা খরচ',
    category: 'salary',
    categoryName: 'কর্মচারী বেতন ও ভাতা',
    amount: 12000,
    date: '2026-10-07',
    paymentMethod: 'cash',
    note: 'কাউন্টার সেলসম্যান ও প্যাকার'
  },
  {
    id: 'exp-106',
    title: 'রেডএক্স ও সুন্দরবন কুরিয়ার অগ্রিম চার্জ',
    category: 'courier',
    categoryName: 'কুরিয়ার ও ডেলিভারি',
    amount: 4500,
    date: '2026-10-08',
    paymentMethod: 'bkash',
    note: 'পার্সেল বুকিং ফি'
  }
];

export const INITIAL_LEDGER: LedgerTransaction[] = [
  {
    id: 'led-001',
    date: '2026-10-01',
    type: 'credit',
    title: 'কাউন্টার ক্যাশ সেলস (POS)',
    source: 'POS কাউন্টার বিক্রয়',
    amount: 28500,
    paymentChannel: 'cash'
  },
  {
    id: 'led-002',
    date: '2026-10-01',
    type: 'debit',
    title: 'দোকান ভাড়া পরিশোধ',
    source: 'দোকান ভাড়া',
    amount: 18000,
    paymentChannel: 'digital'
  },
  {
    id: 'led-003',
    date: '2026-10-03',
    type: 'credit',
    title: 'অনলাইন অর্ডার কুরিয়ার COD ক্যাশ কালেকশন',
    source: 'Steadfast Courier COD',
    amount: 34200,
    paymentChannel: 'digital'
  },
  {
    id: 'led-004',
    date: '2026-10-04',
    type: 'debit',
    title: 'ফেসবুক ও সোশ্যাল মিডিয়া অ্যাড',
    source: 'বিজ্ঞাপন ও প্রমোশন',
    amount: 6500,
    paymentChannel: 'digital'
  },
  {
    id: 'led-005',
    date: '2026-10-06',
    type: 'credit',
    title: 'বিকাশ ও নগদ ডিজিটাল সেলস (অনলাইন + অফলাইন)',
    source: 'বিকাশ মার্চেন্ট',
    amount: 19800,
    paymentChannel: 'digital'
  },
  {
    id: 'led-006',
    date: '2026-10-07',
    type: 'debit',
    title: 'স্টাফ বেতন ও পরিচালনা খরচ',
    source: 'কর্মচারী বেতন ও ভাতা',
    amount: 12000,
    paymentChannel: 'cash'
  },
  {
    id: 'led-007',
    date: '2026-10-08',
    type: 'credit',
    title: 'দোকানের কাউন্টার বারকোড সেলস',
    source: 'POS কাউন্টার বিক্রয়',
    amount: 22400,
    paymentChannel: 'cash'
  }
];
