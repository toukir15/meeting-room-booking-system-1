import { Types } from 'mongoose';

export type TBooking = {
  date: string;
  slot: Types.ObjectId;
  room: Types.ObjectId;
  user: Types.ObjectId;
  isConfirmed?: 'unconfirmed' | 'confirmed';
  isDeleted?: boolean;
};
