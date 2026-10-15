'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, DollarSign, Clock, Package, Plus, ArrowRight, PhoneCall, Barcode } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useShopData } from '@/context/ShopDataContext';
import StatsCard from '@/components/admin/StatsCard';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const { orders, products, ledger, updateOrderStatus } = useShopData();

  const totalSales = ledger
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingOrders = orders.filter((o) => o.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Welcome Bar: Premium Black & Rose */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#09090b] via-[#18181b] to-[#09090b] text-white p-6 rounded-3xl shadow-md border border-zinc-800">
        <div>
          <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
            {user?.role === 'admin' ? 'মালিক / ম্যানেজার পোর্টাল' : 'কাউন্টার স্টাফ পোর্টাল'}
          </span>
          <h1 className="text-xl sm:text-2xl font-black mt-0.5">
            স্বাগতম, {user?.name || 'মাসাকিন টিম'}!
          </h1>
          <p className="text-xs text-zinc-300 mt-1">
            আজকের লাইভ অর্ডার, কাউন্টার সেলস ও ইনভেন্টরি পরিস্থিতি এক নজরে দেখুন।
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/pos"
            className="px-4 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs rounded-xl transition shadow-md shadow-rose-950/40 flex items-center gap-1.5"
          >
            <Barcode className="w-4 h-4" />
            <span>POS কাউন্টার বিল</span>
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition border border-zinc-700 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পোশাক</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="মোট কাস্টমার অর্ডার"
          value={`${orders.length} টি`}
          subtext="অনলাইন শপ থেকে"
          icon={ShoppingBag}
          badge={{ text: 'লাইভ', positive: true }}
          color="rose"
        />
        <StatsCard
          title="মোট বিক্রয় ও আয়"
          value={`৳${totalSales.toLocaleString()}`}
          subtext="অনলাইন ও অফলাইন মিলিয়ে"
          icon={DollarSign}
          badge={{ text: 'চলতি হিসাব', positive: true }}
          color="black"
        />
        <StatsCard
          title="অপেক্ষমাণ অর্ডার"
          value={`${pendingOrders.length} টি`}
          subtext="কনফার্মেশনের অপেক্ষায়"
          icon={Clock}
          badge={{ text: pendingOrders.length > 0 ? 'অ্যাকশন নিন' : 'সব ক্লিয়ার', positive: pendingOrders.length === 0 }}
          color="rose"
        />
        <StatsCard
          title="মোট পোশাকের স্টক"
          value={`${products.length} প্রকার`}
          subtext="অ্যাক্টিভ ইনভেন্টরি"
          icon={Package}
          color="black"
        />
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#e11d48]" />
            <h2 className="font-extrabold text-base text-zinc-950">
              সাম্প্রতিক অর্ডার সমূহ ({orders.length})
            </h2>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#e11d48] hover:underline flex items-center gap-1"
          >
            <span>সব অর্ডার দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="py-8 text-center text-zinc-400 text-xs">
            এখনও কোনো অর্ডার আসেনি। হোমপেজের অর্ডার ফর্ম থেকে টেস্ট অর্ডার করুন।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 text-zinc-600 font-bold border-b border-zinc-200">
                <tr>
                  <th className="py-3 px-3">অর্ডার আইডি</th>
                  <th className="py-3 px-3">গ্রাহক ও মোবাইল</th>
                  <th className="py-3 px-3">পোশাক</th>
                  <th className="py-3 px-3">মূল্য</th>
                  <th className="py-3 px-3">পেমেন্ট</th>
                  <th className="py-3 px-3">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-50/60">
                    <td className="py-3 px-3 font-mono font-black text-[#e11d48]">
                      #{ord.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-zinc-900">{ord.customer?.fullName}</div>
                      <a href={`tel:${ord.customer?.phone}`} className="text-zinc-500 hover:text-rose-600 font-mono text-[11px] flex items-center gap-1">
                        <PhoneCall className="w-3 h-3 text-[#e11d48]" />
                        <span>{ord.customer?.phone}</span>
                      </a>
                    </td>
                    <td className="py-3 px-3">
                      <div className="truncate max-w-xs font-semibold">{ord.items?.[0]?.product?.name || 'পোশাক'}</div>
                      <span className="text-[10px] text-zinc-400">সাইজ: {ord.items?.[0]?.selectedSize}</span>
                    </td>
                    <td className="py-3 px-3 font-black text-zinc-950">
                      ৳{ord.total}
                    </td>
                    <td className="py-3 px-3 uppercase text-[11px] font-bold text-zinc-600">
                      {ord.customer?.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : ord.customer?.paymentMethod}
                    </td>
                    <td className="py-3 px-3">
                      <OrderStatusBadge
                        status={ord.status || 'pending'}
                        interactive
                        onChangeStatus={(s) => updateOrderStatus(ord.id, s as any)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
