'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Camera, BookImage, Footprints, Gem, CircleCheckBig } from 'lucide-react';
import { IMAGES } from '../../constants/image';

export const Restaurant = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="relative h-[400px] bg-gray-200 animate-pulse" />
      </div>
    );
  }

  const features = [
    {
      icon: <Camera className="w-12 h-12 text-[#cbb9a4]" />,
      titleKey: 'restaurantHallTitle',
      descriptionKey: 'restaurantHallDesc',
    },
    {
      icon: <BookImage className="w-12 h-12 text-[#cbb9a4]" />,
      titleKey: 'restaurantMenuTitle',
      descriptionKey: 'restaurantMenuDesc',
    },
    {
      icon: <Footprints className="w-12 h-12 text-[#cbb9a4]" />,
      titleKey: 'restaurantStaffTitle',
      descriptionKey: 'restaurantStaffDesc',
    },
    {
      icon: <Gem className="w-12 h-12 text-[#cbb9a4]" />,
      titleKey: 'restaurantDecorConceptTitle',
      descriptionKey: 'restaurantDecorConceptDesc',
    },
  ];

  const portfolioImages = [
    { src: IMAGES.phuongxhien2_8, titleKey: 'restaurantPortfolio1', endpoint: 'phuongxhien2' },
    { src: IMAGES.vanxtuc, titleKey: 'restaurantPortfolio2', endpoint: 'vanxtuc' },
    { src: IMAGES.duyenxsteven7, titleKey: 'restaurantPortfolio3', endpoint: 'duyenxsteven' },
    { src: IMAGES.duyxmy2_1, titleKey: 'restaurantPortfolio4', endpoint: 'duyxmy2' },
  ];

  const processSteps = [
    { step: '01', titleKey: t('consultation'), descKey: t('consultationDesc1') },
    { step: '02', titleKey: t('preparation'), descKey: t('preparationDesc1') },
    { step: '03', titleKey: t('construction'), descKey: t('constructionDesc1') },
    { step: '04', titleKey: t('completion'), descKey: t('completionDesc1') }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${IMAGES.vanxtuc})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-6xl font-bold mb-4">{t('restaurantDecor')}</h1>
          <p className="text-xl max-w-2xl mx-auto ">
            {t('restaurantDesc1')}
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 lg:px-20">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-800">{t('restaurantFeaturesTitle')}</h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('restaurantFeaturesSubTitle')}</p>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{t(feature.titleKey)}</h3>
              <p className="text-md text-gray-600">{t(feature.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">{t('completedProjects')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {portfolioImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => router.push(`/portfolio/${item.endpoint}`)}
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={item.src}
                alt={t(item.titleKey)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-2xl font-bold p-6">
                  {t(item.titleKey)}
                </h3>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-20">
          <motion.button
            onClick={() => router.push('/portfolio')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#cbb9a4] text-white px-8 py-3 rounded-lg hover:bg-[#b8a490] transition-colors font-semibold shadow-lg"
          >
            <span>{t('viewPortfolio')}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* Process */}
      <section className="py-6 px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {t('workflowProcess')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center whitespace-pre-line"
              >
                <div className="w-16 h-16 bg-[#cbb9a4] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t(item.titleKey)}
                </h3>
                <p className="text-gray-600 text-md">
                  {t(item.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

        {/* Benefits Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {t('outdoorBenefitsRes')}
                        </h2>
                        <div className="w-20 h-1 bg-[#cbb9a4] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group whitespace-pre-line"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#cbb9a4] to-[#b8a490] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <CircleCheckBig className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    {t('spaciousSpaceRes')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {t('spaciousSpaceResDesc')}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#cbb9a4] to-[#b8a490] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <CircleCheckBig className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 ">
                                    {t('naturalLightRes')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {t('naturalLightResDesc')}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#cbb9a4] to-[#b8a490] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <CircleCheckBig className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 whitespace-pre-line">
                                    {t('romanticSpaceRes')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {t('romanticSpaceResDesc')}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 px-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {t('readyForPerfectWeddingRes')}
        </h2>
        <p className="text-gray-600 mb-8 text-xl">
          {t('contactForFreeConsultationRes')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:0794672928"
            className="bg-[#cbb9a4] text-white px-8 py-3 rounded-lg hover:bg-[#b8a490] transition-colors font-semibold inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Hotline: 079 467 2928
          </a>
          <a
            href={t('consultationFormLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#806a56] border-2 border-[#cbb9a4] px-8 py-3 rounded-lg hover:bg-[#cbb9a4] hover:text-white transition-colors font-semibold inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t('sendConsultationRequest')}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Restaurant;
