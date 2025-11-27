import mongoose from 'mongoose';

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
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (v) {
        return typeof v === 'string' || (typeof v === 'object' && (v.vi || v.en));
      },
      message: 'Title must be a string or an object with vi/en properties'
    }
  },

  author: {
    type: String,
    default: 'Ant Wedding',
  },

  category: {
    type: String,
    required: true,
    enum: [
      'cam-nang-cuoi',           // Cẩm Nang Cưới
      'dam-cuoi-truyen-thong',   // Đám Cưới Truyền Thống
      'tiec-cuoi-ngoai-troi',    // Tiệc Cưới Ngoài Trời
      'chuyen-nghe'              // Chuyên Nghề
    ],
  },

  excerpt: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (v) {
        return typeof v === 'string' || (typeof v === 'object' && (v.vi || v.en));
      },
      message: 'Excerpt must be a string or an object with vi/en properties'
    }
  },

  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (v) {
        return typeof v === 'string' || (typeof v === 'object' && (v.vi || v.en));
      },
      message: 'Content must be a string or an object with vi/en properties'
    }
  },

  // Page Builder Support
  contentBlocks: {
    type: Array,
    default: [],
  },

  contentVersion: {
    type: String,
    enum: ['html', 'blocks'],
    default: 'html',
  },

  thumbnailImage: {
    type: String,
    required: true,
  },

  headerImage: {
    type: String,
    required: false,
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

BlogSchema.index({ status: 1, displayOrder: -1 });
BlogSchema.index({ category: 1, status: 1 });
BlogSchema.index({ publishedDate: -1 });
BlogSchema.index({ featured: 1, status: 1 });

// Clear cached model to ensure schema updates are applied
if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

export default mongoose.model('Blog', BlogSchema);
