'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Grid3x3, X, ZoomIn, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PortfolioDetailAPI = ({ params }) => {
  const { t, i18n } = useTranslation();
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

  // JavaScript sticky implementation with bottom boundary - only on desktop
  useEffect(() => {
    const stickyEl = document.querySelector('[data-sticky-sidebar]');
    if (!stickyEl) return;

    // Check if screen is desktop (lg breakpoint = 1024px)
    const isDesktop = () => window.innerWidth >= 1024;

    // Only apply sticky on desktop
    if (!isDesktop()) return;

    const placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    stickyEl.parentElement.insertBefore(placeholder, stickyEl);

    const container = stickyEl.parentElement;
    const stickyOffset = 100;
    const sidebarWidth = stickyEl.offsetWidth;

    const handleScroll = () => {
      // Skip if not desktop
      if (!isDesktop()) {
        placeholder.style.display = 'none';
        stickyEl.style.position = 'static';
        stickyEl.style.width = 'auto';
        stickyEl.style.zIndex = 'auto';
        return;
      }

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

    const handleResize = () => {
      if (!isDesktop()) {
        // Reset to static on mobile/tablet
        placeholder.style.display = 'none';
        stickyEl.style.position = 'static';
        stickyEl.style.width = 'auto';
        stickyEl.style.zIndex = 'auto';
      } else {
        handleScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (placeholder.parentNode) {
        placeholder.remove();
      }
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
        className="relative h-[300px] sm:h-[350px] md:h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${portfolio.headerImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider px-4 text-center"
        >
          {typeof portfolio.title === 'object' ? portfolio.title[i18n.language] || portfolio.title.vi : portfolio.title}
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 relative">
          {/* Left Column - Info (Sticky via JS) */}
          <aside
            data-sticky-sidebar
            className="lg:col-span-1 bg-white rounded-lg shadow-md p-5 sm:p-6 lg:p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {typeof portfolio.title === 'object' ? portfolio.title[i18n.language] || portfolio.title.vi : portfolio.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
              {typeof portfolio.subtitle === 'object' ? portfolio.subtitle[i18n.language] || portfolio.subtitle.vi : portfolio.subtitle}
            </p>

            <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {typeof portfolio.description === 'object' ? portfolio.description[i18n.language] || portfolio.description.vi : portfolio.description}
            </div>
          </aside>

          {/* Right Column - Gallery */}
          <div className="lg:col-span-2">
            <div className="columns-1 sm:columns-2 gap-3 sm:gap-4">
              {portfolio.images?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="relative break-inside-avoid mb-3 sm:mb-4 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer bg-gray-50"
                >
                  <img
                    src={image.src}
                    alt={`${typeof portfolio.title === 'object' ? portfolio.title[i18n.language] || portfolio.title.vi : portfolio.title} - ${index + 1}`}
                    className="w-full h-auto object-contain group-hover:opacity-95 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 sm:mt-12 lg:mt-16 border-t border-gray-300 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
            <button
              onClick={() => prevPortfolio && router.push(`/portfolio/${prevPortfolio.slug}`)}
              disabled={!prevPortfolio}
              className={`flex items-center gap-2 sm:gap-3 group w-full sm:w-auto justify-center sm:justify-start ${prevPortfolio
                ? 'text-gray-700 hover:text-orange-400 cursor-pointer'
                : 'text-gray-300 cursor-not-allowed'
                } transition-colors`}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              <div className="text-left">
                <div className="text-xs text-gray-400 uppercase">{t('newer')}</div>
                <div className="text-sm font-medium line-clamp-1">
                  {prevPortfolio ? (typeof prevPortfolio.title === 'object' ? prevPortfolio.title[i18n.language] || prevPortfolio.title.vi : prevPortfolio.title) : t('noPrevious')}
                </div>
              </div>
            </button>

            <button
              onClick={() => router.push('/portfolio')}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 hover:border-orange-400 hover:text-orange-400 transition-colors flex-shrink-0"
            >
              <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => nextPortfolio && router.push(`/portfolio/${nextPortfolio.slug}`)}
              disabled={!nextPortfolio}
              className={`flex items-center gap-2 sm:gap-3 group w-full sm:w-auto justify-center sm:justify-end ${nextPortfolio
                ? 'text-gray-700 hover:text-orange-400 cursor-pointer'
                : 'text-gray-300 cursor-not-allowed'
                } transition-colors`}
            >
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase">{t('older')}</div>
                <div className="text-sm font-medium line-clamp-1">
                  {nextPortfolio ? (typeof nextPortfolio.title === 'object' ? nextPortfolio.title[i18n.language] || nextPortfolio.title.vi : nextPortfolio.title) : t('noNext')}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
            <div className="text-white text-xs sm:text-sm">
              {currentImageIndex + 1} / {portfolio.images?.length || 0}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={closeLightbox}
                className="text-white hover:text-gray-300 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          <button
            onClick={goToPrevImage}
            className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors z-10 p-1 sm:p-0"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </button>

          {/* Image */}
          <div className="relative max-w-full sm:max-w-7xl max-h-[90vh] mx-auto px-12 sm:px-16">
            <img
              src={portfolio.images[currentImageIndex]?.src}
              alt={`${typeof portfolio.title === 'object' ? portfolio.title[i18n.language] || portfolio.title.vi : portfolio.title} - ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={goToNextImage}
            className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 p-1 sm:p-0"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetailAPI;
