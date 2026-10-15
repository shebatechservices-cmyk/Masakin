'use client';

import React, { useState } from 'react';
import { Search, Phone, MapPin } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useShopData } from '@/context/ShopDataContext';
import OrderStatusBadge, { OrderStatusType } from '@/components/admin/OrderStatusBadge';

export default function AdminOrdersPage() {
  const { isAuthenticated } = useAdminAuth();
  const { orders, updateOrderStatus } = useShopData();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.phone?.includes(search);
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
          অনলাইন কাস্টমার অর্ডার ম্যানেজমেন্ট
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          লাইভ অর্ডার কনফার্ম করুন, সরাসরি ফোনে কথা বলুন এবং কুরিয়ার স্ট্যাটাস আপডেট করুন।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="অর্ডার আইডি বা মোবাইল দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-xs bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'সকল অর্ডার' },
            { id: 'pending', label: 'অপেক্ষমাণ' },
            { id: 'confirmed', label: 'নিশ্চিত' },
            { id: 'delivered', label: 'ডেলিভার্ড' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                filterStatus === st.id
                  ? 'bg-[#09090b] text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Table */}
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs overflow-x-auto">
        {filteredOrders.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 text-xs">
            কোনো অর্ডার পাওয়া যায়নি।
          </div>
        ) : (
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 text-zinc-600 font-bold border-b border-zinc-200">
              <tr>
                <th className="py-3 px-3">অর্ডার আইডি</th>
                <th className="py-3 px-3">গ্রাহক ও কল</th>
                <th className="py-3 px-3">ঠিকানা ও জেলা</th>
                <th className="py-3 px-3">আইটেম বিবরণ</th>
                <th className="py-3 px-3">মোট টাকা</th>
                <th className="py-3 px-3">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-rose-50/20">
                  <td className="py-3 px-3 font-mono font-black text-[#e11d48]">
                    #{ord.id}
                    <span className="block text-[10px] text-zinc-400 font-sans">{ord.date}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-zinc-900">{ord.customer?.fullName}</div>
                    <a
                      href={`tel:${ord.customer?.phone}`}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#e11d48] hover:underline font-bold mt-0.5"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{ord.customer?.phone}</span>
                    </a>
                  </td>
                  <td className="py-3 px-3 max-w-xs">
                    <div className="flex items-start gap-1 text-[11px] text-stone-600">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{ord.customer?.address}, {ord.customer?.district}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-stone-800 truncate max-w-xs">
                      {ord.items?.[0]?.product?.name || 'পোশাক'}
                    </div>
                    <span className="text-[10px] text-stone-500">
                      সাইজ: {ord.items?.[0]?.selectedSize} | পরিমাণ: {ord.items?.[0]?.quantity || 1}টি
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-black text-stone-900 text-sm">৳{ord.total}</span>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">
                      {ord.customer?.paymentMethod}
                    </span>
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
        )}
      </div>
    </div>
  );
}
