import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// Public API - Lấy chi tiết blog theo slug
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { slug } = await params;

    const blog = await Blog.findOne({ 
      slug: slug,
      status: 'published'
    }).lean();

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Tăng view count
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    // Lấy related blogs
    const relatedBlogs = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
      status: 'published'
    })
    .select('slug title thumbnailImage excerpt publishedDate readTime')
    .limit(3)
    .lean();

    return NextResponse.json({ blog, relatedBlogs });
  } catch (error) {
    console.error('GET blog error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
