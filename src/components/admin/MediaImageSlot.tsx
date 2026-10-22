'use client';

import React from 'react';
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';

interface MediaImageSlotProps {
  index: number;
  image: string;
  onUpload: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  onOpenLinkModal: (index: number) => void;
}

export default function MediaImageSlot({
  index,
  image,
  onUpload,
  onRemove,
  onOpenLinkModal
}: MediaImageSlotProps) {
  const label = index === 0 ? 'প্রধান ছবি' : `ছবি ${index + 1}`;

  return (
    <div className="relative aspect-square rounded-2xl border-2 border-dashed border-rose-300 bg-white overflow-hidden flex flex-col items-center justify-center group hover:border-[#e11d48] transition">
      {image ? (
        <>
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-rose-600 transition cursor-pointer"
            title="মুছুন"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
            {label}
          </span>
        </>
      ) : (
        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-1 text-center">
          <div className="w-7 h-7 rounded-full bg-rose-100 text-[#e11d48] flex items-center justify-center mb-1 group-hover:scale-110 transition">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-zinc-700">
            {label} {index === 0 && '*'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onUpload(index, e)}
          />
        </label>
      )}
      <button
        type="button"
        onClick={() => onOpenLinkModal(index)}
        className="absolute bottom-1 left-1 p-0.5 bg-white/90 text-zinc-700 rounded border border-zinc-200 hover:text-rose-600 text-[8px] flex items-center gap-0.5 cursor-pointer"
        title="লিংক দিন"
      >
        <LinkIcon className="w-2.5 h-2.5" />
      </button>
    </div>
  );
}
