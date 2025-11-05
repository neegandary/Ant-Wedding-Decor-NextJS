'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Upload, Plus } from 'lucide-react';
import Toast from '@/app/components/Toast';

export default function EditPortfolio() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const portfolioId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchPortfolio();
    }
  }, [status, portfolioId]);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch(`/api/admin/portfolios/${portfolioId}`);
      const data = await res.json();
      setFormData(data.portfolio);
    } catch (error) {
      setError('Không thể tải portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('portfolioId', portfolioId);
      formData.append('folder', `portfolios/${formData.slug || 'temp'}`);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        if (type === 'thumbnail') {
          setFormData(prev => ({ ...prev, thumbnailImage: data.url }));
        } else if (type === 'header') {
          setFormData(prev => ({ ...prev, headerImage: data.url }));
        }
      } else {
        setToast({ message: 'Upload thất bại: ' + data.error, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Lỗi upload: ' + error.message, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('portfolioId', portfolioId);
        formData.append('folder', `portfolios/${formData.slug || 'temp'}`);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        return data.url;
      });

      const urls = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        images: [
          ...(prev.images || []),
          ...urls.map(url => ({
            src: url,
            orientation: 'landscape',
            size: 'medium',
            alt: ''
          }))
        ]
      }));
      setToast({ message: 'Upload ảnh thành công!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Lỗi upload: ' + error.message, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/portfolios/${portfolioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }

      setToast({ message: 'Cập nhật portfolio thành công!', type: 'success' });
      setTimeout(() => {
        router.push('/admin/portfolios');
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
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <nav className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-xl font-bold">Ant Wedding Admin</Link>
              <Link href="/admin/portfolios" className="text-gray-600 hover:text-gray-900">Portfolios</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Chỉnh sửa Portfolio</h2>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>

            {/* Images Upload */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Ảnh</h3>
              
              {/* Thumbnail */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image *</label>
                {formData.thumbnailImage && (
                  <img src={formData.thumbnailImage} alt="Thumbnail" className="w-32 h-32 object-cover rounded mb-2" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'thumbnail')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Header */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Header Image *</label>
                {formData.headerImage && (
                  <img src={formData.headerImage} alt="Header" className="w-64 h-32 object-cover rounded mb-2" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'header')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Gallery */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mb-4"
                />
                
                <div className="grid grid-cols-4 gap-4">
                  {formData.images?.map((image, index) => (
                    <div key={index} className="relative group">
                      <img src={image.src} alt="" className="w-full h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {uploading && (
                <div className="mt-4 text-blue-600">Đang upload...</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                required
                rows={6}
                className="w-full px-3 py-2 border rounded"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/portfolios"
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </Link>
              <button
                type="submit"
                disabled={saving || uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
