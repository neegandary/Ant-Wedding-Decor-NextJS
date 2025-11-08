'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogDetail() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchBlog();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${params.slug}`);
      const data = await res.json();
      
      if (res.ok) {
        setBlog(data.blog);
        setRelatedBlogs(data.relatedBlogs || []);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cbb9a4]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog không tồn tại</h1>
          <Link href="/blog" className="text-[#cbb9a4] hover:underline">
            Quay lại danh sách blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6eb]">
      {/* Hero Section */}
      <div className="bg-[#cbb9a4] py-16 relative">
        <div className="absolute inset-0 opacity-20">
          {blog.headerImage && (
            <Image
              src={blog.headerImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                DANH MỤC
              </h3>
              <nav className="space-y-2">
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Tất cả
                </Link>
                <Link
                  href="/blog?category=cam-nang"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    blog.category === 'cam-nang' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  CẨM NANG
                </Link>
                <Link
                  href="/blog?category=real-life-wedding"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    blog.category === 'real-life-wedding' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Real-life Wedding
                </Link>
                <Link
                  href="/blog?category=tu-van-dam-cuoi"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    blog.category === 'tu-van-dam-cuoi' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  TƯ VẤN ĐÁM CƯỚI
                </Link>
                <Link
                  href="/blog?category=cuoi-truyen"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    blog.category === 'cuoi-truyen' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Cưới truyền
                </Link>
                <Link
                  href="/blog?category=dich-vu-khac"
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    blog.category === 'dich-vu-khac' 
                      ? 'bg-[#cbb9a4] text-white font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  DỊCH VỤ KHÁC
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
              {/* Category Badge */}
              <div className="mb-4 text-center">
                <span className="inline-block bg-[#5a9a8a] text-white px-4 py-1 rounded text-sm font-medium uppercase">
                  {blog.category === 'cam-nang' && 'CẨM NANG'}
                  {blog.category === 'real-life-wedding' && 'Real-life Wedding'}
                  {blog.category === 'tu-van-dam-cuoi' && 'TƯ VẤN ĐÁM CƯỚI'}
                  {blog.category === 'cuoi-truyen' && 'Cưới truyền'}
                  {blog.category === 'dich-vu-khac' && 'DỊCH VỤ KHÁC'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center text-sm text-gray-600 gap-2 mb-6 pb-6 border-b border-gray-200">
                <span className="text-gray-500">Posted by</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-[#cbb9a4]">{blog.author}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">On</span>
                <span className="font-medium">{formatDate(blog.publishedDate)}</span>
                <span className="text-gray-400">•</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{blog.views}</span>
              </div>

             

          {/* Content */}
          <div 
            className="blog-content mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="border-t border-gray-200 pt-6 mt-8">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link 
                  key={relatedBlog._id}
                  href={`/blog/${relatedBlog.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative h-48">
                    {relatedBlog.thumbnailImage ? (
                      <Image
                        src={relatedBlog.thumbnailImage}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#cbb9a4] transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="mt-3 text-sm text-gray-500">
                      {formatDate(relatedBlog.publishedDate)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

              {/* Back to Blog List */}
              <div className="text-center py-8 mt-8 border-t border-gray-200">
                <Link 
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-[#cbb9a4] text-white rounded-lg hover:bg-[#b5a894] transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Quay lại danh sách blog
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
