import mongoose, { Schema, Document } from 'mongoose';

// Define una interfaz para el usuario
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postCode: string;
  role: 'seller' | 'buyer';
}

// Define el esquema usando la interfaz
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postCode: { type: String, required: true },
  role: { type: String, enum: ['seller', 'buyer'], default: 'seller', required: true },
});

// Exporta el modelo tipado
export const User = mongoose.model<IUser>('User', userSchema);