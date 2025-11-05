import "./globals.css";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { I18nProvider } from "./i18n/I18nProvider";
import SocialMediaButtons from "./components/SocialMediaButtons";

export const metadata = {
  title: "Ant Wedding - Trang Trí Tiệc Cưới Nha Trang",
  description: "Ant Wedding - Dịch vụ trang trí tiệc cưới chuyên nghiệp tại Nha Trang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://pub-4c5c0327c6a04522b8c7d0f0b2b6c3e8.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-4c5c0327c6a04522b8c7d0f0b2b6c3e8.r2.dev" />
      </head>
      <body className="antialiased">
        <I18nProvider>
          <Header />
          <Navbar />
          <main>{children}</main>
          <SocialMediaButtons />
          <Footer />
          <BackToTop />
        </I18nProvider>
      </body>
    </html>
  );
}
