import connectDB from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import Portfolio from '@/lib/models/Portfolio'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.antwedding.com'

  // Các trang tĩnh
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Lấy blogs và portfolios từ database
  let blogPages = []
  let portfolioPages = []

  try {
    await connectDB()

    // Lấy tất cả blogs đã published
    const blogs = await Blog.find({ status: 'published' })
      .select('slug updatedAt')
      .lean()

    blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    // Lấy tất cả portfolios đã published
    const portfolios = await Portfolio.find({ status: 'published' })
      .select('slug updatedAt')
      .lean()

    portfolioPages = portfolios.map((portfolio) => ({
      url: `${baseUrl}/portfolio/${portfolio.slug}`,
      lastModified: portfolio.updatedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching data for sitemap:', error)
  }

  return [...staticPages, ...blogPages, ...portfolioPages]
}
