import { Schema, model, Document } from 'mongoose';

interface ILike extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
}

const likeSchema = new Schema<ILike>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
}, {
  timestamps: true,
});

const Like = model<ILike>('Like', likeSchema);
export default Like;