import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

// GET - Lấy chi tiết 1 portfolio
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const portfolio = await Portfolio.findById(params.id);

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio không tồn tại' }, { status: 404 });
    }

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('GET portfolio error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Cập nhật portfolio
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();

    // Check slug unique nếu thay đổi
    if (data.slug) {
      const existing = await Portfolio.findOne({ 
        slug: data.slug, 
        _id: { $ne: params.id } 
      });
      if (existing) {
        return NextResponse.json({ error: 'Slug đã tồn tại' }, { status: 400 });
      }
    }

    const portfolio = await Portfolio.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio không tồn tại' }, { status: 404 });
    }

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('PUT portfolio error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Xóa portfolio
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Chỉ admin mới được xóa (editor không được)
    if (session.user.role !== 'admin') {
      return NextResponse.json({ 
        error: 'Chỉ Admin mới có quyền xóa portfolio' 
      }, { status: 403 });
    }

    await connectDB();

    const portfolio = await Portfolio.findById(params.id);

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio không tồn tại' }, { status: 404 });
    }

    // Xóa portfolio khỏi database
    await Portfolio.findByIdAndDelete(params.id);

    // Note: Ảnh trên R2 vẫn giữ lại để tránh mất dữ liệu
    // Nếu muốn xóa ảnh, cần implement deleteFromR2() từ lib/r2.js

    return NextResponse.json({ 
      message: 'Đã xóa portfolio thành công',
      deletedId: params.id 
    });
  } catch (error) {
    console.error('DELETE portfolio error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
