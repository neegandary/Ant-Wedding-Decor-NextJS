'use client';

import { lazy, Suspense } from "react";

const Hero = lazy(() => import("../components/Hero.jsx"));
const Introduce = lazy(() => import("../components/Introduce.jsx"));
const Service = lazy(() => import("../components/Service.jsx"));
const Experience = lazy(() => import("../components/Experience.jsx"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#f8f6ec]">
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-emerald-700/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-emerald-700 font-medium text-lg">Đang tải...</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Hero />
      <Introduce />
      <Service />
      <Experience />
    </Suspense>
  )
}

export default Home