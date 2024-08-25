import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find();
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  // check is room exist or not
  const isRoomExist = await Room.findById(id);
  if (!isRoomExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is not exist');
  }
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteRoomIntoDB = async (id: string) => {
  // check is room exist or not
  const isRoomExist = await Room.findById(id);
  if (!isRoomExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is not exist');
  }

  const isDeleted = await Room.findOne({ _id: id, isDeleted: true });

  // check room already deleted or not
  if (isDeleted) {
    throw new AppError(httpStatus.CONFLICT, 'Room is already deleted');
  }

  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomIntoDB,
};
