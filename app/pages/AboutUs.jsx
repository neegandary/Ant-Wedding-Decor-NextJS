'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart, Lightbulb, HeartHandshake, Palette } from 'lucide-react';
import { IMAGES } from '../constants/image';
import { CountUpNumber } from '../components/CountUpNumber';

const AboutUs = () => {
  const { t } = useTranslation();

  const teamImages = [
    IMAGES.antweddingteam2,
    IMAGES.antweddingteam5,
    IMAGES.antweddingteam6,
    IMAGES.antweddingteam8,
    IMAGES.antweddingteam9,
    IMAGES.antweddingteam10,
    IMAGES.antweddingteam11,
    IMAGES.antweddingteam12,
    IMAGES.antweddingteam13,
    IMAGES.antweddingteam14,
    IMAGES.antweddingteam15,
    IMAGES.antweddingteam16,
    IMAGES.antweddingteam17,
    IMAGES.antweddingteam18,
    IMAGES.antweddingteam19,
    IMAGES.antweddingteam20,
    IMAGES.antweddingteam21,
    IMAGES.antweddingteam22,
    IMAGES.antweddingteam23,
    IMAGES.antweddingteam24,
  ];

  const values = [
    {
      icon: <Heart className="w-12 h-12 text-[#cbb9a4]" />,
      title: t('dedicated'),
      description: t('dedicatedDesc')
    },
    {
      icon: <Palette className="w-12 h-12 text-[#cbb9a4]" />,
      title: t('creative'),
      description: t('creativeDesc')
    },
    {
      icon: <HeartHandshake className="w-12 h-12 text-[#cbb9a4]" />,
      title: t('professional'),
      description: t('professionalDesc')
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.antweddingteam16})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {t('aboutUs')}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {t('aboutUsTagline')}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t('ourStory')}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            {t('ourStoryDesc1')}
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('ourStoryDesc2')}
          </p>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {t('ourFounders')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#cbb9a4]">
                <img src={IMAGES.founder2} alt="Nhã Tịnh" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nhã Tịnh</h3>
              <p className="text-[#cbb9a4] font-semibold mb-3">{t('coFounderCreativeDirector')}</p>
              <p className="text-gray-600">
                {t('founderDesc1')}
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#cbb9a4]">
                <img src={IMAGES.founder1} alt="Ngọc Anh" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ngọc Anh</h3>
              <p className="text-[#cbb9a4] font-semibold mb-3">{t('coFounderOperationsDirector')}</p>
              <p className="text-gray-600">
                {t('founderDesc2')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {t('coreValues')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {t('ourTeam')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teamImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Team ${index + 1}`}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${image === IMAGES.antweddingteam15 ? '-rotate-90' : ''
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#cbb9a4] to-[#b8a490] rounded-lg shadow-lg p-8 md:p-12 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2"><CountUpNumber target={300} suffix='+' /></div>
              <div className="text-lg">{t('projectsCompleted')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2"><CountUpNumber target={10} suffix='+' /></div>
              <div className="text-lg">{t('yearsOfExperience')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2"><CountUpNumber target={20} suffix='+' /></div>
              <div className="text-lg">{t('teamMembers')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2"><CountUpNumber target={100} suffix='%' /></div>
              <div className="text-lg">{t('customerSatisfaction')}</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('letUsJoinYou')}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t('contactForPlanning')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0794672928"
              className="bg-[#cbb9a4] text-white px-8 py-3 rounded-lg hover:bg-[#b8a490] transition-colors font-semibold inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('hotline')}: 079 467 2928
            </a>
            <a
              href="/contact"
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
    </div>
  );
};

export default AboutUs;