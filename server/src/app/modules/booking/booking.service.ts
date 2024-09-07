import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Room } from '../room/room.model';

const createBookingIntoDB = async (payload: TBooking) => {
  // check room  exist or not
  const isExistRoom = await Room.findById(payload.room);
  if (!isExistRoom) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room does not exist');
  }
  const result = await Booking.create(payload);
  return result;
};

import { Types } from 'mongoose';

const getMyBookingsFromDB = async (id: string) => {
  const userId = new Types.ObjectId(id);
  const result = await Booking.aggregate([
    {
      $match: { user: userId }, // Match bookings for the specified user
    },
    {
      $lookup: {
        from: 'rooms',
        localField: 'room',
        foreignField: '_id',
        as: 'room',
      },
    },
    {
      $unwind: '$room',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'slots',
        localField: 'slot',
        foreignField: '_id',
        as: 'slot',
      },
    },
    {
      $unwind: '$slot',
    },
    {
      $project: {
        _id: 1,
        date: 1,
        user: {
          _id: 1,
          name: 1,
        },
        room: {
          _id: 1,
          roomName: 1,
          pricePerSlot: 1,
        },
        slot: {
          _id: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
        },
        isConfirmed: 1,
        isDeleted: 1,
      },
    },
  ]);

  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.aggregate([
    {
      $match: {
        isDeleted: { $ne: true },
      },
    },
    {
      $lookup: {
        from: 'rooms',
        localField: 'room',
        foreignField: '_id',
        as: 'room',
      },
    },
    {
      $unwind: '$room',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'slots',
        localField: 'slot',
        foreignField: '_id',
        as: 'slot',
      },
    },
    {
      $unwind: '$slot',
    },
    {
      $project: {
        _id: 1,
        date: 1,
        user: {
          _id: 1,
          name: 1,
        },
        room: {
          _id: 1,
          roomName: 1,
          pricePerSlot: 1,
        },
        slot: {
          _id: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
        },
        isConfirmed: 1,
        isDeleted: 1,
      },
    },
  ]);
  return result;
};

// const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
//   // check is the bookin exist in the db or not
//   const isBookingExist = await Booking.findById(id);
//   if (!isBookingExist) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Booking is not exist.');
//   }

//   // update the booking
//   const result = await Booking.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

const updateBookingIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isConfirmed: 'confirmed' },
    { new: true },
  );
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
  getAllBookingsFromDB,
};
