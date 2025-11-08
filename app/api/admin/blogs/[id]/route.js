import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// Admin API - Lấy chi tiết blog
export async function GET(request, { params }) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('GET blog error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Admin API - Cập nhật blog
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();

    const blog = await Blog.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error('PUT blog error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Admin API - Xóa blog
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('DELETE blog error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
