import dynamic from "next/dynamic";
import connectDB from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";

const PortfolioDetailAPI = dynamic(() => import("../../../pages/PortfolioDetailAPI"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

// Generate metadata cho SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antwedding.com';
  
  try {
    await connectDB();
    const portfolio = await Portfolio.findOne({ slug: resolvedParams.slug }).lean();
    
    if (!portfolio) {
      return {
        title: 'Portfolio không tồn tại',
        description: 'Không tìm thấy portfolio này',
      };
    }

    const title = typeof portfolio.title === 'object' ? portfolio.title.vi : portfolio.title;
    const description = typeof portfolio.description === 'object' 
      ? portfolio.description.vi 
      : portfolio.description;
    
    // Truncate description to 160 chars for SEO
    const metaDescription = portfolio.metaDescription || 
      (description?.substring(0, 160) + (description?.length > 160 ? '...' : ''));

    return {
      title: `${title} | Trang Trí Tiệc Cưới Nha Trang`,
      description: metaDescription,
      keywords: portfolio.metaKeywords || [
        'trang trí tiệc cưới nha trang',
        'decor tiệc cưới',
        'ant wedding',
        ...(portfolio.tags || [])
      ],
      openGraph: {
        title: `${title} | Ant Wedding Nha Trang`,
        description: metaDescription,
        url: `${baseUrl}/portfolio/${portfolio.slug}`,
        type: 'article',
        images: [
          {
            url: portfolio.thumbnailImage || portfolio.headerImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: metaDescription,
        images: [portfolio.thumbnailImage || portfolio.headerImage],
      },
      alternates: {
        canonical: `${baseUrl}/portfolio/${portfolio.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Portfolio | Ant Wedding Nha Trang',
      description: 'Xem các dự án trang trí tiệc cưới của Ant Wedding tại Nha Trang',
    };
  }
}

export default async function PortfolioDetailPage({ params }) {
  const resolvedParams = await params;
  return <PortfolioDetailAPI params={resolvedParams} />;
}
