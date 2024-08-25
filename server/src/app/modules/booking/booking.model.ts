import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: { type: String },
  slots: { type: [Schema.ObjectId], ref: 'Slot' },
  room: { type: Schema.ObjectId, ref: 'Room' },
  user: { type: Schema.ObjectId, ref: 'User' },
  totalAmount: { type: Number, default: 0 },
  isConfirmed: {
    type: String,
    enum: ['unconfirmed', 'confirmed'],
    default: 'unconfirmed',
  },
  isDeleted: { type: Boolean, default: false },
});

// create a model for booking
export const Booking = model<TBooking>('Booking', bookingSchema);
