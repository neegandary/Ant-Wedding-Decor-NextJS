import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

// Public API - Lấy danh sách portfolios (chỉ published)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '100');

    const query = { status: 'published' };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const portfolios = await Portfolio.find(query)
      .select('-metaDescription -metaKeywords -__v')
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error('GET portfolios error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
