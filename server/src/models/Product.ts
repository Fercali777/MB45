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
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // relación con el usuario
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);