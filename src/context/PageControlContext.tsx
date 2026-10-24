'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageControlItem, DEFAULT_MANAGED_PAGES } from '@/types/dev';

interface PageControlContextType {
  pages: PageControlItem[];
  togglePage: (id: string) => void;
  isPageEnabled: (path: string) => boolean;
  addCustomPage: (item: { path: string; name: string; description: string }) => boolean;
  deletePage: (id: string) => void;
  resetPagesToDefault: () => void;
}

const PageControlContext = createContext<PageControlContextType | undefined>(undefined);

export const PageControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<PageControlItem[]>(DEFAULT_MANAGED_PAGES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('masakin_managed_pages');
      if (saved) {
        setPages(JSON.parse(saved));
      } else {
        localStorage.setItem('masakin_managed_pages', JSON.stringify(DEFAULT_MANAGED_PAGES));
      }
    } catch {}
  }, []);

  const savePages = (updated: PageControlItem[]) => {
    setPages(updated);
    try {
      localStorage.setItem('masakin_managed_pages', JSON.stringify(updated));
    } catch {}
  };

  const togglePage = (id: string) => {
    const updated = pages.map((p) => (p.id === id ? { ...p, isEnabled: !p.isEnabled } : p));
    savePages(updated);
  };

  const isPageEnabled = (path: string): boolean => {
    const matched = pages.find((p) => p.path === path || path.startsWith(p.path + '/'));
    if (!matched) return true; // Unmanaged pages default to enabled
    return matched.isEnabled;
  };

  const addCustomPage = (item: { path: string; name: string; description: string }): boolean => {
    const cleanPath = item.path.trim().startsWith('/') ? item.path.trim() : `/${item.path.trim()}`;
    if (pages.some((p) => p.path.toLowerCase() === cleanPath.toLowerCase())) {
      return false;
    }

    const newPage: PageControlItem = {
      id: `custom-page-${Date.now()}`,
      path: cleanPath,
      name: item.name.trim(),
      description: item.description.trim(),
      isEnabled: true,
      isCustom: true
    };

    savePages([...pages, newPage]);
    return true;
  };

  const deletePage = (id: string) => {
    const updated = pages.filter((p) => p.id !== id);
    savePages(updated);
  };

  const resetPagesToDefault = () => {
    savePages(DEFAULT_MANAGED_PAGES);
  };

  return (
    <PageControlContext.Provider
      value={{
        pages,
        togglePage,
        isPageEnabled,
        addCustomPage,
        deletePage,
        resetPagesToDefault
      }}
    >
      {children}
    </PageControlContext.Provider>
  );
};

export const usePageControl = () => {
  const context = useContext(PageControlContext);
  if (!context) {
    throw new Error('usePageControl must be used within PageControlProvider');
  }
  return context;
};
