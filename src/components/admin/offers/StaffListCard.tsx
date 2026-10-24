'use client';

import React, { useState } from 'react';
import { Users, UserPlus, ShieldCheck, UserCheck, Trash2 } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import StaffCreateModal from './StaffCreateModal';

export default function StaffListCard() {
  const { users, user, deleteUser } = useAdminAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (user?.role !== 'admin' && user?.role !== 'super_admin') return null;

  const staffMembers = users.filter((u) => u.role === 'staff');
  const adminMembers = users.filter((u) => u.role === 'admin');

  return (
    <>
      <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-rose-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-zinc-900 leading-tight">
                এডমিন ও স্টাফ টিম
              </h2>
              <span className="text-[11px] text-zinc-400 font-medium">
                কর্মীদের তালিকা ও নতুন স্টাফ তৈরি করুন
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ নতুন স্টাফ</span>
          </button>
        </div>

        <div className="space-y-3">
          {/* Shop Admin section */}
          {adminMembers.map((adm) => (
            <div
              key={adm.id}
              className="p-3.5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-rose-200 flex items-center justify-center text-[#e11d48]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-zinc-900">{adm.name}</h3>
                    <p className="text-[11px] text-zinc-500 font-mono">{adm.email}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#e11d48] border border-rose-200">
                  শপ এডমিন (মালিক)
                </span>
              </div>
              <p className="text-[10px] text-zinc-500">
                এক্সেস: ড্যাশবোর্ড, POS, অর্ডার, প্রোডাক্ট, খরচ, লেজার ও শপ সেটিংস।
              </p>
            </div>
          ))}

          {/* Dynamic Staff section */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-zinc-500 block mb-2">
              স্টাফ সদস্য সমূহ ({staffMembers.length} জন):
            </span>
            {staffMembers.length === 0 ? (
              <p className="text-xs text-zinc-400 italic py-2">কোনো স্টাফ কর্মী যুক্ত করা হয়নি।</p>
            ) : (
              <div className="space-y-2">
                {staffMembers.map((staff) => (
                  <div
                    key={staff.id}
                    className="p-3 rounded-2xl border border-zinc-200/80 bg-zinc-50 flex items-center justify-between hover:bg-white transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-zinc-900">{staff.name}</h4>
                        <p className="text-[10px] text-zinc-500 font-mono">{staff.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        POS ও অর্ডার
                      </span>
                      {staff.id !== 'usr-staff-01' && (
                        <button
                          type="button"
                          onClick={() => deleteUser(staff.id)}
                          className="p-1 text-zinc-400 hover:text-rose-600 transition cursor-pointer"
                          title="স্টাফ মুছুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <StaffCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
