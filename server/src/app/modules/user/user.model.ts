import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, unique: 1, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

// 3. Create a Model.
export const User = model<TUser>('User', userSchema);
