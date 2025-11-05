/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tối ưu cho production
  reactStrictMode: true,
  
  // Tối ưu images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Trailing slash để đảm bảo routing nhất quán
  trailingSlash: false,

  // Đảm bảo nested routes hoạt động đúng
  skipTrailingSlashRedirect: false,
};

export default nextConfig;
