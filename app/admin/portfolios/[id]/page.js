'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

export default function ViewPortfolio() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const portfolioId = params.id;

  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null);

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
      setPortfolio(data.portfolio);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `⚠️ Xác nhận xóa portfolio?\n\n` +
      `Portfolio: ${portfolio.title}\n\n` +
      `Hành động này không thể hoàn tác!`
    );
    
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/portfolios/${portfolioId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('✅ Đã xóa portfolio thành công!');
        router.push('/admin/portfolios');
      } else {
        alert('❌ Không thể xóa portfolio');
      }
    } catch (error) {
      alert('❌ Đã có lỗi xảy ra');
    }
  };

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session || !portfolio) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-xl font-bold">Ant Wedding Admin</Link>
              <Link href="/admin/portfolios" className="text-gray-600 hover:text-gray-900">Portfolios</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={`/admin/portfolios/${portfolioId}/edit`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/admin/portfolios" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to list
        </Link>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header Image */}
          <div className="h-64 bg-gray-200">
            <img src={portfolio.headerImage} alt={portfolio.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-8">
            {/* Title & Status */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{portfolio.title}</h1>
                <p className="text-lg text-gray-600">{portfolio.subtitle}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded ${
                portfolio.status === 'published' ? 'bg-green-100 text-green-800' :
                portfolio.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {portfolio.status}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Slug</h3>
                <p className="text-gray-900">{portfolio.slug}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Category</h3>
                <p className="text-gray-900">{portfolio.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Date</h3>
                <p className="text-gray-900">{portfolio.date.day}/{portfolio.date.month}/{portfolio.date.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Likes</h3>
                <p className="text-gray-900">{portfolio.likes}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Description</h3>
              <p className="text-gray-900 whitespace-pre-line">{portfolio.description}</p>
            </div>

            {/* Details */}
            {portfolio.details && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Details</h3>
                <div className="space-y-1">
                  <p className="text-gray-900"><span className="font-medium">Concept:</span> {portfolio.details.concept}</p>
                  <p className="text-gray-900"><span className="font-medium">Address:</span> {portfolio.details.address}</p>
                  <p className="text-gray-900"><span className="font-medium">Photographer:</span> {portfolio.details.photographer}</p>
                </div>
              </div>
            )}

            {/* Tags */}
            {portfolio.tags && portfolio.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {portfolio.images && portfolio.images.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-4">Gallery ({portfolio.images.length} images)</h3>
                <div className="grid grid-cols-4 gap-4">
                  {portfolio.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                      <img src={image.src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
