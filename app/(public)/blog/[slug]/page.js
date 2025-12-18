import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import BlogDetailClient from "./BlogDetailClient";

// Generate metadata cho SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antwedding.com';
  
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug: resolvedParams.slug, status: 'published' }).lean();
    
    if (!blog) {
      return {
        title: 'Bài viết không tồn tại',
        description: 'Không tìm thấy bài viết này',
      };
    }

    const title = typeof blog.title === 'object' ? blog.title.vi : blog.title;
    const excerpt = typeof blog.excerpt === 'object' ? blog.excerpt.vi : blog.excerpt;
    
    const metaDescription = blog.metaDescription || excerpt?.substring(0, 160);

    return {
      title: `${title} | Blog Cưới Hỏi Nha Trang`,
      description: metaDescription,
      keywords: blog.metaKeywords || [
        'trang trí tiệc cưới nha trang',
        'cẩm nang cưới',
        'ant wedding',
        ...(blog.tags || [])
      ],
      openGraph: {
        title: `${title} | Ant Wedding Blog`,
        description: metaDescription,
        url: `${baseUrl}/blog/${blog.slug}`,
        type: 'article',
        publishedTime: blog.publishedDate,
        modifiedTime: blog.updatedAt,
        authors: [blog.author || 'Ant Wedding'],
        images: [
          {
            url: blog.thumbnailImage || blog.headerImage,
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
        images: [blog.thumbnailImage || blog.headerImage],
      },
      alternates: {
        canonical: `${baseUrl}/blog/${blog.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog | Ant Wedding Nha Trang',
      description: 'Cẩm nang cưới hỏi, tư vấn trang trí tiệc cưới tại Nha Trang',
    };
  }
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  return <BlogDetailClient slug={resolvedParams.slug} />;
}
