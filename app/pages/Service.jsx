'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { IMAGES } from '../constants/image';

const Service = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 1,
      title: t('ancestorDecor'),
      description: t('ancestorDesc'),
      image: IMAGES.phuongxhien,
      link: '/services/ancestor',
    },
    {
      id: 2,
      title: t('outdoorDecor'),
      description: t('outdoorDesc'),
      image: IMAGES.tienxwilliam,
      link: '/services/destination',
    },
    {
      id: 3,
      title: t('restaurantDecor'),
      description: t('restaurantDesc'),
      image: IMAGES.duyxmy2_10,
      link: '/services/restaurant-wedding',
    },
    {
      id: 4,
      title: t('eventDecorTitle'),
      description: t('eventDecorDesc'),
      image: IMAGES.benang10,
      link: '/services/event',
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.service})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center text-white max-w-4xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
              {t('services')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
              ANT WEDDING - DECOR & MORE
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('ourServices')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('ourServicesDesc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="text-[#806a56] hover:text-[#cbb9a4] font-semibold transition-colors flex items-center gap-2"
                >
                  {t('viewDetails')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <section className=" py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-4xl font-black text-center text-gray-800 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {t('whyChooseUs')}
            </motion.h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-[#cbb9a4] to-transparent w-76"></div>
            </div>
            <motion.p
              className="text-center text-lg  text-gray-600 max-w-3xl mx-auto mb-12 whitespace-pre font-light"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {t('whyChooseDesc')}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Card 01 - Fade từ trái */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="text-6xl font-black text-emerald-700/20 mb-2">01.</div>
                <h3 className="text-xl font-black text-gray-800 mb-2">{t('trustedBrand')}</h3>
                <p className="text-md text-gray-600 leading-relaxed font-light">
                  {t('trustedBrandDesc')}
                </p>
              </motion.div>

              {/* Card 02 - Fade từ dưới lên */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="text-6xl font-bold text-emerald-700/20 mb-2">02.</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('professionalProcess')}</h3>
                <p className="text-md text-gray-600 leading-relaxed font-light">
                  {t('professionalProcessDesc')}
                </p>
              </motion.div>

              {/* Card 03 - Fade từ phải */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="text-6xl font-bold text-emerald-700/20 mb-2">03.</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('highExpertise')}</h3>
                <p className="text-md text-gray-600 leading-relaxed font-light">
                  {t('highExpertiseDesc')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t('readyForPerfectWedding')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('contactForFreeConsultation')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0794672928"
              className="bg-[#cbb9a4] text-white px-8 py-3 rounded-lg hover:bg-[#b8a490] transition-colors font-semibold"
            >
              {t('hotline')}: 079 467 2928
            </a>
            <a
              href="/contact"
              className="bg-white text-[#806a56] border-2 border-[#cbb9a4] px-8 py-3 rounded-lg hover:bg-[#cbb9a4] hover:text-white transition-colors font-semibold"
            >
              {t('contact')}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Service;
