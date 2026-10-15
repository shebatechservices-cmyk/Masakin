import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  subtitle?: string;
  icon: LucideIcon;
  badge?: { text: string; positive: boolean };
  color?: 'rose' | 'black' | 'green' | 'orange' | 'blue' | 'purple';
}

export default function StatsCard({
  title,
  value,
  subtext,
  subtitle,
  icon: Icon,
  badge,
  color = 'rose'
}: StatsCardProps) {
  const colorStyles = {
    rose: 'bg-rose-50 text-[#e11d48] border-rose-200',
    black: 'bg-zinc-100 text-zinc-900 border-zinc-300',
    green: 'bg-rose-50 text-rose-600 border-rose-200',
    orange: 'bg-orange-50 text-[#ea580c] border-orange-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  }[color];

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs flex items-start justify-between">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs font-bold text-zinc-500 block">{title}</span>
          {badge && (
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
              badge.positive ? 'bg-rose-50 text-[#e11d48] border border-rose-200' : 'bg-zinc-100 text-zinc-700'
            }`}>
              {badge.text}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-black text-zinc-950 tracking-tight">{value}</h3>
        {(subtext || subtitle) && (
          <span className="text-[11px] font-medium text-zinc-400 mt-1 block">
            {subtext || subtitle}
          </span>
        )}
      </div>

      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${colorStyles}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
