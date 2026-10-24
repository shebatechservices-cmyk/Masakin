'use client';

import React, { useState, useEffect } from 'react';
import DevConsoleModal from './DevConsoleModal';
import { DEFAULT_DEV_SHORTCUT, DevShortcutConfig } from '@/types/dev';

export default function DevShortcutListener() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let cfg: DevShortcutConfig = DEFAULT_DEV_SHORTCUT;
      try {
        const saved = localStorage.getItem('masakin_dev_shortcut_config');
        if (saved) cfg = JSON.parse(saved);
      } catch {}

      // Check configured modifiers
      const ctrlMatch = cfg.ctrlKey ? e.ctrlKey || e.metaKey : true;
      const shiftMatch = cfg.shiftKey ? e.shiftKey : true;
      const altMatch = cfg.altKey ? e.altKey : true;
      const keyMatch = e.key.toUpperCase() === (cfg.key || 'D').toUpperCase();

      // Check fallback: default Ctrl + Shift + D
      const isDefaultFallback = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd');

      if ((ctrlMatch && shiftMatch && altMatch && keyMatch) || isDefaultFallback) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return <DevConsoleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
