'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ImageUploader = dynamic(() => import('@/app/components/ImageUploader'), { ssr: false });
const Toast = dynamic(() => import('@/app/components/Toast'), { ssr: false });
const TipTapEditor = dynamic(() => import('@/app/components/TipTapEditor'), { ssr: false });

export default function NewBlog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  // Function to generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD') // Normalize Unicode
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/đ/g, 'd') // Replace đ
      .replace(/Đ/g, 'd') // Replace Đ
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .replace(/^-+|-+$/g, ''); // Trim - from start/end
  };

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    author: 'Ant Wedding',
    category: 'cam-nang',
    excerpt: '',
    content: '',
    thumbnailImage: '',
    headerImage: '',
    tags: [],
    publishedDate: new Date().toISOString().split('T')[0],
    metaDescription: '',
    metaKeywords: [],
    status: 'draft',
    featured: false,
    displayOrder: 0,
    readTime: 5,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }

      setToast({ message: 'Tạo blog thành công!', type: 'success' });
      setTimeout(() => {
        router.push('/admin/blogs');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#f7f6eb]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <nav className="bg-[#cbb9a4] shadow-md mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="flex items-center space-x-2 text-white hover:text-white/90 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-lg font-bold">Ant Wedding Admin</span>
              </Link>
              <Link href="/admin/blogs" className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span className="font-medium">Blogs</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Tạo Blog Mới</h2>
          </div>
          <p className="text-gray-600 ml-13">Thêm bài viết blog mới vào hệ thống</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-3">
            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thông Tin Cơ Bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
                  <input
                    type="text"
                    required
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    value={formData.slug}
                    placeholder="tu-dong-tao-tu-title"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Tự động tạo từ Title
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="cam-nang">Cẩm nang</option>
                    <option value="real-life-wedding">Real-life Wedding</option>
                    <option value="tu-van-dam-cuoi">Tư vấn đám cưới</option>
                    <option value="cuoi-truyen">Cưới truyền</option>
                    <option value="dich-vu-khac">Dịch vụ khác</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Title & Excerpt */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all"
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setFormData({ 
                      ...formData, 
                      title: newTitle,
                      slug: generateSlug(newTitle)
                    });
                  }}
                  placeholder="10 Xu Hướng Trang Trí Tiệc Cưới 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả ngắn (Excerpt) *
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={300}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all resize-none"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Mô tả ngắn gọn về bài viết, hiển thị trong danh sách blog (tối đa 300 ký tự)"
                />
                <div className="mt-2 flex items-start space-x-2">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">
                      <strong>Excerpt</strong> là đoạn mô tả ngắn hiển thị trong blog card (danh sách blog).
                      Nên viết ngắn gọn, hấp dẫn để thu hút người đọc click vào.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/300 ký tự</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Hình Ảnh
              </h3>
              <div className="space-y-6">
                <ImageUploader
                  label="Thumbnail Image"
                  value={formData.thumbnailImage}
                  onChange={(e) => setFormData({ ...formData, thumbnailImage: e.target.value })}
                  required={true}
                  helperText="Ảnh hiển thị trong danh sách blog"
                />

                <ImageUploader
                  label="Header Image"
                  value={formData.headerImage}
                  onChange={(e) => setFormData({ ...formData, headerImage: e.target.value })}
                  required={true}
                  helperText="Ảnh header trang chi tiết"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Nội Dung
              </h3>
              <TipTapEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
              <p className="mt-2 text-xs text-gray-600">Sử dụng toolbar để format nội dung. Hỗ trợ headings, lists, links, images, và nhiều hơn nữa.</p>
            </div>

            {/* Tags & Meta */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Tags & SEO
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all"
                    placeholder="wedding, decoration, tips (phân cách bằng dấu phẩy)"
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all resize-none"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Mô tả cho SEO"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cài Đặt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all bg-white"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                  <input
                    type="text"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Read Time (phút)</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 5 })}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <input
                  type="checkbox"
                  id="featured"
                  className="w-5 h-5 text-teal-700 border-gray-300 rounded focus:ring-teal-700"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <label htmlFor="featured" className="ml-3 text-sm font-medium text-gray-800">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured Blog
                  </span>
                  <span className="block text-xs text-gray-600 mt-1">Hiển thị nổi bật trên trang chủ</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/blogs"
                className="flex items-center px-6 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Hủy
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-2.5 bg-linear-to-r from-teal-700 to-teal-600 text-white rounded-lg font-medium hover:from-teal-800 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tạo Blog
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
