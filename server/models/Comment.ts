import { Schema, model, Document } from 'mongoose';

interface IComment extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  content: string;
  rating: number;  // Rango de 1 a 5
}

const commentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
}, {
  timestamps: true,
});

const Comment = model<IComment>('Comment', commentSchema);
export default Comment;