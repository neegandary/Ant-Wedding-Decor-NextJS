'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Flower, BookImage, HandHeart, Gift } from 'lucide-react';
import { IMAGES } from '../../constants/image';

export const Ancestor = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by not rendering translated content until mounted
    if (!mounted) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <div className="relative h-[500px] bg-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative h-full flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="h-12 w-96 bg-white/20 rounded mx-auto mb-4"></div>
                            <div className="h-6 w-64 bg-white/20 rounded mx-auto"></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-md">
                                <div className="w-16 h-16 bg-gray-200 rounded-xl mb-6 animate-pulse"></div>
                                <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const features = [
        {
            icon: <Flower className="w-12 h-12 text-[#cbb9a4]" />,
            title: t('ancestorAltar'),
            description: t('ancestorAltarDesc')
        },
        {
            icon: <BookImage className="w-12 h-12 text-[#cbb9a4]" />,
            title: t('flowersAndFruits'),
            description: t('flowersAndFruitsDesc')
        },
        {
            icon: <HandHeart className="w-12 h-12 text-[#cbb9a4]" />,
            title: t('candlesAndIncense'),
            description: t('candlesAndIncenseDesc')
        },
        {
            icon: <Gift className="w-12 h-12 text-[#cbb9a4]" />,
            title: t('spaceDecoration'),
            description: t('spaceDecorationDesc')
        }
    ];

    const portfolioImages = [
        { src: IMAGES.tranxtai2_7, title: t('ancestorModernCeremony'), endpoint: 'tranxtai2' },
        { src: IMAGES.thoaxbinh, title: t('ancestorElegantCeremony'), endpoint: 'thoaxbinh' },
        { src: IMAGES.duyxmy, title: t('ancestorElegantCeremony2'), endpoint: 'duyxmy' },
        { src: IMAGES.vyxkhang, title: t('ancestorElegantCeremony3'), endpoint: 'vyxkhang' }
    ];

    const processSteps = [
        { step: '01', title: t('ancestorConsultation'), desc: t('ancestorConsultationDesc') },
        { step: '02', title: t('ancestorPreparation'), desc: t('ancestorPreparationDesc') },
        { step: '03', title: t('ancestorConstruction'), desc: t('ancestorConstructionDesc') },
        { step: '04', title: t('ancestorCompletion'), desc: t('ancestorCompletionDesc') }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${IMAGES.vietxquynh2_11})` }}
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
                            {t('ancestorDecor')}
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto whitespace-pre-line">
                            {t('ancestorServiceSubtitleHero')}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Description Section */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        {t('ancestorServiceTitle')}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                        {t('ancestorServiceSubtitle')}
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#cbb9a4]/30"
                        >
                            {/* Icon Container with gradient background */}
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#cbb9a4]/10 to-[#cbb9a4]/5 rounded-xl  group-hover:scale-110 transition-transform duration-300">
                                <div className="text-[#cbb9a4] group-hover:text-[#a89580]  transition-colors">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 leading-tight h-14 flex items-center whitespace-nowrap">
                                <span className="line-clamp-2">
                                    {feature.title}
                                </span>
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Decorative corner element */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#cbb9a4]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="text-center mt-10">
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
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-[#cbb9a4] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
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
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                        {t("ancestorBenefitTitle")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#cbb9a4] to-[#b8a490] rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {t("ancestorBenefitTitle1")}
                            </h3>
                            <p className="text-gray-600">
                                {t("ancestorBenefitSubTitle1")}
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#cbb9a4] to-[#b8a490] rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                 {t("ancestorBenefitTitle2")}
                            </h3>
                            <p className="text-gray-600">
                                {t("ancestorBenefitSubTitle2")}
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#cbb9a4] to-[#b8a490] rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                 {t("ancestorBenefitTitle3")}
                            </h3>
                            <p className="text-gray-600">
                                {t("ancestorBenefitSubTitle3")}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#cbb9a4] to-[#b8a490] rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                 {t("ancestorBenefitTitle4")}
                            </h3>
                            <p className="text-gray-600">
                                {t("ancestorBenefitSubTitle4")}
                            </p>
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
                        {t("ancestorCTATitle")}
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        {t("ancestorCTASubTitle")}
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

export default Ancestor;
