'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ImageUploader = dynamic(() => import('@/app/components/ImageUploader'), { ssr: false });
const Toast = dynamic(() => import('@/app/components/Toast'), { ssr: false });
const TipTapEditor = dynamic(() => import('@/app/components/TipTapEditor'), { ssr: false });

export default function EditBlog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState(null);

  // Function to generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session && params.id) {
      fetchBlog();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, params.id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/admin/blogs/${params.id}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setFormData({
        ...data.blog,
        publishedDate: new Date(data.blog.publishedDate).toISOString().split('T')[0],
        tags: data.blog.tags || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/blogs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }

      setToast({ message: 'Cập nhật blog thành công!', type: 'success' });
      setTimeout(() => {
        router.push('/admin/blogs');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session || !formData) return null;

  return (
    <div className="min-h-screen bg-[#f7f6eb]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Chỉnh Sửa Blog</h2>
          </div>
          <p className="text-gray-600 ml-13">Cập nhật thông tin blog</p>
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
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông Tin Cơ Bản</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
                  <input
                    type="text"
                    required
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    value={formData.slug}
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
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

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setFormData({ 
                      ...formData, 
                      title: newTitle,
                      slug: generateSlug(newTitle)
                    });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  required
                  rows={3}
                  maxLength={300}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 resize-none"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
                <p className="mt-1 text-xs text-gray-500">{formData.excerpt.length}/300 ký tự</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hình Ảnh</h3>
              <div className="space-y-6">
                <ImageUploader
                  label="Thumbnail Image"
                  value={formData.thumbnailImage}
                  onChange={(e) => setFormData({ ...formData, thumbnailImage: e.target.value })}
                  required={true}
                />
                <ImageUploader
                  label="Header Image"
                  value={formData.headerImage}
                  onChange={(e) => setFormData({ ...formData, headerImage: e.target.value })}
                  required={true}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Nội Dung</h3>
              <TipTapEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
              <p className="mt-2 text-xs text-gray-600">Sử dụng toolbar để format nội dung.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags & SEO</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 resize-none"
                    value={formData.metaDescription || ''}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cài Đặt</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
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
                    type="number"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Read Time (phút)</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
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
                  Featured Blog
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/blogs"
                className="flex items-center px-6 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Hủy
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-6 py-2.5 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 disabled:opacity-50 transition-all shadow-md"
              >
                {saving ? 'Đang lưu...' : 'Cập nhật Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
