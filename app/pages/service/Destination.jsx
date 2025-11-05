'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Camera, Palette, BookImage, Utensils, Flower, CircleCheckBig } from 'lucide-react';
import { IMAGES } from '../../constants/image';

export const Destination = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const features = [
        {
            icon: <Camera className="w-12 h-12 text-[#cbb9a4]" />,
            title: t('backdropAndArch'),
            description: t('backdropAndArchDesc')
        },
        {
            icon: <BookImage className="w-12 h-12 text-[#cbb9a4]" />,
            title: t('tablesAndWalkway'),
            description: t('tablesAndWalkwayDesc')
        },
        {
            icon: <Utensils className="w-12 h-12 text-[#cbb9a4]" />,
            title: t('lighting'),
            description: t('lightingDesc')
        },
        {
            icon: <Flower className="w-12 h-12 text-[#cbb9a4]" />,
            title: t('themeDecoration'),
            description: t('themeDecorationDesc')
        }
    ];

    const portfolioImages = [
        { src: IMAGES.tienxwilliam, title: 'QUIET COASTAL LOVE', endpoint: 'tienxwilliam' },
        { src: IMAGES.nathanxtracy, title: 'FOUND BY FATE', endpoint: 'nathanxtracy' },
        { src: IMAGES.service, title: 'THE JOURNEY WITHIN', endpoint: 'hanxtuan' },
        { src: IMAGES.mayxmat, title: 'EAT.PRAY.LOVE', endpoint: 'mayxmat' }
    ];

    const processSteps = [
        { step: '01', title: t('consultation'), desc: t('consultationDesc1') },
        { step: '02', title: t('preparation'), desc: t('preparationDesc1') },
        { step: '03', title: t('construction'), desc: t('constructionDesc1') },
        { step: '04', title: t('completion'), desc: t('completionDesc1') }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${IMAGES.mayxmat30})` }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative h-full flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center text-white px-4"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            {t('outdoorDecor')}
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto whitespace-pre-line">
                            {t('outdoorHeroSubtitle')}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Description Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        {t('outdoorServiceTitle')}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg whitespace-pre">
                        {t('outdoorServiceSubtitle')}
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-md">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Portfolio Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                        {t('completedProjects')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {portfolioImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                onClick={() => router.push(`/portfolio/${image.endpoint}`)}
                                className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <h3 className="text-white text-2xl font-bold p-6">
                                        {image.title}
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
                    <div className="text-center">
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
                </motion.div>

                {/* Process Section */}
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
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-md">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

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
                            {t('outdoorBenefits')}
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
                                    {t('spaciousSpace')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-md">
                                    {t('spaciousSpaceDesc')}
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
                                    {t('naturalLight')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('naturalLightDesc')}
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
                                    {t('romanticSpace')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('romanticSpaceDesc')}
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
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {t('readyForOutdoorWedding')}
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        {t('contactForFreeConsult')}
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

export default Destination;
