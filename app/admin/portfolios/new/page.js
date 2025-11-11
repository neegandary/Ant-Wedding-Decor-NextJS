'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DatePicker = dynamic(() => import('@/app/components/DatePicker'), {
  ssr: false
});

const ImageUploader = dynamic(() => import('@/app/components/ImageUploader'), {
  ssr: false
});

const Toast = dynamic(() => import('@/app/components/Toast'), {
  ssr: false
});

export default function NewPortfolio() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    subtitle: '',
    author: 'Ant Wedding',
    category: 'weddingDecor',
    date: { day: '', month: 'TH1', year: new Date().getFullYear().toString() },
    thumbnailImage: '',
    headerImage: '',
    description: '',
    details: { concept: '', address: 'Nha Trang', photographer: 'Ant Wedding Studio' },
    contact: { hotline: '079 467 2928', email: 'antwedding79@gmail.com' },
    tags: [],
    images: [],
    likes: 0,
    status: 'draft',
    featured: false,
    displayOrder: 0,
  });

  // Handle date picker change
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);

    if (dateValue) {
      const date = new Date(dateValue);
      const day = date.getDate().toString();
      const month = `TH${date.getMonth() + 1}`;
      const year = date.getFullYear().toString();

      setFormData({
        ...formData,
        date: { day, month, year }
      });
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }

      setToast({ message: 'Tạo portfolio thành công!', type: 'success' });
      setTimeout(() => {
        router.push('/admin/portfolios');
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
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Tạo Portfolio Mới</h2>
              </div>
              <p className="text-gray-600 ml-13">Thêm portfolio mới vào hệ thống</p>
            </div>
            <Link
              href="/admin/portfolios"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Quay lại</span>
            </Link>
          </div>
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
            {/* Basic Information Section */}
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    placeholder="nathanxtracy"
                  />
                  <p className="mt-1 text-xs text-gray-500">URL-friendly identifier (chữ thường, không dấu)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="weddingDecor">Wedding Decor</option>
                    <option value="restaurantDecorCategory">Restaurant</option>
                    <option value="ancestorDecorCategory">Ancestor</option>
                    <option value="PRE WEDDING">Pre Wedding</option>
                    <option value="birthday">Birthday</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Title Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="FOUND BY FATE"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Nathan & Tracy - Định Mệnh Tìm Thấy Nhau"
                />
              </div>
            </div>

            {/* Date Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ngày Tháng
              </h3>
              <div className="space-y-4">
                {/* Custom Date Picker with Autohide */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn Ngày *</label>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    required={true}
                  />
                  <p className="mt-1 text-xs text-gray-500">Click để mở lịch và chọn ngày (tự động ẩn sau khi chọn)</p>
                </div>

                {/* Display Selected Date */}
                {formData.date.day && (
                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-teal-800">
                        Ngày đã chọn: {formData.date.day} {formData.date.month} {formData.date.year}
                      </span>
                    </div>
                  </div>
                )}


              </div>
            </div>

            {/* Images Section */}
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
                  helperText="Ảnh hiển thị trong danh sách portfolio"
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

            {/* Description Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Mô Tả
              </h3>
              <textarea
                required
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả chi tiết về portfolio..."
              />
            </div>

            {/* Settings Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cài Đặt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <p className="mt-2 text-xs text-gray-600 flex items-start">
                    <svg className="w-4 h-4 mr-1 mt-0.5 shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <strong>Draft:</strong> Chưa hiển thị công khai<br />
                      <strong>Published:</strong> Hiển thị trên website<br />
                      <strong>Archived:</strong> Đã lưu trữ, không hiển thị
                    </span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                  <input
                    type="text"
                    min="0"
                    step="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all"
                    value={formData.displayOrder}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Remove leading zeros and parse
                      const numValue = value === '' ? 0 : parseInt(value.replace(/^0+/, '') || '0', 10);
                      setFormData({ ...formData, displayOrder: numValue });
                    }}
                    placeholder="0"
                  />
                  <p className="mt-2 text-xs text-gray-600 flex items-start">
                    <svg className="w-4 h-4 mr-1 mt-0.5 shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>
                      Thứ tự hiển thị trên trang portfolio. Số nhỏ hơn sẽ hiển thị trước (0 = đầu tiên)
                    </span>
                  </p>
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
                    Featured Portfolio
                  </span>
                  <span className="block text-xs text-gray-600 mt-1">Hiển thị nổi bật trên trang chủ</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/portfolios"
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
                    Tạo Portfolio
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
