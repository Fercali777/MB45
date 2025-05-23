// server/models/ShoppingItem.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IShoppingItem extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

const shoppingItemSchema = new Schema<IShoppingItem>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const ShoppingItem = mongoose.model<IShoppingItem>(
  "ShoppingItem",
  shoppingItemSchema
);