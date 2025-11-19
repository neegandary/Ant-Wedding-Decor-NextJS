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
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(v) {
        // Accept both string (old format) and object (new format)
        return typeof v === 'string' || (typeof v === 'object' && (v.vi || v.en));
      },
      message: 'Title must be a string or an object with vi/en properties'
    }
  },
  
  subtitle: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(v) {
        // Accept both string (old format) and object (new format)
        return !v || typeof v === 'string' || (typeof v === 'object' && (v.vi || v.en));
      },
      message: 'Subtitle must be a string or an object with vi/en properties'
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
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(v) {
        // Accept both string (old format) and object (new format)
        return typeof v === 'string' || (typeof v === 'object' && (v.vi || v.en));
      },
      message: 'Description must be a string or an object with vi/en properties'
    }
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

// Clear cached model to ensure schema updates are applied
if (mongoose.models.Portfolio) {
  delete mongoose.models.Portfolio;
}

export default mongoose.model('Portfolio', PortfolioSchema);
