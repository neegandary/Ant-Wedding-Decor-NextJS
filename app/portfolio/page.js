import dynamic from "next/dynamic";

const DecorPortfolioAPI = dynamic(() => import("../pages/DecorPortfolioAPI"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function PortfolioPage() {
  return <DecorPortfolioAPI />;
}
