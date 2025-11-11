'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function BlogList() {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0, totalPages: 0 });

  useEffect(() => {
    fetchBlogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pagination.page]);

  const fetchBlogs = async () => {
    try {
      const params = new URLSearchParams();
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());
      if (filter) params.append('category', filter);

      const res = await fetch(`/api/blogs?${params}`);
      const data = await res.json();
      
      setBlogs(data.blogs || []);
      setPagination(prev => ({ ...prev, ...data.pagination }));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#f7f6eb]">
      {/* Hero Section */}
      <div className="bg-[#cbb9a4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('blog') || 'BLOG'}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Khám phá những xu hướng trang trí, mẹo hay và câu chuyện cưới đẹp
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sidebar & Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                DANH MỤC
              </h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setFilter('')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === '' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilter('cam-nang')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'cam-nang' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  CẨM NANG
                </button>
                <button
                  onClick={() => setFilter('real-life-wedding')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'real-life-wedding' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Real-life Wedding
                </button>
                <button
                  onClick={() => setFilter('tu-van-dam-cuoi')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'tu-van-dam-cuoi' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  TƯ VẤN ĐÁM CƯỚI
                </button>
                <button
                  onClick={() => setFilter('cuoi-truyen')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'cuoi-truyen' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Cưới truyền
                </button>
                <button
                  onClick={() => setFilter('dich-vu-khac')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'dich-vu-khac' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  DỊCH VỤ KHÁC
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">

            {/* Blog Grid */}
            {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cbb9a4]"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Chưa có bài viết nào</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link 
                  key={blog._id} 
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    {blog.thumbnailImage ? (
                      <Image
                        src={blog.thumbnailImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#cbb9a4] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(blog.publishedDate)}
                      <span className="mx-2">•</span>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {blog.readTime} phút đọc
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#cbb9a4] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-[#cbb9a4] font-medium text-sm">
                      Đọc thêm
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      pagination.page === pageNum
                        ? 'bg-[#cbb9a4] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}
          </>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
