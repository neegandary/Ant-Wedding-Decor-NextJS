'use client';

import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { IMAGES } from "../constants/image";
import { useTranslation } from 'react-i18next';

const Introduce = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
    };

    return (
        <section className="relative bg-white overflow-hidden py-12 sm:py-16 lg:py-20" ref={ref}>
            <img
                src={IMAGES.background}
                alt="decorative background"
                className="pointer-events-none absolute inset-0 w-full h-full object-contain opacity-30"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left column: heading + paragraph */}
                    <motion.div
                        className="lg:col-span-7"
                        variants={fadeInUp}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <div className="pl-0 sm:pl-4 md:pl-6 lg:pl-12 xl:pl-24 max-w-3xl">
                            <p className="text-base sm:text-lg text-red-500 font-semibold tracking-widest mb-3 sm:mb-4">
                                {t('helloWeAre')}
                            </p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 leading-tight mb-4 sm:mb-6 whitespace-pre">
                                <span className="block">{t('introTitle2')}</span>
                                <span className="block">{t('introTitle1')}</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base sm:text-lg text-justify font-light whitespace-pre-line">
                                {t('introDesc')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Right column: image grid */}
                    <motion.div
                        className="lg:col-span-5"
                        variants={fadeInUp}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start h-full mt-6 sm:mt-8 lg:mt-10">
                            {/* Left stack */}
                            <div className="flex flex-col gap-3 sm:gap-4 h-full">
                                <motion.img
                                    src={IMAGES.intro1}
                                    alt="intro 1"
                                    className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-lg cursor-pointer overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.img
                                    src={IMAGES.intro2}
                                    alt="intro 2"
                                    className="w-full flex-1 min-h-[250px] sm:min-h-[300px] object-cover rounded-xl shadow-lg cursor-pointer overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Right stack */}
                            <div className="flex flex-col gap-3 sm:gap-4 h-full">
                                <div className="bg-gradient-to-br from-[#68866c] to-[#5a7360] text-white rounded-xl p-5 sm:p-6 shadow-lg flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
                                    <p className="mb-3 sm:mb-4 text-justify font-light text-sm sm:text-md leading-relaxed">
                                        {t('introQuote')}
                                    </p>
                                    <div className="border-t border-white/20 pt-3 sm:pt-4">
                                        <div className="font-semibold text-sm sm:text-base">{t('founders')}</div>
                                        <div className="text-xs text-white/80 mt-1">
                                            {t('founderTitle')}
                                        </div>
                                    </div>
                                </div>

                                <motion.img
                                    src={IMAGES.intro3}
                                    alt="intro 3"
                                    className="w-full flex-1 min-h-[180px] sm:min-h-[200px] object-cover rounded-xl shadow-lg cursor-pointer overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Introduce;
