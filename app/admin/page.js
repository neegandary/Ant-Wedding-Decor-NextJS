'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f7f6eb]">
      {/* Header */}
      <nav className="bg-[#cbb9a4] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">Ant Wedding Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm text-white font-medium">{session.user.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-1 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-light text-gray-800 mb-2">Chào mừng trở lại! 👋</h2>
            <p className="text-gray-600">Quản lý nội dung website Ant Wedding</p>
          </div>



          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Thao Tác Nhanh</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <Link href="/admin/portfolios" className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-teal-700">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-700 transition-colors">
                  <svg className="w-6 h-6 text-teal-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-teal-700 transition-colors">Portfolios</h3>
                  <p className="text-sm text-gray-600">Quản lý danh sách portfolio</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/blogs" className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-purple-600">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                  <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">Blogs</h3>
                  <p className="text-sm text-gray-600">Quản lý bài viết blog</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/portfolios/new" className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-amber-600">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                  <svg className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-amber-600 transition-colors">Tạo Portfolio Mới</h3>
                  <p className="text-sm text-gray-600">Thêm portfolio mới</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/blogs/new" className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-pink-600">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                  <svg className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">Tạo Blog Mới</h3>
                  <p className="text-sm text-gray-600">Thêm bài viết blog mới</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
