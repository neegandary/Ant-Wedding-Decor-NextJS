'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Grid3x3, X, ZoomIn, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PortfolioDetailAPI = ({ params }) => {
  const { t } = useTranslation();
  const slug = params?.slug;
  const router = useRouter();
  const [portfolio, setPortfolio] = useState(null);
  const [allPortfolios, setAllPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchPortfolio();
      fetchAllPortfolios();
    }
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // JavaScript sticky implementation with bottom boundary
  useEffect(() => {
    const stickyEl = document.querySelector('[data-sticky-sidebar]');
    if (!stickyEl) return;

    const placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    stickyEl.parentElement.insertBefore(placeholder, stickyEl);

    const container = stickyEl.parentElement;
    const stickyOffset = 100;
    const sidebarWidth = stickyEl.offsetWidth;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sidebarHeight = stickyEl.offsetHeight;
      
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + scrollY;
      const containerBottom = containerTop + container.offsetHeight;
      
      const startSticky = containerTop - stickyOffset;
      const stopSticky = containerBottom - sidebarHeight - stickyOffset;
      
      if (scrollY >= startSticky && scrollY < stopSticky) {
        placeholder.style.display = 'block';
        placeholder.style.height = `${sidebarHeight}px`;
        stickyEl.style.position = 'fixed';
        stickyEl.style.top = `${stickyOffset}px`;
        stickyEl.style.width = `${sidebarWidth}px`;
        stickyEl.style.zIndex = '10';
      } else if (scrollY >= stopSticky) {
        placeholder.style.display = 'block';
        placeholder.style.height = `${sidebarHeight}px`;
        stickyEl.style.position = 'absolute';
        stickyEl.style.top = `${container.offsetHeight - sidebarHeight}px`;
        stickyEl.style.width = `${sidebarWidth}px`;
        stickyEl.style.zIndex = '10';
      } else {
        placeholder.style.display = 'none';
        stickyEl.style.position = 'static';
        stickyEl.style.width = 'auto';
        stickyEl.style.zIndex = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      placeholder.remove();
    };
  }, [portfolio]);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch(`/api/portfolios/${slug}`);
      const data = await res.json();
      setPortfolio(data.portfolio);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPortfolios = async () => {
    try {
      const res = await fetch('/api/portfolios');
      const data = await res.json();
      setAllPortfolios(data.portfolios || []);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    }
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : portfolio.images.length - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev < portfolio.images.length - 1 ? prev + 1 : 0));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Portfolio not found</div>
      </div>
    );
  }

  const currentIndex = allPortfolios.findIndex(p => p.slug === slug);
  const prevPortfolio = currentIndex > 0 ? allPortfolios[currentIndex - 1] : null;
  const nextPortfolio = currentIndex < allPortfolios.length - 1 ? allPortfolios[currentIndex + 1] : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${portfolio.headerImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative text-5xl md:text-6xl font-bold text-white tracking-wider"
        >
          {portfolio.title}
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Left Column - Info (Sticky via JS) */}
          <aside 
            data-sticky-sidebar
            className="lg:col-span-1 bg-white rounded-lg shadow-md p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{portfolio.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{portfolio.subtitle}</p>

            <div className="text-gray-700 text-sm leading-relaxed mb-8 whitespace-pre-line">
              {portfolio.description}
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <p className="text-sm mb-2">
                <span className="font-semibold">{t('concept')}</span> {portfolio.details?.concept}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">{t('weddingAddress')}</span> {portfolio.details?.address}
              </p>
              <p className="text-sm">
                <span className="font-semibold">{t('photographer')}</span> {portfolio.details?.photographer}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">ANT WEDDING - DECOR & MORE</h3>
              <p className="text-sm mb-2">
                <span className="font-semibold">Hotline:</span> {portfolio.contact?.hotline}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email:</span> {portfolio.contact?.email}
              </p>
            </div>

            {portfolio.tags && portfolio.tags.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-800 mb-3">{t('tags')}</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolio.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Right Column - Gallery */}
          <div className="lg:col-span-2">
            <div className="columns-1 md:columns-2 gap-4">
              {portfolio.images?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="relative break-inside-avoid mb-4 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer bg-gray-50"
                >
                  <img
                    src={image.src}
                    alt={`${portfolio.title} - ${index + 1}`}
                    className="w-full h-auto object-contain group-hover:opacity-95 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <ZoomIn className="w-6 h-6 text-gray-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 border-t border-gray-300 pt-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => prevPortfolio && router.push(`/portfolio/${prevPortfolio.slug}`)}
              disabled={!prevPortfolio}
              className={`flex items-center gap-3 group ${prevPortfolio
                ? 'text-gray-700 hover:text-orange-400 cursor-pointer'
                : 'text-gray-300 cursor-not-allowed'
                } transition-colors`}
            >
              <ChevronLeft className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-gray-400 uppercase">{t('newer')}</div>
                <div className="text-sm font-medium">
                  {prevPortfolio?.title || t('noPrevious')}
                </div>
              </div>
            </button>

            <button
              onClick={() => router.push('/portfolio')}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:text-orange-400 transition-colors"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>

            <button
              onClick={() => nextPortfolio && router.push(`/portfolio/${nextPortfolio.slug}`)}
              disabled={!nextPortfolio}
              className={`flex items-center gap-3 group ${nextPortfolio
                ? 'text-gray-700 hover:text-orange-400 cursor-pointer'
                : 'text-gray-300 cursor-not-allowed'
                } transition-colors`}
            >
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase">{t('older')}</div>
                <div className="text-sm font-medium">
                  {nextPortfolio?.title || t('noNext')}
                </div>
              </div>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
            <div className="text-white text-sm">
              {currentImageIndex + 1} / {portfolio.images?.length || 0}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={closeLightbox}
                className="text-white hover:text-gray-300 transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          <button
            onClick={goToPrevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          {/* Image */}
          <div className="relative max-w-7xl max-h-[90vh] mx-auto px-16">
            <img
              src={portfolio.images[currentImageIndex]?.src}
              alt={`${portfolio.title} - ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={goToNextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetailAPI;
