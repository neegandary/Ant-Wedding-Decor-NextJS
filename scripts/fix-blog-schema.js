import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function fixBlogSchema() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Drop the Blog collection to reset schema
    console.log('🗑️  Dropping Blog collection...');
    try {
      await mongoose.connection.db.collection('blogs').drop();
      console.log('✅ Blog collection dropped');
    } catch (error) {
      if (error.message.includes('ns not found')) {
        console.log('ℹ️  Blog collection does not exist yet');
      } else {
        throw error;
      }
    }

    // Clear mongoose model cache
    console.log('🧹 Clearing Mongoose model cache...');
    if (mongoose.models.Blog) {
      delete mongoose.models.Blog;
    }
    if (mongoose.modelSchemas && mongoose.modelSchemas.Blog) {
      delete mongoose.modelSchemas.Blog;
    }
    console.log('✅ Model cache cleared');

    // Recreate the model with new schema
    console.log('📝 Creating new Blog model...');
    const BlogSchema = new mongoose.Schema({
      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      author: {
        type: String,
        default: 'Ant Wedding',
      },
      category: {
        type: String,
        required: true,
        enum: [
          'cam-nang',           // Cẩm nang
          'real-life-wedding',  // Real-life Wedding
          'tu-van-dam-cuoi',    // Tư vấn đám cưới
          'cuoi-truyen',        // Cưới truyền
          'dich-vu-khac'        // Dịch vụ khác
        ],
      },
      excerpt: {
        type: String,
        required: true,
        maxlength: 300,
      },
      content: {
        type: String,
        required: true,
      },
      thumbnailImage: {
        type: String,
        required: true,
      },
      headerImage: {
        type: String,
        required: true,
      },
      tags: [{
        type: String,
        trim: true,
      }],
      publishedDate: {
        type: Date,
        default: Date.now,
      },
      metaDescription: String,
      metaKeywords: [String],
      status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
      },
      featured: {
        type: Boolean,
        default: false,
      },
      displayOrder: {
        type: Number,
        default: 0,
      },
      views: {
        type: Number,
        default: 0,
      },
      readTime: {
        type: Number,
        default: 5,
      }
    }, {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    });

    // Create indexes
    BlogSchema.index({ status: 1, displayOrder: -1 });
    BlogSchema.index({ category: 1, status: 1 });
    BlogSchema.index({ publishedDate: -1 });
    BlogSchema.index({ featured: 1, status: 1 });

    const Blog = mongoose.model('Blog', BlogSchema);
    console.log('✅ New Blog model created');

    // Create indexes
    console.log('📊 Creating indexes...');
    await Blog.createIndexes();
    console.log('✅ Indexes created');

    console.log('\n✅ Blog schema fixed successfully!');
    console.log('\n📝 New category enum values:');
    console.log('   - cam-nang');
    console.log('   - real-life-wedding');
    console.log('   - tu-van-dam-cuoi');
    console.log('   - cuoi-truyen');
    console.log('   - dich-vu-khac');
    console.log('\n⚠️  Please restart your Next.js server for changes to take effect.');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

fixBlogSchema();
