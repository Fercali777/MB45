import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  mainMaterial: { type: String },
  color: { type: String },
  width: { type: Number },
  height: { type: Number },
  depth: { type: Number },
  description: { type: String },
  image: { type: String, required: true }, 
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isDeleted: { type: Boolean, default: false }, // Soft delete field
  deletedAt: { type: Date }, // When it was deleted
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);