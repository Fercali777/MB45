import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  role: 'buyer' | 'seller';
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller'], required: true },
}, {
  timestamps: true,
});

const User = model<IUser>('User', userSchema);
export default User;