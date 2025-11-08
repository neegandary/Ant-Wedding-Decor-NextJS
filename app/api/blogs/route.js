import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// Public API - Lấy danh sách blogs (chỉ published)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const total = await Blog.countDocuments(query);

    const blogs = await Blog.find(query)
      .select('slug title author category excerpt thumbnailImage publishedDate tags featured readTime')
      .sort({ displayOrder: 1, publishedDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + blogs.length < total
      }
    });
  } catch (error) {
    console.error('GET blogs error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
