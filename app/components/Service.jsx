'use client';

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CountUpNumber } from "./CountUpNumber";
import { IMAGES } from "../constants/image";
import { useTranslation } from 'react-i18next';

const Service = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [visibleImages, setVisibleImages] = useState([]);

    // Load ảnh tuần tự, mỗi ảnh cách nhau 150ms
    useEffect(() => {
        const timers = [0, 1, 2, 3].map((index) =>
            setTimeout(() => {
                setVisibleImages(prev => [...prev, index]);
            }, index * 150)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    const cards = useMemo(() => [
        {
            title: t('ancestorDecor'),
            img: `${IMAGES.vietxquynh}`,
            desc: t('ancestorDesc'),
            link: '/services/ancestor'
        },
        {
            title: t('outdoorDecor'),
            img: `${IMAGES.nganxnhat}`,
            desc: t('outdoorDesc'),
            link: '/services/destination'
        },
        {
            title: t('restaurantDecor'),
            img: `${IMAGES.vanxtuc}`,
            desc: t('restaurantDesc'),
            link: '/services/restaurant-wedding'
        },
        {
            title: t('eventDecorTitle'),
            img: `${IMAGES.eventxbenang}`,
            desc: t('eventDecorDesc'),
            link: '/services/event'
        },
    ], [t]);

    return (
        <>
            <section className="bg-[#f8f6ec] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Service Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {cards.slice(0, 4).map((c, i) => (
                            <motion.article
                                key={i}
                                className="relative flex flex-col"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.15,
                                    ease: "easeOut"
                                }}
                            >
                                <a href={c.link} className="relative w-full h-56 bg-gray-200 rounded-lg overflow-hidden z-0 cursor-pointer">
                                    {visibleImages.includes(i) ? (
                                        <motion.img
                                            src={c.img}
                                            alt={c.title}
                                            loading="eager"
                                            decoding="async"
                                            className="w-full h-56 object-cover rounded-lg shadow-md"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            whileHover={{ scale: 1.05 }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                </a>
                                <div className="relative bg-white rounded-md shadow-lg p-6 -mt-12 mx-4 flex-1 flex flex-col min-h-[280px] z-10">
                                    <h3 className="text-center text-lg font-black text-emerald-700 mb-3 min-h-[48px] flex items-center justify-center">
                                        {c.title}
                                    </h3>
                                    <p className="text-md text-gray-600 text-center mb-4 flex-1 leading-relaxed font-light">
                                        {c.desc}
                                    </p>
                                    <div className="text-center mt-auto">
                                        <a
                                            className="inline-block text-sm font-bold text-emerald-700 hover:text-emerald-800 underline transition-colors"
                                            href={c.link}
                                        >
                                            {t('viewDetails')}
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hero Banner Section - Full Width */}
            <section className="relative w-full overflow-hidden shadow-xl">
                <div className="relative min-h-[500px] md:min-h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.service})` }}>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative h-full flex flex-col md:flex-row items-center text-white min-h-[500px] md:min-h-[600px]">
                        {/* Left Side - Stats */}
                        <div className="w-full md:w-1/2 flex flex-row items-center justify-center px-4 md:px-8 py-8 md:py-0">
                            <div className="text-center flex-1">
                                <div className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2"><CountUpNumber target={10} suffix={"+"} /></div>
                                <div className="text-xs md:text-lg uppercase tracking-wide">{t('yearsExperience')}</div>
                            </div>
                            <div className="h-20 md:h-32 w-px bg-white/50 mx-4 md:mx-8"></div>
                            <div className="text-center flex-1">
                                <div className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2"><CountUpNumber target={300} suffix={"+"} /></div>
                                <div className="text-xs md:text-lg uppercase tracking-wide whitespace-pre">{t('couplesServed')}</div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <motion.div
                            className="w-full md:w-1/2 px-6 md:px-12 py-8"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">{t('bannerTitle1')}</h2>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{t('bannerTitle2')}</h3>
                            <p className="text-xs md:text-lg leading-relaxed mb-6 text-justify font-light">
                                {t('bannerDesc')}
                            </p>
                            <button
                                onClick={() => router.push('/portfolio')}
                                className="bg-white text-gray-800 px-4 md:px-6 py-2 rounded text-xs md:text-sm font-bold hover:bg-gray-100 transition cursor-pointer"
                            >
                                {t('designPackages')}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

                <section className="bg-[#f8f6ec] py-16">
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
        </>
    )
}

export default Service