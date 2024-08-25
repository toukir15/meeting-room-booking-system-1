import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TSlot, TSlotAvailabilityQuery } from './slot.interace';
import { Slot } from './slot.model';
import { makeSlotFN } from './slot.utils';

const createSlotIntoDB = async (payload: TSlot) => {
  const makeSlot = makeSlotFN(payload);

  // Retrieve existing slots from the database for the given room
  const existingSlots = await Slot.find({ room: makeSlot[0].room }).lean();

  // Check for duplicates based on startTime or endTime
  const duplicates = makeSlot.filter((newSlot) =>
    existingSlots.some(
      (existingSlot) =>
        existingSlot.startTime === newSlot.startTime ||
        existingSlot.endTime === newSlot.endTime,
    ),
  );

  // Throw error if all provided slots are duplicates
  if (duplicates.length === makeSlot.length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'All provided slots already exist.',
    );
  }

  // Filter out the unique slots
  const uniqueSlots = makeSlot.filter(
    (newSlot) =>
      !existingSlots.some(
        (existingSlot) =>
          existingSlot.startTime === newSlot.startTime &&
          existingSlot.endTime === newSlot.endTime,
      ),
  );

  // Insert the unique slots into the database
  const result = await Slot.insertMany(uniqueSlots);

  return result;
};

const getAvailableAllSlotFromDB = async (query: Record<string, unknown>) => {
  const { date, roomId } = query;
  const slotQuery: TSlotAvailabilityQuery = { isBooked: false };

  // check date for add date query
  if (date) {
    slotQuery.date = date as string;
  }

  // check roomId for add roomId query
  if (roomId) {
    slotQuery.room = roomId as string;
  }
  const result = await Slot.find(slotQuery).populate('room');
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAvailableAllSlotFromDB,
};
