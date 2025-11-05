'use client';

import { useState, useEffect } from 'react'
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from 'react-i18next'

export const Navbar = () => {
    const pathname = usePathname();
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Show loading state during hydration
    if (!mounted) {
        return (
            <div className="bg-[#cbb9a4] sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="hidden md:flex space-x-8 py-4 text-md font-black justify-center text-white">
                        <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
                    </nav>
                    <div className="md:hidden flex items-center justify-between py-4">
                        <span className="text-white font-bold text-lg">ANT WEDDING</span>
                        <Menu className="text-white" size={24} />
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-[#cbb9a4] sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 py-4 text-md font-black justify-center text-white">
                    <Link href='/' className={`hover:text-[#A48D78] transition-colors ${pathname === '/' ? 'text-[#A48D78]' : ''}`}>{t('home')}</Link>
                    
                    {/* Dropdown DỊCH VỤ */}
                    <div className="relative group before:content-[''] before:absolute before:top-full before:left-0 before:w-full before:h-4 before:bg-transparent">
                        <Link 
                            href="/services"
                            className={`flex items-center gap-1 hover:text-[#A48D78] transition-colors after:content-[''] after:absolute after:left-0 after:top-full after:w-full after:h-2 after:bg-transparent ${pathname.startsWith('/services') ? 'text-[#A48D78]' : ''}`}
                        >
                            {t('services')}
                            <ChevronDown size={16} />
                        </Link>

                        {/* Menu con (card-style dropdown) */}
                        <ul className="absolute left-0 top-10 mt-0 min-w-[290px] rounded-md bg-white/70 backdrop-blur-sm shadow-md py-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto transition-all duration-150 z-50">
                            <li className="flex text-start">
                                <Link
                                    href="/services/destination"
                                    className="block w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/20"
                                >
                                    {t('destinationWedding')}
                                </Link>
                            </li>
                            <li className="flex text-start">
                                <Link
                                    href="/services/restaurant-wedding"
                                    className="block w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/20"
                                >
                                    {t('restaurantWedding')}
                                </Link>
                            </li>
                            <li className="flex text-start">
                                <Link
                                    href="/services/ancestor"
                                    className="block w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/20"
                                >
                                    {t('ancestorCeremony')}
                                </Link>
                            </li>
                            <li className="flex text-start">
                                <Link
                                    href="/services/event"
                                    className="block w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/20"
                                >
                                    {t('eventDecor')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link href='/portfolio' className={`hover:text-[#A48D78] transition-colors ${pathname === '/portfolio' ? 'text-[#A48D78]' : ''}`}>{t('work')}</Link>
                    <Link href='/about' className={`hover:text-[#A48D78] transition-colors ${pathname === '/about' ? 'text-[#A48D78]' : ''}`}>{t('about')}</Link>
                    <Link href='/contact' className={`hover:text-[#A48D78] transition-colors ${pathname === '/contact' ? 'text-[#A48D78]' : ''}`}>{t('contact')}</Link>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center justify-between py-4">
                    <Link href='/' className="text-white font-bold text-lg">
                        ANT WEDDING
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white p-2"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-2">
                            <Link 
                                href='/' 
                                className="text-white hover:text-[#A48D78] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('home')}
                            </Link>
                            
                            {/* Services Dropdown for Mobile */}
                            <div>
                                <button
                                    onClick={() => setServicesOpen(!servicesOpen)}
                                    className="flex items-center justify-between w-full text-white hover:text-[#A48D78] transition-colors py-2"
                                >
                                    {t('services')}
                                    <ChevronDown size={16} className={`transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {servicesOpen && (
                                    <div className="pl-4 flex flex-col space-y-2 mt-2">
                                        <Link
                                            href="/services/destination"
                                            className="text-white/90 hover:text-white text-sm py-1"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {t('destinationWedding')}
                                        </Link>
                                        <Link
                                            href="/services/restaurant-wedding"
                                            className="text-white/90 hover:text-white text-sm py-1"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {t('restaurantWedding')}
                                        </Link>
                                        <Link
                                            href="/services/ancestor"
                                            className="text-white/90 hover:text-white text-sm py-1"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {t('ancestorCeremony')}
                                        </Link>
                                        <Link
                                            href="/services/event"
                                            className="text-white/90 hover:text-white text-sm py-1"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {t('eventDecor')}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link 
                                href='/portfolio' 
                                className="text-white hover:text-[#A48D78] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('work')}
                            </Link>
                            <Link 
                                href='/about' 
                                className="text-white hover:text-[#A48D78] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('about')}
                            </Link>
                            <Link 
                                href='/contact' 
                                className="text-white hover:text-[#A48D78] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('contact')}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}