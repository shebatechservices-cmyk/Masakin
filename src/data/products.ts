import { Product, ProductCategory } from '@/types';
import { WOMENS_PRODUCTS } from './womensProducts';
import { KIDS_PRODUCTS } from './kidsProducts';

// Re-exports for clean modular structure
export * from './categories';
export * from './districts';
export * from './testimonials';
export * from './womensProducts';
export * from './kidsProducts';

export const PRODUCTS: Product[] = [...WOMENS_PRODUCTS, ...KIDS_PRODUCTS];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getBestsellerProducts(): Product[] {
  return PRODUCTS.filter((p) => p.bestseller);
}
