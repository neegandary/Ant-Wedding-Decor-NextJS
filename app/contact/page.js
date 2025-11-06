import dynamic from "next/dynamic";

const Contact = dynamic(() => import("../pages/Contact"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function ContactPage() {
  return <Contact />;
}
