import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    enum: ['portrait', 'landscape'],
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  alt: {
    type: String,
    default: '',
  }
}, { _id: false });

const PortfolioSchema = new mongoose.Schema({
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
  
  subtitle: {
    type: String,
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
      'weddingDecor',
      'restaurantDecorCategory', 
      'ancestorDecorCategory',
      'PRE WEDDING',
      'birthday'
    ],
  },
  
  date: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true }
  },
  
  thumbnailImage: {
    type: String,
    required: true,
  },
  
  headerImage: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  
  details: {
    concept: String,
    address: String,
    photographer: String,
  },
  
  contact: {
    hotline: String,
    email: String,
  },
  
  tags: [{
    type: String,
    trim: true,
  }],
  
  images: [ImageSchema],
  
  likes: {
    type: Number,
    default: 0,
  },
  
  metaDescription: String,
  metaKeywords: [String],
  
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published',
  },
  
  featured: {
    type: Boolean,
    default: false,
  },
  
  displayOrder: {
    type: Number,
    default: 0,
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

PortfolioSchema.index({ status: 1, displayOrder: -1 });
PortfolioSchema.index({ category: 1, status: 1 });
PortfolioSchema.index({ createdAt: -1 });

PortfolioSchema.virtual('fullDate').get(function() {
  return `${this.date.day}/${this.date.month}/${this.date.year}`;
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
