import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BackToTop, SocialMediaButtons } from "../components/ClientComponents";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
      <SocialMediaButtons />
      <Footer />
      <BackToTop />
    </>
  );
}
