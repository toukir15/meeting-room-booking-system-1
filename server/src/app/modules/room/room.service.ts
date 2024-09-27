import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TMulterFile, TQuery, TRoom } from './room.interface';
import { Room } from './room.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { addDocumentToIndex, meiliClient } from '../../utils/meiliSearch';
import { buildFilter } from './room.utils';

const index = meiliClient.index('rooms');

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

  const findRoom = await Room.findOne({
    roomName: roomData.roomName,
    isDeleted: { $ne: true },
  });

  if (findRoom) {
    throw new AppError(httpStatus.CONFLICT, 'This room already exists');
  }

  // Create the room first
  const createRoomResult = await Room.create(data);

  // Collect all image URLs
  const imageUploadPromises = files.map(async (file) => {
    const { secure_url } = await sendImageToCloudinary(
      file.filename,
      file.path,
    );
    return secure_url;
  });

  const imageUrls = await Promise.all(imageUploadPromises);

  // Update the room with all image URLs in one go
  const finalUpdateResult = await Room.findByIdAndUpdate(
    createRoomResult._id,
    {
      $set: { images: imageUrls },
    },
    { new: true },
  );

  const meiliData = {
    _id: finalUpdateResult?._id,
    roomName: finalUpdateResult?.roomName,
    capacity: Number(finalUpdateResult?.capacity),
    roomNo: Number(finalUpdateResult?.roomNo),
    floorNo: Number(finalUpdateResult?.floorNo),
    pricePerSlot: Number(finalUpdateResult?.pricePerSlot),
    images: finalUpdateResult?.images,
    amenities: finalUpdateResult?.amenities,
    isDeleted: finalUpdateResult?.isDeleted,
  };

  addDocumentToIndex(meiliData, 'rooms');
  return finalUpdateResult;
};

const getAllRoomsFromDB = async (query: TQuery) => {
  const index = meiliClient.index('rooms');
  await index.updateFilterableAttributes(['capacity', 'pricePerSlot']);
  await index.updateSortableAttributes(['pricePerSlot']);

  // Call the utility function to build the filter
  const filterBuilder = buildFilter(query);

  // Perform the search with the constructed filter
  const result = await index.search(query.search || '', {
    filter: filterBuilder,
    sort: [
      query?.sort === 'price-asc' ? 'pricePerSlot:asc' : 'pricePerSlot:desc',
    ],
  });
  return result.hits;
};

const getManagementRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
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

  // update meilisearch data
  if (result) {
    await index.updateDocuments([{ _id: id, ...payload }]);
  }

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

  // delete in meilisearch data
  if (result) {
    await index.deleteDocument(id);
  }

  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomIntoDB,
  getManagementRoomsFromDB,
};
