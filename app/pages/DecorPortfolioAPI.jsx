'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const DecorPortfolioAPI = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasMore: false
  });
  const itemsPerPage = 12;

  useEffect(() => {
    fetchPortfolios(currentPage);
  }, [currentPage]);

  const fetchPortfolios = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/portfolios?page=${page}&limit=${itemsPerPage}`);
      const data = await res.json();
      setPortfolios(data.portfolios || []);
      setPagination(data.pagination || {});
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = (slug) => {
    router.push(`/portfolio/${slug}`);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Skeleton Header */}
          <div className="mb-12 animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="w-12 h-1 bg-gray-200"></div>
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-80 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-light text-orange-400 leading-tight">
            {t('portfolioHeroTitle1')}<br />
            {t('portfolioHeroTitle2')}
          </h1>
          <div className="w-12 h-1 bg-orange-400 mt-6"></div>
        </motion.div>

        {/* Portfolio Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group cursor-pointer"
              onClick={() => handleCardClick(item.slug)}
            >
              {/* Card Container */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Image Section */}
                <div className="relative overflow-hidden h-80">
                  <Image
                    src={item.thumbnailImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={index < 3}
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded text-center z-10">
                    <div className="text-3xl font-bold text-gray-800">{item.date.day}</div>
                    <div className="text-xs text-gray-600 uppercase">{item.date.month}</div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="inline-block bg-teal-700 text-white text-xs px-3 py-1 rounded mb-3 uppercase">
                    {t(item.category) || item.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.subtitle && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.subtitle}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {/* Author */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>{t('by')} {item.author || 'Admin'}</span>
                    </div>

                    {/* Likes & Share */}
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-orange-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-xs">{item.likes}</span>
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
                    {t('continueReading')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {portfolios.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Chưa có portfolio nào</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (() => {
          const totalPages = pagination.totalPages;

          return (
            <div className="flex justify-center items-center gap-2 mt-12">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600'
                  }`}
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;

                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg border transition-colors ${currentPage === page
                            ? 'bg-[#cbb9a4] border-[#cbb9a4] text-white font-semibold'
                            : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-[#cbb9a4] hover:text-[#cbb9a4]'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  }

                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="w-10 h-10 flex items-center justify-center text-gray-400">
                        ...
                      </span>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600'
                  }`}
              >
                Next →
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default DecorPortfolioAPI;
