'use client';

import React from 'react';
import { ContextualToolbar } from './ContextualToolbar';

/**
 * PropertyPanel - Right sidebar panel for block settings
 * Now uses the enhanced ContextualToolbar component
 */
export function PropertyPanel() {
  return (
    <div className="fixed right-6 top-24 bottom-6 z-50 w-80 overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-200">
      <ContextualToolbar />
    </div>
  );
}
