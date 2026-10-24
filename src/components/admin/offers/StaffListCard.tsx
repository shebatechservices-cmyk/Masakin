'use client';

import React from 'react';
import { Users, ShieldCheck, UserCheck, Key, Lock } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function StaffListCard() {
  const { user } = useAdminAuth();

  const members = [
    {
      id: 'usr-admin',
      name: 'প্রধান পরিচালক / শপ মালিক',
      email: 'admin@masakin.com',
      role: 'admin',
      roleLabel: 'সুপার এডমিন (Owner)',
      badgeColor: 'bg-rose-50 text-[#e11d48] border-rose-200',
      icon: ShieldCheck,
      permissions: ['ড্যাশবোর্ড', 'POS কাউন্টার', 'অনলাইন অর্ডার', 'প্রোডাক্ট', 'দোকানের খরচ (Expense)', 'হিসাব লেজার', 'শপ সেটিংস ও সিকিউরিটি'],
      status: 'সক্রিয়'
    },
    {
      id: 'usr-staff',
      name: 'অর্ডার ও বিক্রয় কর্মী',
      email: 'staff@masakin.com',
      role: 'staff',
      roleLabel: 'স্টাফ অপারেটর',
      badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
      icon: UserCheck,
      permissions: ['POS কাউন্টার ও বারকোড', 'অনলাইন অর্ডার ম্যানেজমেন্ট', 'প্রোডাক্ট তালিকা দেখা'],
      restricted: ['দোকানের খরচ (Expense)', 'হিসাব লেজার', 'শপ সেটিংস ও সিকিউরিটি'],
      status: 'সক্রিয়'
    }
  ];

  if (user?.role !== 'admin') return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-rose-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-zinc-900 leading-tight">
              এডমিন ও স্টাফ তালিকা
            </h2>
            <span className="text-[11px] text-zinc-400 font-medium">
              কর্মীদের ভূমিকা, ইমেইল ও এক্সেস পারমিশন তালিকা
            </span>
          </div>
        </div>
        <span className="text-xs font-bold text-zinc-400 font-mono">মোট ২ জন</span>
      </div>

      <div className="space-y-3">
        {members.map((member) => {
          const Icon = member.icon;
          return (
            <div
              key={member.id}
              className="p-4 rounded-2xl border border-zinc-200/70 bg-zinc-50/50 hover:bg-white hover:border-rose-200 transition space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 shadow-2xs">
                    <Icon className="w-4 h-4 text-[#e11d48]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-zinc-900">{member.name}</h3>
                    <p className="text-[11px] text-zinc-500 font-mono">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${member.badgeColor}`}>
                    {member.roleLabel}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{member.status}</span>
                  </span>
                </div>
              </div>

              {/* Permissions list */}
              <div className="text-[11px] pt-1 border-t border-zinc-100 flex flex-wrap gap-1.5">
                <span className="text-zinc-400 font-bold self-center text-[10px]">এক্সেস:</span>
                {member.permissions.map((p) => (
                  <span key={p} className="px-2 py-0.5 rounded bg-white text-zinc-700 border border-zinc-200 text-[10px] font-medium">
                    ✓ {p}
                  </span>
                ))}
                {member.restricted?.map((r) => (
                  <span key={r} className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-medium flex items-center gap-0.5">
                    <Lock className="w-2.5 h-2.5" />
                    <span className="line-through">{r}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200/80 text-[11px] text-rose-950 flex items-start gap-2">
        <Key className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
        <p>
          এডমিন বা স্টাফদের পাসওয়ার্ড পরিবর্তন করতে পাশের <strong>&apos;লগইন সিকিউরিটি ও পাসওয়ার্ড&apos;</strong> কার্ডটি ব্যবহার করুন।
        </p>
      </div>
    </div>
  );
}
