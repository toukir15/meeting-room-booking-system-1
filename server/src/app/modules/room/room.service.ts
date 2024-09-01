import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TMulterFile, TRoom } from './room.interface';
import { Room } from './room.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createRoomIntoDB = async (roomData: TRoom, files: TMulterFile[]) => {
  const data = {
    roomName: roomData.roomName,
    roomNo: roomData.roomNo,
    floorNo: roomData.floorNo,
    capacity: roomData.capacity,
    pricePerSlot: roomData.pricePerSlot,
    availableQuantity: roomData.availableQuantity,
    amenities: roomData.amenities,
  };

  const findRoom = await Room.findOne({ roomName: roomData.roomName });
  if (findRoom) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This room already exist');
  }

  const result = await Room.create(data);
  files.map(async (file) => {
    const { secure_url } = await sendImageToCloudinary(
      file.filename,
      file.path,
    );
    await Room.findByIdAndUpdate(result._id, { $push: { images: secure_url } });
  });
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
