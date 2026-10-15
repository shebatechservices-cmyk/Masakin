# মাসাকিন গার্মেন্টস — ই-কমার্স প্ল্যাটফর্ম (Masakin Garments)

একটি আধুনিক, মোবাইল-ফার্স্ট ও হাই-কনভার্সন ই-কমার্স ওয়েব অ্যাপ্লিকেশন। Next.js 15 (App Router), React 19, TypeScript এবং Tailwind CSS দিয়ে নির্মিত।

---

## 📌 আমাদের মূল আর্কিটেকচার নীতি (Core Rules)

1. **সর্বদা ছোট ও মডুলার কোড ফাইল (Small & Modular Code Files):**
   - কোনো ফাইল অপ্রয়োজনীয় বড় ("God file") করা যাবে না। প্রতিটি ফাইল ১০০-১৫০ লাইনের মধ্যে এবং একটি নির্দিষ্ট দায়িত্ব পালন করবে।
   - এর ফলে যেকোনো বাগ খুব দ্রুত খুঁজে বের করা এবং অন্য কোথাও কোনো প্রভাব না ফেলে ফিক্স করা যায়।

2. **সহজ ম্যানুয়াল ডেটা ম্যানেজমেন্ট (Manual Data Entry Friendly):**
   - অধিকাংশ ডেটা (যেমন: পণ্য, ছবি, মূল্য, সাইজ, ক্যাটাগরি, রিভিউ, জেলা) ব্যবহারকারী সরাসরি ফাইল থেকে সহজেই পরিবর্তন করতে পারবেন।

---

## 📂 ডেটা ফাইলসমূহ ও ম্যানুয়াল পরিবর্তনের নির্দেশিকা

