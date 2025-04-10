import { Schema, model, Document } from 'mongoose';

interface IShoppingCart extends Document {
  user: Schema.Types.ObjectId;
  products: Array<{
    productId: Schema.Types.ObjectId;
    quantity: number;
  }>;
  totalPrice: number;
}

const shoppingCartSchema = new Schema<IShoppingCart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
}, {
  timestamps: true,
});

const ShoppingCart = model<IShoppingCart>('ShoppingCart', shoppingCartSchema);
export default ShoppingCart;