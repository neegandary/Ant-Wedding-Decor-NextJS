import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { uploadToR2 } from '@/lib/r2';
import connectDB from '@/lib/mongodb';
import UploadLog from '@/lib/models/UploadLog';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const portfolioId = formData.get('portfolioId');
    const folder = formData.get('folder') || 'portfolios';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;
    const key = `${folder}/${fileName}`;

    // Upload to R2
    const url = await uploadToR2(file, key);

    // Log upload
    await connectDB();
    await UploadLog.create({
      portfolioId: portfolioId || null,
      fileName,
      originalName,
      r2Key: key,
      r2Url: url,
      fileSize: file.size,
      mimeType: file.type,
      uploadedBy: session.user.id,
    });

    return NextResponse.json({
      url,
      fileName,
      key,
      size: file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
