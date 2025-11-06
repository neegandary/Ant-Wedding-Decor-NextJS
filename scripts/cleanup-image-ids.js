// Script để xóa _id dư thừa trong images array
// Chạy: node scripts/cleanup-image-ids.js

import mongoose from 'mongoose';
import Portfolio from '../lib/models/Portfolio.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function cleanupImageIds() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const portfolios = await Portfolio.find({});
    console.log(`📊 Found ${portfolios.length} portfolios`);

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
        console.log(`✅ Cleaned portfolio: ${portfolio.slug}`);
      }
    }

    console.log(`\n🎉 Done! Updated ${updatedCount} portfolios`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanupImageIds();
