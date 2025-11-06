import dynamic from "next/dynamic";

const PortfolioDetailAPI = dynamic(() => import("../../pages/PortfolioDetailAPI"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default async function PortfolioDetailPage({ params }) {
  const resolvedParams = await params;
  return <PortfolioDetailAPI params={resolvedParams} />;
}