| আপনি যা পরিবর্তন করতে চান | ফাইলের লোকেশন | কীভাবে করবেন |
|---|---|---|
| **নতুন পণ্য যোগ / পণ্যের নাম, দাম, ছবি, সাইজ পরিবর্তন** | [`src/data/products.ts`](file:///home/sheba/Masakin/src/data/products.ts) | `PRODUCTS` অ্যারেতে নতুন অবজেক্ট যোগ করুন বা বর্তমান অবজেক্ট এডিট করুন। |
| **ক্যাটাগরি যোগ বা এডিট** | [`src/data/categories.ts`](file:///home/sheba/Masakin/src/data/categories.ts) | `CATEGORIES` অ্যারেতে ক্যাটাগরি নাম, ছবি ও বিবরণ পরিবর্তন করুন। |
| **কাস্টমার রিভিউ ও টেস্টমোনিয়ালস** | [`src/data/testimonials.ts`](file:///home/sheba/Masakin/src/data/testimonials.ts) | `TESTIMONIALS` অ্যারেতে ক্রেতার নাম, মন্তব্য ও রেটিং পরিবর্তন করুন। |
| **ডেলিভারির জেলা বা শহরসমূহ** | [`src/data/districts.ts`](file:///home/sheba/Masakin/src/data/districts.ts) | `BANGLADESH_DISTRICTS` অ্যারেতে নতুন জেলা বা এলাকা যোগ করুন। |
| **হটলাইন / মোবাইল / শোরুম ঠিকানা** | [`src/components/layout/Footer.tsx`](file:///home/sheba/Masakin/src/components/layout/Footer.tsx)<br>[`src/components/layout/AnnouncementBar.tsx`](file:///home/sheba/Masakin/src/components/layout/AnnouncementBar.tsx) | ফোন নম্বর, ঠিকানা ও সোশ্যাল লিংক পরিবর্তন করুন। |
| **বিকাশ ও নগদ পেমেন্ট নম্বর** | [`src/components/checkout/PaymentMethodSelector.tsx`](file:///home/sheba/Masakin/src/components/checkout/PaymentMethodSelector.tsx) | বিকাশ বা নগদ পার্সোনাল/মার্চেন্ট নম্বর পরিবর্তন করুন। |
| **হোমপেজ ব্যানার / স্লাইডার** | [`src/components/home/HeroSlider.tsx`](file:///home/sheba/Masakin/src/components/home/HeroSlider.tsx) | `HERO_SLIDES` অ্যারেতে নতুন ব্যানার টেক্সট ও ইমেজ লিঙ্ক দিন। |

---

## 🧩 ছোট ও মডুলার কম্পোনেন্ট আর্কিটেকচার

```
src/
├── app/
│   ├── page.tsx                    # ল্যান্ডিং পেজ (৩৯ লাইন)
│   ├── shop/page.tsx               # ক্যাটালগ পেজ (১৭৫ লাইন)
│   ├── product/[id]/page.tsx       # প্রোডাক্ট ডিটেইল (১৪১ লাইন)
│   ├── cart/page.tsx               # কার্ট পেজ (৮৭ লাইন)
│   ├── checkout/page.tsx           # চেকআউট পেজ (১৭৪ লাইন)
│   ├── order-success/page.tsx      # কনফার্মেশন পেজ
│   ├── about/page.tsx              # আমাদের সম্পর্কে
│   ├── contact/page.tsx            # কন্টাক্ট পেজ
│   └── policies/page.tsx           # পলিসি পেজ
├── components/
│   ├── checkout/
│   │   ├── DeliveryForm.tsx        # গ্রাহকের নাম, ফোন ও ঠিকানা
│   │   ├── PaymentMethodSelector.tsx # ক্যাশ অন ডেলিভারি, বিকাশ ও নগদ
│   │   └── CheckoutSummary.tsx     # অর্ডার হিসাব ও সাবমিট বাটন
│   ├── product/
│   │   ├── ProductCard.tsx         # কার্ড গ্রিড আইটেম
│   │   ├── ProductGallery.tsx      # ছবি ও থাম্বনেইল
│   │   ├── ProductActions.tsx      # সাইজ, কালার, কার্ট ও হোয়াটসঅ্যাপ
│   │   ├── ProductInfoTabs.tsx     # ফেব্রিক কেয়ার ও শিপিং ইনফো
│   │   └── SizeGuideModal.tsx      # সাইজ চার্ট মোডাল
│   ├── shop/
│   │   ├── ShopHeader.tsx          # সার্চ ও সর্টিং বার
│   │   ├── ShopFilters.tsx         # ক্যাটাগরি, মূল্য, সাইজ ও কালার ফিল্টার
│   │   └── MobileFilterDrawer.tsx  # মোবাইলের ফিল্টার মোডাল
│   ├── cart/
│   │   ├── CartItemList.tsx        # কার্টের আইটেম তালিকা
│   │   ├── CartSummaryCard.tsx     # ডেলিভারি এরিয়া, কুপন ও টোটাল
│   │   └── EmptyCart.tsx           # খালি কার্ট ভিউ
│   └── layout/
│       ├── AnnouncementBar.tsx     # শীর্ষ অফার বার
│       ├── Header.tsx              # মূল নেভবার ও সার্চ
│       ├── Footer.tsx              # ফুটার ও পেমেন্ট পার্টনার লোগো
│       ├── MobileNav.tsx           # মোবাইলের ফিক্সড বটম বার
│       └── WhatsAppButton.tsx      # ফ্লোটিং হোয়াটসঅ্যাপ চ্যাট
└── data/
    ├── products.ts                 # প্রোডাক্টস ডাটা
    ├── categories.ts               # ক্যাটাগরি ডাটা
    ├── testimonials.ts             # কাস্টমার রিভিউ
    └── districts.ts                # ৬৪ জেলার তালিকা
```

---

## 🚀 প্রোজেক্ট রান করার নিয়ম

```bash
# ডেভেলপমেন্ট সার্ভার চালু করতে:
npm run dev

# প্রোডাকশন বিল্ড তৈরি করতে:
npm run build

# প্রোডাকশন সার্ভার চালু করতে:
npm run start
```
ব্রাউজারে খুলুন: `http://localhost:3000`
