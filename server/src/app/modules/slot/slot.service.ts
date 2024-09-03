import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TSlot, TSlotAvailabilityQuery } from './slot.interace';
import { Slot } from './slot.model';
import { makeSlotFN } from './slot.utils';

const createSlotIntoDB = async (payload: TSlot) => {
  const makeSlot = makeSlotFN(payload);

  // Retrieve existing slots from the database for the given room on the specific date
  const existingSlots = await Slot.find({
    room: makeSlot[0].room,
    date: makeSlot[0].date,
  }).lean();

  // Filter out the unique slots that do not conflict with existing ones
  const uniqueSlots = makeSlot.filter(
    (newSlot) =>
      !existingSlots.some(
        (existingSlot) =>
          existingSlot.startTime === newSlot.startTime ||
          existingSlot.endTime === newSlot.endTime,
      ),
  );

  // Check if any slots are left to insert
  if (uniqueSlots.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'All provided slots already exist or overlap with existing slots.',
    );
  }

  // Insert the unique slots into the database
  const result = await Slot.insertMany(uniqueSlots);
  return result;
};

const getSlotsFromDB = async () => {
  const result = await Slot.aggregate([
    // Lookup stage to join Room collection with Slot collection
    {
      $lookup: {
        from: 'rooms',
        localField: 'room',
        foreignField: '_id',
        as: 'roomDetails',
      },
    },
    // Unwind the roomDetails array (since we're expecting only one match)
    {
      $unwind: '$roomDetails',
    },
    // Project stage to replace room with roomName
    {
      $project: {
        date: 1,
        startTime: 1,
        endTime: 1,
        roomNo: 1,
        isBooked: 1,
        roomName: '$roomDetails.roomName',
      },
    },
    {
      $sort: {
        date: 1,
        startTime: 1,
      },
    },
  ]);

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

const deleteSlotFromDB = async (id: string) => {
  const result = await Slot.findByIdAndDelete(id);
  return result;
};

const updateSlotIntoDB = async (data: { date: string }, id: string) => {
  const result = await Slot.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAvailableAllSlotFromDB,
  getSlotsFromDB,
  deleteSlotFromDB,
  updateSlotIntoDB,
};
