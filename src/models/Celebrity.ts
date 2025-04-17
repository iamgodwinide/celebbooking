import mongoose, { Schema } from 'mongoose';

export const CelebritySchema: Schema = new Schema({
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
  profession: {
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
  },
  standardCardPrice: {
    type: Number,
    default: 99
  },
  silverCardPrice: {
    type: Number,
    default: 199
  },
  goldCardPrice: {
    type: Number,
    default: 499
  },
  platinumCardPrice: {
    type: Number,
    default: 999
  },
  eventBasedCard: {
    type: Number,
    default: 299
  }
}, {
  timestamps: true
});


export default mongoose.models.Celebrity || mongoose.model('Celebrity', CelebritySchema);
