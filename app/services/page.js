import dynamic from "next/dynamic";

const Service = dynamic(() => import("../pages/Service"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function ServicesPage() {
  return <Service />;
}
