import PortfolioDetailAPI from "../../pages/PortfolioDetailAPI";

export default async function PortfolioDetailPage({ params }) {
  const resolvedParams = await params;
  return <PortfolioDetailAPI params={resolvedParams} />;
}
