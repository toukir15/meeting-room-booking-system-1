import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import { Room } from '../room/room.model';
import { Slot } from '../slot/slot.model';

const createBookingIntoDB = async (payload: TBooking) => {
  // check room  exist or not
  const isExistRoom = await Room.findById(payload.room);
  if (!isExistRoom) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist');
  }

  // check slot exist or not
  payload.slots.forEach(async (slot) => {
    const isSlotExist = await Slot.findById(slot);
    if (!isSlotExist) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist');
    }
  });

  const result = await Booking.create(payload);
  const id = result._id;

  // make total amount and populate the reference data
  const populatedBooking = await Booking.aggregate([
    // Stage 1: Match by _id
    { $match: { _id: id } },

    // Stage 2: Lookup slots collection to populate 'slots' field
    {
      $lookup: {
        from: 'slots',
        localField: 'slots',
        foreignField: '_id',
        as: 'slots',
      },
    },

    // Stage 3: Unwind the 'slots' array to process each slot individually
    { $unwind: '$slots' },

    // // Stage 4: Lookup rooms collection to populate 'room' field
    {
      $lookup: {
        from: 'rooms',
        localField: 'slots.room',
        foreignField: '_id',
        as: 'room',
      },
    },

    // // Stage 5: Unwind the 'room' array to ensure 'room' is a single object
    { $unwind: '$room' },

    // // Stage 6: Lookup users collection to populate 'user' field
    {
      $lookup: {
        from: 'users', // The name of the users collection
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },

    // // Stage 7: Unwind the 'user' array to ensure 'user' is a single object
    { $unwind: '$user' },

    // Stage 8: Group by _id to restore the structure and accumulate 'slots' array
    {
      $group: {
        _id: '$_id',
        date: { $first: '$date' },
        room: { $first: '$room' },
        user: { $first: '$user' },
        slots: { $push: '$slots' },
        totalAmount: { $sum: '$room.pricePerSlot' },
        isConfirmed: { $first: '$isConfirmed' },
        isDeleted: { $first: '$isDeleted' },
      },
    },
  ]);

  // update total amount
  const totalAmount = populatedBooking[0].totalAmount;
  await Booking.findByIdAndUpdate(
    id,
    {
      totalAmount,
    },
    { new: true, runValidators: true },
  );

  return populatedBooking;
};

const getMyBookingsFromDB = async (id: string) => {
  const result = await Booking.find({ user: id });
  return result;
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  // check is the bookin exist in the db or not
  const isBookingExist = await Booking.findById(id);
  if (!isBookingExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Booking is not exist.');
  }

  // update the booking
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBookingFromDB = async (id: string) => {
  // check is the bookin exist in the db or not
  const isBookingExist = await Booking.findById(id);
  if (!isBookingExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Booking is not exist.');
  }

  // update the booking
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getMyBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
