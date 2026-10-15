import React from 'react';
import Image from 'next/image';
import { Camera, ExternalLink } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const SOCIAL_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    tag: '@masakingarments',
    likes: '1.2k'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    tag: '#JamdaniStyle',
    likes: '890'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    tag: '#MasakinKabli',
    likes: '2.4k'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    tag: '#FestiveVibe',
    likes: '950'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
    tag: '#CasualPolo',
    likes: '1.1k'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
    tag: '#KidsFestive',
    likes: '740'
  }
];

export default function SocialGallery() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest mb-2">
            <InstagramIcon className="w-4 h-4" />
            <span>সোশ্যাল মিডিয়া গ্যালারি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            কাস্টমারদের পছন্দের মুহূর্ত ও স্টাইল
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            ট্যাগ করুন <strong className="text-rose-600">#MasakinBastrabitan</strong> আর ফিচার্ড হন আমাদের সোশ্যাল পেজে।
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_POSTS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200 border border-slate-200"
            >
              <Image
                src={item.image}
                alt="Masakin Customer Showcase"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-white text-center">
                <InstagramIcon className="w-6 h-6 mb-1 text-white" />
                <span className="text-[11px] font-bold">{item.tag}</span>
                <span className="text-[10px] text-slate-200 mt-0.5">❤️ {item.likes}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
