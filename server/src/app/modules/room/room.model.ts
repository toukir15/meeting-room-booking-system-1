import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

const roomSchema = new Schema<TRoom>({
  roomName: { type: String, required: true, unique: true },
  capacity: { type: String, required: true },
  roomNo: { type: String, required: true },
  floorNo: { type: String, required: true },
  pricePerSlot: { type: String, required: true },
  availableQuantity: { type: String, required: true },
  images: { type: [String] },
  amenities: { type: [String], required: true },
  isDeleted: { type: Boolean, default: false },
});

// 3. Create a Model.
export const Room = model<TRoom>('Room', roomSchema);
