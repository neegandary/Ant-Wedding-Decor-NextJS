import "./globals.css";
import { I18nProvider } from "./i18n/I18nProvider";

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
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
