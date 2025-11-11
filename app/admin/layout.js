'use client';

import { SessionProvider } from 'next-auth/react';
import { AdminHeader } from './components/AdminHeader';

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <AdminHeader />
      <main>{children}</main>
    </SessionProvider>
  );
}
