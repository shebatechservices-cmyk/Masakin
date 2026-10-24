import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ShopDataProvider } from '@/context/ShopDataContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { PageControlProvider } from '@/context/PageControlContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import CartDrawer from '@/components/cart/CartDrawer';
import MobileStickyOrderBar from '@/components/layout/MobileStickyOrderBar';
import DevShortcutListener from '@/components/dev/DevShortcutListener';

export const metadata: Metadata = {
  title: 'মাসাকিন বস্ত্র বিতান (MASAKIN Bastrabitan) — প্রিমিয়াম রেডিমেড পোশাক',
  description: 'মাসাকিন বস্ত্র বিতানে পাচ্ছেন সেরা মানের রেডিমেড নারীদের থ্রি-পিস, বাচ্চাদের ফ্রক ও ড্রেস। সারা দেশে ক্যাশ অন ডেলিভারি ও দ্রুত শিপিং। হটলাইন: +88 01782-282282',
  keywords: 'মাসাকিন বস্ত্র বিতান, masakin bastrabitan, থ্রি-পিস, বাচ্চাদের ফ্রক, নারীদের পোশাক, রেডিমেড পোশাক, online shopping bd',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'মাসাকিন বস্ত্র বিতান (MASAKIN Bastrabitan)',
    description: 'প্রিমিয়াম কোয়ালিটির রেডিমেড পোশাক সরাসরি অর্ডার করুন সারা দেশে ক্যাশ অন ডেলিভারিতে।',
    locale: 'bn_BD',
    type: 'website',
    images: ['/images/logo.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#e11d48',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-['Hind_Siliguri',sans-serif] bg-white text-zinc-950 selection:bg-rose-100 selection:text-rose-900 pb-16 md:pb-0">
        <ShopDataProvider>
          <AdminAuthProvider>
            <PageControlProvider>
              <CartProvider>
                <Header />
                <CartDrawer />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <MobileNav />
                <WhatsAppButton />
                <MobileStickyOrderBar />
                <DevShortcutListener />
              </CartProvider>
            </PageControlProvider>
          </AdminAuthProvider>
        </ShopDataProvider>
      </body>
    </html>
  );
}
