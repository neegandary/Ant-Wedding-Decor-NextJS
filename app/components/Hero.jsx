'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IMAGES } from "../constants/image";
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const images = [
        IMAGES.hero1,
        IMAGES.hero2,
        IMAGES.hero3,
        IMAGES.hero4,
        IMAGES.hero5,
        IMAGES.hero6,
        IMAGES.hero7,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [images.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const textVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay,
                duration: 0.8,
                ease: "easeOut",
            },
        }),
    };

    const slideVariants = {
        enter: {
            opacity: 0,
            scale: 1.1,
        },
        center: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: 0.95,
        },
    };

    return (
        <div className="max-w-full mx-auto relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden shadow-2xl bg-gray-900">
            {/* Background Blur Image */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={`blur-${currentIndex}`}
                        src={images[currentIndex]}
                        alt=""
                        className="w-full h-full object-cover blur-2xl scale-110 opacity-60"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.8 }}
                    />
                </AnimatePresence>
            </div>

            {/* Main Image Slider */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-contain absolute inset-0 brightness-100 z-[1]"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8 }}
                />
            </AnimatePresence>

            {/* Gradient Overlay - tối hơn để text dễ đọc hơn trên mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-[2]"></div>

            {/* Navigation Arrows - ẩn trên mobile nhỏ, hiện từ sm trở lên */}
            <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition hidden xs:block"
                aria-label="Previous slide"
            >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition hidden xs:block"
                aria-label="Next slide"
            >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator - nhỏ hơn trên mobile */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 sm:h-3 rounded-full transition-all ${
                            idx === currentIndex 
                                ? "bg-white w-6 sm:w-8" 
                                : "bg-white/50 w-2 sm:w-3"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 px-4">
                <div className="text-center text-white w-full max-w-5xl mx-auto pointer-events-auto">
                    {/* Badge - nhỏ hơn trên mobile */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                        className="inline-block mb-3 sm:mb-4"
                    >
                        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-white/30">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></span>
                            {t('wedding').toUpperCase()}
                        </span>
                    </motion.div>

                    {/* Main Title - responsive và line-height tốt hơn */}
                    <motion.h1
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.5}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight sm:leading-tight md:leading-tight text-center mb-4 sm:mb-6 px-2"
                        style={{
                            textShadow: '0 4px 20px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)'
                        }}
                    >
                        {t('heroTitle')}
                    </motion.h1>

                    {/* CTA Button - nhỏ gọn hơn trên mobile */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.8}
                        className="flex justify-center"
                    >
                        <button
                            onClick={() => router.push('/portfolio')}
                            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-8 sm:py-3 bg-white text-gray-800 rounded-full font-bold text-sm sm:text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <span className="relative z-10">{t('readMore')}</span>
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#cbb9a4] to-[#a89580] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero