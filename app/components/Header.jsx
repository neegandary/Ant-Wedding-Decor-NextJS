'use client';

import { Globe, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "../constants/image";
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const { t, i18n } = useTranslation();
    const [searchOpen, setSearchOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        setIsClient(true);
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'vi' ? 'en' : 'vi';
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus();
        }

        function onKey(e) {
            if (e.key === "Escape") setSearchOpen(false);
        }

        function onClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        }

        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, [searchOpen]);

    if (!isClient) {
        return null;
    }

    return (
        <header className="bg-[#f7f6eb] py-3 md:py-4 shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                {/* Mobile Layout */}
                <div className="md:hidden flex items-center justify-between">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link href="/">
                            <Image src={IMAGES.logo_rmbg} alt="Company logo" width={64} height={64} priority />
                        </Link>
                    </div>

                    {/* Hotline & Icons */}
                    <div className="flex items-center gap-2">
                        <a href="tel:0794672928" className="text-xs text-red-700 font-bold">
                            079 467 2928
                        </a>
                        <Link
                            href="/admin"
                            aria-label="Admin"
                            className="text-gray-700 hover:text-emerald-700 p-1"
                        >
                            <User className="w-5 h-5" />
                        </Link>
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            aria-label="Change language"
                            className="text-gray-700 hover:text-emerald-700 p-1"
                        >
                            <Globe className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-3 items-center gap-4">
                    {/* Left: hotline */}
                    <div className="text-sm lg:text-base text-gray-700 font-light">
                        {t('hotline')}: <span className="text-red-700 font-bold">079 467 2928</span>
                    </div>

                    {/* Center: logo */}
                    <div className="flex justify-center">
                        <Link href="/">
                            <Image src={IMAGES.logo_rmbg} alt="Company logo" width={128} height={128} priority className="h-28 w-28 lg:h-32 lg:w-32" />
                        </Link>
                    </div>

                    {/* Right: icons */}
                    <div ref={containerRef} className="flex justify-end items-center space-x-3 lg:space-x-4 cursor-pointer">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/antweddingteam"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Facebook page"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/ant_wedding_team"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Instagram page"
                            className="text-gray-700 hover:text-pink-600 transition-colors"
                        >
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>

                        {/* TikTok */}
                        <a
                            href="https://www.tiktok.com/@antweddingnhatrang"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our TikTok page"
                            className="text-gray-700 hover:text-black transition-colors"
                        >
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                        </a>

                        {/* User Admin */}
                        <Link
                            href="/admin"
                            aria-label="Admin"
                            className="text-gray-700 hover:text-emerald-700 transition-colors"
                        >
                            <User className="w-5 h-5 lg:w-6 lg:h-6" />
                        </Link>

                        {/* Language Toggle */}
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            aria-label="Change language"
                            className="text-gray-700 hover:text-emerald-700 focus:outline-none flex items-center gap-1 transition-colors"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase">{mounted ? i18n.language : 'vi'}</span>
                        </button>


                        {/* Search input (toggle) */}
                        {searchOpen && (
                            <div className="absolute right-0 top-full mt-2 z-10">
                                <input
                                    ref={inputRef}
                                    type="search"
                                    name="q"
                                    placeholder="Search..."
                                    className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#cbb9a4] w-64"
                                    aria-label="Search site"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};