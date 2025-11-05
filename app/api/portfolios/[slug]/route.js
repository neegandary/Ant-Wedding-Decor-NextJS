import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

// Public API - Lấy chi tiết portfolio theo slug
export async function GET(request, { params }) {
  try {
    await connectDB();

    const portfolio = await Portfolio.findOne({ 
      slug: params.slug,
      status: 'published'
    })
      .select('-__v')
      .lean();

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio không tồn tại' }, { status: 404 });
    }

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('GET portfolio error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
