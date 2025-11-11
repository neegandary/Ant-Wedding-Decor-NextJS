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

BlogSchema.index({ status: 1, displayOrder: -1 });
BlogSchema.index({ category: 1, status: 1 });
BlogSchema.index({ publishedDate: -1 });
BlogSchema.index({ featured: 1, status: 1 });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
