'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';
import { IMAGES } from '../constants/image';
import { useTranslation } from 'react-i18next';

const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

const Experience = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Hàng 1: 6 hình với thông tin
    const row1Images = [
        { img: `${IMAGES.nathanxtracy}`, title: 'FOUND BY FATE', tags: ['weddingDecor'], endpoint: 'nathanxtracy' },
        { img: `${IMAGES.tienxwilliam}`, title: 'QUIET COASTAL LOVE ', tags: ['weddingDecor'], endpoint: 'tienxwilliam' },
        { img: `${IMAGES.vanxtuc}`, title: 'VAN & TUC', tags: ['restaurantDecorCategory'], endpoint: 'vanxtuc' },
        { img: `${IMAGES.tranxtai}`, title: 'TRAN & TAI', tags: ['weddingDecor'], endpoint: 'tranxtai' },
        { img: `${IMAGES.mayxmat}`, title: 'EAT.PRAY.LOVE', tags: ['weddingDecor'], endpoint: 'mayxmat' },
        { img: `${IMAGES.duyenxsteven}`, title: 'DUYEN & STEVEN', tags: ['restaurantDecorCategory'], endpoint: 'duyenxsteven' },
    ];

    // Hàng 2: 6 hình với thông tin
    const row2Images = [
        { img: `${IMAGES.service}`, title: 'THE JOURNEY WITHIN', tags: ['weddingDecor'], endpoint: 'hanxtuan' },
        { img: `${IMAGES.phuongxhien}`, title: 'PHUONG & HIEN', tags: ['ancestorDecorCategory'], endpoint: 'phuongxhien' },
        { img: `${IMAGES.duyxmy}`, title: 'SWEETEST DAY', tags: ['ancestorDecorCategory'], endpoint: 'duyxmy' },
        { img: `${IMAGES.phuongxhien2_3}`, title: 'PHUONG & HIEN', tags: ['restaurantDecorCategory'], endpoint: 'phuongxhien2' },
        { img: `${IMAGES.elopement}`, title: 'ELOPE WEDDING', tags: ['weddingDecor'], endpoint: 'elopement' },
        { img: `${IMAGES.hieuxbrian}`, title: 'WELCOME HOME', tags: ['weddingDecor'], endpoint: 'hieuxbrian' },
    ];

    const handleImageClick = (endpoint) => {
        router.push(`/portfolio/${endpoint}`);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    if (!isClient) {
        return (
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">
                            ANT<span className="font-normal">WORK</span>
                        </h2>
                        <p className="text-lg text-orange-400">{t("workSubTitle")}</p>
                    </div>
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="w-12 h-12 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                        ANT<span className="font-normal">WORK</span>
                    </h2>
                    <p className="text-lg text-orange-400">{t("workSubTitle")}</p>
                </div>

                {/* First Row Slider - 6 images, show 4 */}
                <div className="mb-8">
                    <Slider {...settings}>
                        {row1Images.map((item, idx) => (
                            <div key={`row1-${idx}`} className="px-2">
                                <div className="relative group overflow-hidden rounded-lg cursor-pointer" onClick={() => handleImageClick(item.endpoint)}>
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={400}
                                        height={192}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                                        {/* Expand Icon */}
                                        <div className="absolute top-3 right-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                        </div>
                                        {/* Tags */}
                                        <div className="flex flex-col gap-2 mb-4">
                                            {item.tags.map((tag, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm">
                                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    <span className="whitespace-nowrap">{t(tag)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-center">{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Second Row Slider - 6 images, show 4 */}
                <div>
                    <Slider {...settings}>
                        {row2Images.map((item, idx) => (
                            <div key={`row2-${idx}`} className="px-2">
                                <div className="relative group overflow-hidden rounded-lg cursor-pointer" onClick={() => handleImageClick(item.endpoint)}>
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={400}
                                        height={192}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                                        {/* Expand Icon */}
                                        <div className="absolute top-3 right-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                        </div>
                                        {/* Tags */}
                                        <div className="flex flex-col gap-2 mb-4">
                                            {item.tags.map((tag, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm">
                                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    <span className="whitespace-nowrap">{t(tag)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-center">{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default Experience;
