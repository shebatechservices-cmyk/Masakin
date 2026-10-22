'use client';

import React, { useState } from 'react';
import { Video, Trash2, Link as LinkIcon } from 'lucide-react';
import { convertGoogleDriveLink } from '@/utils/googleDrive';
import MediaImageSlot from './MediaImageSlot';
import MediaLinkInput from './MediaLinkInput';

interface ProductMediaUploaderProps {
  images: string[];
  onChangeImages: (images: string[]) => void;
  videoUrl: string;
  onChangeVideo: (url: string) => void;
}

export default function ProductMediaUploader({
  images,
  onChangeImages,
  videoUrl,
  onChangeVideo
}: ProductMediaUploaderProps) {
  const [activeLinkSlot, setActiveLinkSlot] = useState<number | 'video' | null>(null);
  const [linkInputValue, setLinkInputValue] = useState('');

  const handleSingleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('ছবির সাইজ সর্বোচ্চ ৫MB হতে পারে!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) {
        const updated = [...images];
        updated[index] = res;
        onChangeImages(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      alert('ভিডিওর সাইজ সর্বোচ্চ ২০MB হতে পারে!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      if (res) onChangeVideo(res);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyLink = () => {
    const converted = convertGoogleDriveLink(linkInputValue);
    if (activeLinkSlot === 'video') {
      onChangeVideo(converted);
    } else if (typeof activeLinkSlot === 'number') {
      const updated = [...images];
      updated[activeLinkSlot] = converted;
      onChangeImages(updated);
    }
    setActiveLinkSlot(null);
    setLinkInputValue('');
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...images];
    updated[index] = '';
    onChangeImages(updated);
  };

  return (
    <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-200/80 space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-[11px] text-rose-950">
          মিডিয়া আপলোড (+ বাটনে ট্যাপ করুন)
        </span>
        <span className="text-[10px] text-zinc-500">৩টি ছবি + ১টি শর্ট ভিডিও</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2].map((idx) => (
          <MediaImageSlot
            key={idx}
            index={idx}
            image={images[idx]}
            onUpload={handleSingleImageUpload}
            onRemove={handleRemoveImage}
            onOpenLinkModal={(i) => {
              setActiveLinkSlot(i);
              setLinkInputValue(images[i] || '');
            }}
          />
        ))}

        {/* Short Video Slot */}
        <div className="relative aspect-square rounded-2xl border-2 border-dashed border-zinc-400 bg-zinc-900 overflow-hidden flex flex-col items-center justify-center group hover:border-[#e11d48] transition">
          {videoUrl ? (
            <>
              <video src={videoUrl} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChangeVideo('')}
                className="absolute top-1 right-1 p-1 bg-black/80 text-white rounded-full hover:bg-rose-600 transition cursor-pointer"
                title="ভিডিও মুছুন"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <span className="absolute bottom-0 inset-x-0 bg-rose-600 text-white text-[9px] font-bold text-center py-0.5">
                ভিডিও যুক্ত
              </span>
            </>
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-1 text-center">
              <div className="w-7 h-7 rounded-full bg-zinc-800 text-rose-400 flex items-center justify-center mb-1 group-hover:scale-110 transition">
                <Video className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-white">+ ভিডিও</span>
              <input
                type="file"
                accept="video/mp4,video/webm"
                className="hidden"
                onChange={handleVideoUpload}
              />
            </label>
          )}
          <button
            type="button"
            onClick={() => {
              setActiveLinkSlot('video');
              setLinkInputValue(videoUrl || '');
            }}
            className="absolute bottom-1 left-1 p-0.5 bg-black/80 text-zinc-300 rounded border border-zinc-700 hover:text-rose-400 text-[8px] flex items-center gap-0.5 cursor-pointer"
            title="ড্রাইভ/ওয়েব লিঙ্ক"
          >
            <LinkIcon className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {activeLinkSlot !== null && (
        <MediaLinkInput
          slot={activeLinkSlot}
          value={linkInputValue}
          onChange={setLinkInputValue}
          onApply={handleApplyLink}
          onClose={() => setActiveLinkSlot(null)}
        />
      )}
    </div>
  );
}
