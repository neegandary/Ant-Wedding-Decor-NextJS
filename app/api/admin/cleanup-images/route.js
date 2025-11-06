import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const portfolios = await Portfolio.find({});
    let updatedCount = 0;

    for (const portfolio of portfolios) {
      if (portfolio.images && portfolio.images.length > 0) {
        // Xóa _id khỏi mỗi image object
        const cleanedImages = portfolio.images.map(img => ({
          src: img.src,
          orientation: img.orientation,
          size: img.size,
          alt: img.alt || ''
        }));

        portfolio.images = cleanedImages;
        await portfolio.save();
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Đã clean up ${updatedCount} portfolios`,
      updatedCount
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
