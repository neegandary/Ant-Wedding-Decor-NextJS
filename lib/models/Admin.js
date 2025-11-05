import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  
  password: {
    type: String,
    required: true,
    select: false,
  },
  
  name: {
    type: String,
    required: true,
  },
  
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor',
  },
  
  active: {
    type: Boolean,
    default: true,
  },
  
  lastLogin: Date,
  
}, {
  timestamps: true,
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
