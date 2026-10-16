'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, Tag, ArrowLeft, Barcode, ReceiptText, BookOpen } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAdminAuth();

  const links = [
    { href: '/admin', label: 'ড্যাশবোর্ড', icon: LayoutDashboard, exact: true },
    { href: '/admin/pos', label: 'POS কাউন্টার ও বারকোড', icon: Barcode },
    { href: '/admin/orders', label: 'অনলাইন অর্ডার সমূহ', icon: ShoppingBag },
    { href: '/admin/products', label: 'প্রোডাক্ট ও ট্রেন্ডিং', icon: Package },
    { href: '/admin/expenses', label: 'দোকানের খরচ (Expense)', icon: ReceiptText },
    { href: '/admin/ledger', label: 'একাউন্ট-লেজার (হিসাব)', icon: BookOpen, adminOnly: true },
    { href: '/admin/offers', label: 'শপ সেটিংস ও অফার', icon: Tag, adminOnly: true }
  ];

  return (
    <aside className="w-full md:w-60 bg-white border-r border-zinc-200 p-4 space-y-6 shrink-0">
      <div className="space-y-1">
        <span className="text-[10px] font-black tracking-wider text-zinc-400 uppercase px-3 block mb-2">
          মেনু নেভিগেশন
        </span>

        {links.map((link) => {
          if (link.adminOnly && user?.role !== 'admin') return null;
          const Icon = link.icon;
          const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                isActive
                  ? 'bg-[#e11d48] text-white shadow-xs'
                  : 'text-zinc-700 hover:bg-rose-50/70 hover:text-[#e11d48]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="pt-4 border-t border-zinc-100">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-500 hover:text-[#e11d48] transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ওয়েবসাইট হোমপেজ</span>
        </Link>
      </div>
    </aside>
  );
}
