'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, User, Home, FileText, Image } from 'lucide-react';
import Link from 'next/link';

export function AdminHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  // Generate breadcrumb based on current path
  const getBreadcrumb = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.startsWith('/admin/blogs')) return 'Quản lý Blogs';
    if (pathname.startsWith('/admin/portfolios')) return 'Quản lý Portfolios';
    return 'Admin';
  };

  return (
    <header className="border-b bg-[#cbb9a4] shadow-md sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-3 text-white hover:text-white/90 transition-colors">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold">Ant Wedding Admin</h1>
              <p className="text-xs text-white/70">{getBreadcrumb()}</p>
            </div>
          </Link>

          {/* Quick Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/admin'
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/blogs"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith('/admin/blogs')
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Blogs</span>
            </Link>
            <Link
              href="/admin/portfolios"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith('/admin/portfolios')
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Image className="h-4 w-4" />
              <span>Portfolios</span>
            </Link>
          </nav>
        </div>

        {/* User Info & Logout */}
        {session && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <User className="h-4 w-4 text-white/80" />
              <span className="text-sm font-medium text-white">{session.user?.email}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-medium">Đăng xuất</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
