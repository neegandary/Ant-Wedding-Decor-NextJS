'use client';

import { IMAGES } from "../constants/image";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="bg-[#cbb9a4] text-white py-12"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Left Column - Logo & Contact Us */}
                    <motion.div
                        initial={{ x: -80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2, margin: '-100px' }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="mb-6">
                            <div className="flex justify-center gap-2 mb-2">
                                <img src={IMAGES.logo_rmbg} alt="logo" className="h-50 w-50" />
                            </div>
                        </div>
                        <div className="border-t border-white/30 pt-4 flex justify-center">
                            <h3 className="text-5xl font-bold text-[#806a56] mb-4">{t('contactUs')}</h3>
                        </div>
                    </motion.div>

                    {/* Middle Column - Contact Info */}
                    <motion.div
                        className="space-y-4"
                        initial={{ y: 80, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2, margin: '-100px' }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <div className="text-[#806a56] text-sm mb-1">{t('ourPhone')}</div>
                                    <div className="font-semibold">079 467 2928</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <div className="text-[#806a56] text-sm mb-1">{t('ourEmail')}</div>
                                    <div className="font-semibold">antwedding79@gmail.com</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <div className="text-[#806a56] text-sm mb-1">{t('ourAddress')}</div>
                                    <div className="font-semibold ">
                                        {t('addressDetail')}<br />
                                        {t('appointmentNote')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Social Media */}
                    <motion.div
                        initial={{ x: 80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2, margin: '-100px' }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <h3 className="text-lg font-bold mb-4">{t('followAnt')}</h3>
                        <div className="bg-white rounded-lg p-4">
                            <div className="mb-3">
                                <img
                                    src="/logo.ico"
                                    alt="White Wedding Decor"
                                    className="w-full h-32 object-cover rounded"
                                />
                            </div>
                            <div className="text-gray-800 text-sm font-semibold mb-2">Ant Wedding</div>
                            <div className="text-gray-600 text-xs mb-3">2,2K {t('followers')}</div>
                            <div className="flex gap-2">
                                <a
                                    href="https://www.facebook.com/antweddingteam"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700 transition text-center"
                                >
                                    <span className="flex items-center justify-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        {t('followPage')}
                                    </span>
                                </a>
                                <button className="flex-1 bg-gray-200 text-gray-800 text-xs py-2 rounded hover:bg-gray-300 transition">
                                    {t('share')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/30 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <div>{t('tagline')}</div>

                        <div>{t('footerNote')}</div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}


