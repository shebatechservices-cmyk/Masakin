'use client';

import React from 'react';
import { usePageControl } from '@/context/PageControlContext';
import MaintenanceNotice from './MaintenanceNotice';

interface PageGuardProps {
  path: string;
  pageTitle?: string;
  children: React.ReactNode;
}

export default function PageGuard({ path, pageTitle, children }: PageGuardProps) {
  const { isPageEnabled } = usePageControl();

  if (!isPageEnabled(path)) {
    return <MaintenanceNotice pageTitle={pageTitle} />;
  }

  return <>{children}</>;
}
