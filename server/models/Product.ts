import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  material: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: { type: [String], required: true },
  material: { type: String, required: true },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
  },
}, {
  timestamps: true,
});

const Product = model<IProduct>('Product', productSchema);
export default Product;