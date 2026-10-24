'use client';

import React, { useState, useEffect } from 'react';
import DevConsoleModal from './DevConsoleModal';

export default function DevShortcutListener() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut: Ctrl + Shift + D OR Meta (Cmd) + Shift + D
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
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
