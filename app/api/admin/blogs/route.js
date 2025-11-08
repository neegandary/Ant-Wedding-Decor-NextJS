import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// Admin API - Lấy danh sách blogs với filter và pagination
export async function GET(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('GET blogs error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Admin API - Tạo blog mới
export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();

    const blog = await Blog.create(data);
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error('POST blog error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
