'use client';

import { useEffect } from 'react';
import i18n from './config';

export function I18nProvider({ children }) {
  useEffect(() => {
    // Initialize i18n on client side
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return <>{children}</>;
}
