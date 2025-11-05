import PortfolioDetail from "../../pages/PortfolioDetail";

export default async function PortfolioDetailPage({ params }) {
  const resolvedParams = await params;
  return <PortfolioDetail params={resolvedParams} />;
}
