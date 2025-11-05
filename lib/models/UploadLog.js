import mongoose from 'mongoose';

const UploadLogSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
  
  fileName: {
    type: String,
    required: true,
  },
  
  originalName: {
    type: String,
    required: true,
  },
  
  r2Key: {
    type: String,
    required: true,
  },
  
  r2Url: {
    type: String,
    required: true,
  },
  
  fileSize: {
    type: Number,
    required: true,
  },
  
  mimeType: {
    type: String,
    required: true,
  },
  
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  
}, {
  timestamps: true,
});

export default mongoose.models.UploadLog || mongoose.model('UploadLog', UploadLogSchema);
