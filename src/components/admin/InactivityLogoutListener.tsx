'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';

const INACTIVITY_LIMIT_MS = 5 * 60 * 1000; // 5 minutes (300,000 ms)
const STORAGE_KEY = 'masakin_last_activity';

export default function InactivityLogoutListener() {
  const { isAuthenticated, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isAuthenticated) return;

    // Set initial activity time
    localStorage.setItem(STORAGE_KEY, Date.now().toString());

    const updateActivity = () => {
      const now = Date.now();
      // Throttle localStorage updates to once every 2 seconds
      if (now - lastUpdateRef.current > 2000) {
        lastUpdateRef.current = now;
        localStorage.setItem(STORAGE_KEY, now.toString());
      }
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((event) => window.addEventListener(event, updateActivity, { passive: true }));

    // Periodic check every 5 seconds for inactivity timeout
    const interval = setInterval(() => {
      const savedTime = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      const elapsed = Date.now() - (savedTime || Date.now());

      if (elapsed >= INACTIVITY_LIMIT_MS) {
        logout();
        router.push('/sd?reason=inactivity');
      }
    }, 5000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, updateActivity));
      clearInterval(interval);
    };
  }, [isAuthenticated, logout, router, pathname]);

  return null;
}
