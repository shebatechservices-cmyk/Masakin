import { ProductCategory } from '@/types';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  count: number;
  image: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'womens',
    name: 'নারীদের রেডিমেড থ্রি-পিস',
    count: 36,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'আরামদায়ক সুতি, অর্গানজা ও জর্জেট রেডি-টু-ওয়্যার কালেকশন'
  },
  {
    id: 'kids',
    name: 'বাচ্চাদের রেডিমেড ফ্রক ও ড্রেস',
    count: 28,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    description: 'কোমল ফেব্রিকের রঙিন বেবি ড্রেস ও পার্টি ফ্রক'
  },
  {
    id: 'sharee',
    name: 'ঐতিহ্যবাহী জামদানি ও শাড়ি',
    count: 18,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    description: 'পার্টি ও উৎসবের জমকালো সিল্ক ও জামদানি শাড়ি'
  }
];
