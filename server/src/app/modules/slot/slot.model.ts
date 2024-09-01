import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interace';

// create a schema for slot
const slotSchema = new Schema<TSlot>({
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  roomNo: { type: String },
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  isBooked: { type: Boolean },
});

// Create a Model for slot.
export const Slot = model<TSlot>('Slot', slotSchema);
