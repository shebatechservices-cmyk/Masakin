export interface DevShortcutConfig {
  key: string; // e.g. 'D', 'M', 'K'
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  masterKey: string;
}

export interface PageControlItem {
  id: string;
  path: string;
  name: string;
  description: string;
  isEnabled: boolean;
  isCustom?: boolean;
}

export const DEFAULT_DEV_SHORTCUT: DevShortcutConfig = {
  key: 'D',
  ctrlKey: true,
  shiftKey: true,
  altKey: false,
  masterKey: 'dev123'
};

export const DEFAULT_MANAGED_PAGES: PageControlItem[] = [
  {
    id: 'page-shop',
    path: '/shop',
    name: 'শপ ও ক্যাটালগ',
    description: 'সকল প্রোডাক্ট প্রদর্শন ও ফিল্টারিং পেইজ',
    isEnabled: true
  },
  {
    id: 'page-about',
    path: '/about',
    name: 'আমাদের গল্প (About Us)',
    description: 'ব্র্যান্ড পরিচিতি ও শোরুমের বিস্তারিত',
    isEnabled: true
  },
  {
    id: 'page-contact',
    path: '/contact',
    name: 'যোগাযোগ (Contact Us)',
    description: 'কাস্টমার কেয়ার, ফোন ও ঠিকানা',
    isEnabled: true
  },
  {
    id: 'page-policies',
    path: '/policies',
    name: 'সহায়তা ও পলিসি',
    description: 'রিটার্ন, রিফান্ড ও শিপিং নীতি',
    isEnabled: true
  },
  {
    id: 'page-account',
    path: '/account',
    name: 'অর্ডার ট্র্যাকিং',
    description: 'কাস্টমার অর্ডার স্ট্যাটাস ট্র্যাকিং পেইজ',
    isEnabled: true
  },
  {
    id: 'page-pos',
    path: '/admin/pos',
    name: 'কাউন্টার POS বিলিং',
    description: 'দোকানের অফলাইন বিক্রির পিওএস সিস্টেম',
    isEnabled: true
  }
];
