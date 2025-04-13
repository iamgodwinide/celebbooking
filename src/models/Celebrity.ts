import mongoose, { Schema } from 'mongoose';

const CelebritySchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Celebrity name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  professions: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: [true, 'Celebrity bio is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Celebrity image is required']
  },
  coverImageUrl: {
    type: String
  },
  socialMedia: {
    instagram: String,
    twitter: String,
    tiktok: String,
    youtube: String
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


export default mongoose.models.Celebrity || mongoose.model('Celebrity', CelebritySchema);
