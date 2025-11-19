'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

// Dynamically import BlogRenderer to avoid SSR issues
const BlogRenderer = dynamic(
  () => import('@/app/components/blog-editor/BlogRenderer').then(mod => ({ default: mod.BlogRenderer })),
  { ssr: false }
);

export default function BlogDetail() {
  const { t } = useTranslation();
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
        console.log('Blog data:', data.blog);
        console.log('Content version:', data.blog.contentVersion);
        console.log('Content blocks:', data.blog.contentBlocks);
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


      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                {t('categories')}
              </h3>
              <nav className="space-y-2">
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {t('allCategories')}
                </Link>
                <Link
                  href="/blog?category=cam-nang"
                  className={`block px-4 py-2 rounded-lg transition-colors ${blog.category === 'cam-nang'
                    ? 'bg-[#cbb9a4] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {t('camNang')}
                </Link>
                <Link
                  href="/blog?category=real-life-wedding"
                  className={`block px-4 py-2 rounded-lg transition-colors ${blog.category === 'real-life-wedding'
                    ? 'bg-[#cbb9a4] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {t('realLifeWedding')}
                </Link>
                <Link
                  href="/blog?category=tu-van-dam-cuoi"
                  className={`block px-4 py-2 rounded-lg transition-colors ${blog.category === 'tu-van-dam-cuoi'
                    ? 'bg-[#cbb9a4] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {t('tuVanDamCuoi')}
                </Link>
                <Link
                  href="/blog?category=cuoi-truyen"
                  className={`block px-4 py-2 rounded-lg transition-colors ${blog.category === 'cuoi-truyen'
                    ? 'bg-[#cbb9a4] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {t('cuoiTruyen')}
                </Link>
                <Link
                  href="/blog?category=dich-vu-khac"
                  className={`block px-4 py-2 rounded-lg transition-colors ${blog.category === 'dich-vu-khac'
                    ? 'bg-[#cbb9a4] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {t('dichVuKhac')}
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
                {typeof blog.title === 'object' ? blog.title[t('currentLang') || 'vi'] || blog.title.vi : blog.title}
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

              {/* Content - Support both HTML and Blocks */}
              {blog.contentVersion === 'blocks' && blog.contentBlocks && blog.contentBlocks.length > 0 ? (
                <div className="mb-8">
                  <BlogRenderer blocks={blog.contentBlocks} />
                </div>
              ) : (
                <div
                  className="blog-content mb-8"
                  dangerouslySetInnerHTML={{ __html: typeof blog.content === 'object' ? blog.content[t('currentLang') || 'vi'] || blog.content.vi : blog.content }}
                />
              )}

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
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('relatedPosts')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedBlogs.map((relatedBlog) => {
                      const blogDate = new Date(relatedBlog.publishedDate);
                      const day = blogDate.getDate();
                      const month = blogDate.toLocaleDateString('vi-VN', { month: 'short' });

                      return (
                        <Link
                          key={relatedBlog._id}
                          href={`/blog/${relatedBlog.slug}`}
                          className="group cursor-pointer"
                        >
                          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                            {/* Image Section */}
                            <div className="relative overflow-hidden h-80">
                              {relatedBlog.thumbnailImage ? (
                                <Image
                                  src={relatedBlog.thumbnailImage}
                                  alt={typeof relatedBlog.title === 'object' ? relatedBlog.title[t('currentLang') || 'vi'] || relatedBlog.title.vi : relatedBlog.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                              {/* Date Badge */}
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded text-center z-10">
                                <div className="text-3xl font-bold text-gray-800">{day}</div>
                                <div className="text-xs text-gray-600 uppercase">{month}</div>
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                              {/* Category Badge */}
                              <div className="inline-block bg-teal-700 text-white text-xs px-3 py-1 rounded mb-3 uppercase">
                                {relatedBlog.category === 'cam-nang' && 'cẩm nang'}
                                {relatedBlog.category === 'real-life-wedding' && 'real-life'}
                                {relatedBlog.category === 'tu-van-dam-cuoi' && 'tư vấn'}
                                {relatedBlog.category === 'cuoi-truyen' && 'cưới truyền'}
                                {relatedBlog.category === 'dich-vu-khac' && 'dịch vụ'}
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-400 transition-colors duration-300">
                                {typeof relatedBlog.title === 'object' ? relatedBlog.title[t('currentLang') || 'vi'] || relatedBlog.title.vi : relatedBlog.title}
                              </h3>

                              {/* Description */}
                              {relatedBlog.excerpt && (
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                  {typeof relatedBlog.excerpt === 'object' ? relatedBlog.excerpt[t('currentLang') || 'vi'] || relatedBlog.excerpt.vi : relatedBlog.excerpt}
                                </p>
                              )}

                              {/* Footer */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                {/* Author */}
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                  <span>{t('by')} {relatedBlog.author || 'Admin'}</span>
                                </div>

                                {/* Likes & Share */}
                                <div className="flex items-center gap-3">
                                  <button className="flex items-center gap-1 text-gray-500 hover:text-orange-400 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="text-xs">{relatedBlog.likes || 0}</span>
                                  </button>
                                  <button className="text-gray-500 hover:text-orange-400 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              {/* Continue Reading Link */}
                              <button className="mt-4 text-sm text-gray-500 hover:text-orange-400 uppercase tracking-wider transition-colors">
                                {t('continueReading') || 'Xem thêm'}
                              </button>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
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
                  {t('backToBlogList')}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
