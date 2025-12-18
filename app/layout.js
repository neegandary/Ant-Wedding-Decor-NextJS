import "./globals.css";
import { I18nProvider } from "./i18n/I18nProvider";

export const metadata = {
  title: {
    default: "Ant Wedding - Trang Trí Tiệc Cưới Nha Trang | Dịch Vụ Cưới Hỏi Chuyên Nghiệp",
    template: "%s | Ant Wedding Nha Trang",
  },
  description: "Ant Wedding - Dịch vụ trang trí tiệc cưới, đám cưới chuyên nghiệp tại Nha Trang. Trang trí tiệc cưới ngoài trời, nhà hàng, lễ gia tiên. Hotline tư vấn miễn phí.",
  keywords: [
    "trang trí tiệc cưới nha trang",
    "dịch vụ cưới hỏi nha trang", 
    "trang trí đám cưới nha trang",
    "wedding planner nha trang",
    "trang trí tiệc cưới ngoài trời",
    "trang trí lễ gia tiên",
    "dịch vụ trang trí cưới",
    "ant wedding nha trang",
    "tổ chức tiệc cưới nha trang",
    "decor tiệc cưới nha trang"
  ],
  authors: [{ name: "Ant Wedding" }],
  creator: "Ant Wedding",
  publisher: "Ant Wedding",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antwedding.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ant Wedding - Trang Trí Tiệc Cưới Nha Trang",
    description: "Dịch vụ trang trí tiệc cưới, đám cưới chuyên nghiệp tại Nha Trang. Trang trí tiệc cưới ngoài trời, nhà hàng, lễ gia tiên.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antwedding.com',
    siteName: "Ant Wedding",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ant Wedding - Trang Trí Tiệc Cưới Nha Trang',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Thêm mã xác minh Google Search Console ở đây nếu cần
    // google: 'your-google-verification-code',
  },
  icons: {
    icon: '/logo.ico',
  },
};

// JSON-LD Structured Data cho Local Business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Ant Wedding',
  description: 'Dịch vụ trang trí tiệc cưới chuyên nghiệp tại Nha Trang',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antwedding.com',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antwedding.com'}/logo.png`,
  image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antwedding.com'}/og-image.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nha Trang',
    addressRegion: 'Khánh Hòa',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.2388,
    longitude: 109.1967,
  },
  areaServed: {
    '@type': 'City',
    name: 'Nha Trang',
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '20:00',
  },
  sameAs: [
    // Thêm link social media của bạn ở đây
    'https://www.facebook.com/antweddingteam',
    'https://www.instagram.com/ant_wedding_team',
  ],
  serviceType: [
    'Trang trí tiệc cưới',
    'Trang trí đám cưới',
    'Wedding decoration',
    'Trang trí lễ gia tiên',
    'Trang trí tiệc cưới ngoài trời',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://pub-4c5c0327c6a04522b8c7d0f0b2b6c3e8.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-4c5c0327c6a04522b8c7d0f0b2b6c3e8.r2.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
