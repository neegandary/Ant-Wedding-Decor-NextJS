import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

// GET - Lấy danh sách portfolios (có phân trang)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [portfolios, total] = await Promise.all([
      Portfolio.find(query)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Portfolio.countDocuments(query)
    ]);

    return NextResponse.json({
      portfolios,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('GET portfolios error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Tạo portfolio mới
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();

    // Check slug unique
    const existing = await Portfolio.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json({ error: 'Slug đã tồn tại' }, { status: 400 });
    }

    const portfolio = await Portfolio.create(data);

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error('POST portfolio error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
