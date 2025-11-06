import dynamic from "next/dynamic";

const AboutUs = dynamic(() => import("../pages/AboutUs"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function AboutPage() {
  return <AboutUs />;
}
