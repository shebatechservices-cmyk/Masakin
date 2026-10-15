import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ReelsShowcase from '@/components/home/ReelsShowcase';
import PromoBanner from '@/components/home/PromoBanner';
import OnePageOrderSection from '@/components/home/OnePageOrderSection';
import USPSection from '@/components/home/USPSection';
import Testimonials from '@/components/home/Testimonials';
import SocialGallery from '@/components/home/SocialGallery';
import Newsletter from '@/components/home/Newsletter';
import RecentSalesToast from '@/components/home/RecentSalesToast';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* 1. Hero Section Slider */}
      <HeroSlider />

      {/* 2. Category Showcase Grid */}
      <CategoryGrid />

      {/* 3. Featured / Bestseller Products */}
      <FeaturedProducts />

      {/* 4. Reels & Video Showcase (New Video Commerce) */}
      <ReelsShowcase />

      {/* 5. Promotional Offer Banner & 1-Click Coupon */}
      <PromoBanner />

      {/* 6. One-Page Quick Order Funnel (সরাসরি ১-পেইজে অর্ডার) */}
      <OnePageOrderSection />

      {/* 7. USP / Why Buy From Us */}
      <USPSection />

      {/* 8. Customer Reviews & Testimonials */}
      <Testimonials />

      {/* 9. Instagram & Customer Social Showcase */}
      <SocialGallery />

      {/* 10. Newsletter & Instant Offer Signup */}
      <Newsletter />

      {/* 11. Live Recent Sales Social Proof Toast (Floating) */}
      <RecentSalesToast />
    </div>
  );
}
