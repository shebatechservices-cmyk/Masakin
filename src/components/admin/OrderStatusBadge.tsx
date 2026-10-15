'use client';

import React from 'react';

export type OrderStatusType = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

interface OrderStatusBadgeProps {
  status: OrderStatusType;
  onChangeStatus?: (newStatus: OrderStatusType) => void;
  interactive?: boolean;
}

export default function OrderStatusBadge({
  status,
  onChangeStatus,
  interactive = false
}: OrderStatusBadgeProps) {
  const styles = {
    pending: 'bg-amber-100 text-amber-900 border-amber-300',
    confirmed: 'bg-blue-100 text-blue-900 border-blue-300',
    shipped: 'bg-purple-100 text-purple-900 border-purple-300',
    delivered: 'bg-rose-50 text-rose-700 border-rose-200',
    cancelled: 'bg-rose-100 text-rose-900 border-rose-300',
  }[status] || 'bg-stone-100 text-stone-800 border-stone-200';

  const labels = {
    pending: 'অপেক্ষমাণ (Pending)',
    confirmed: 'কনফার্মড (Confirmed)',
    shipped: 'কুরিয়ারে প্রেরিত (Shipped)',
    delivered: 'ডেলিভার্ড (Delivered)',
    cancelled: 'বাতিল (Cancelled)',
  };

  if (!interactive) {
    return (
      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles}`}>
        {labels[status]}
      </span>
    );
  }

  return (
    <select
      value={status}
      onChange={(e) => onChangeStatus?.(e.target.value as OrderStatusType)}
      className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${styles}`}
    >
      <option value="pending">অপেক্ষমাণ (Pending)</option>
      <option value="confirmed">কনফার্মড (Confirmed)</option>
      <option value="shipped">কুরিয়ারে প্রেরিত (Shipped)</option>
      <option value="delivered">ডেলিভার্ড (Delivered)</option>
      <option value="cancelled">বাতিল (Cancelled)</option>
    </select>
  );
}
