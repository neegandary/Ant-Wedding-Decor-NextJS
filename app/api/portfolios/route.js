import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

// Public API - Lấy danh sách portfolios (chỉ published) với pagination
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    // Get total count for pagination
    const total = await Portfolio.countDocuments(query);

    // Get portfolios with pagination
    const portfolios = await Portfolio.find(query)
      .select('slug title subtitle category date thumbnailImage author likes status featured displayOrder')
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      portfolios,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + portfolios.length < total
      }
    });
  } catch (error) {
    console.error('GET portfolios error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
