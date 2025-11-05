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
        <div className="max-w-full mx-auto relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden shadow-2xl">
            {/* Image Slider */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover absolute inset-0 brightness-100"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8 }}
                />
            </AnimatePresence>

            {/* Gradient Overlay - chỉ ở bottom để text dễ đọc */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? "bg-white w-8" : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="text-center text-white px-4 sm:px-6 max-w-5xl mx-auto pointer-events-auto">
                    {/* Badge */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                        className="inline-block mb-4"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold tracking-wide border border-white/30">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            {t('wedding').toUpperCase()}
                        </span>
                    </motion.div>

                    {/* Main Title with better shadow */}
                    <motion.h1
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.5}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-center mb-6"
                        style={{
                            textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        {t('heroTitle')}
                    </motion.h1>

                    {/* CTA Button */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0.8}
                        className="flex justify-center"
                    >
                        <button
                            onClick={() => router.push('/portfolio')}
                            className="group relative inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-800 rounded-full font-bold text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <span className="relative z-10">{t('readMore')}</span>
                            <svg
                                className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1"
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