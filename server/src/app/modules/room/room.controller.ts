/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { RoomServices } from './room.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { Express } from 'express';

const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomData = JSON.parse(req?.body?.data);

    // Check if req.files is defined
    const files = req.files;
    let fileArray: Express.Multer.File[] = [];

    // If files are in an object, flatten them into a single array
    if (files && !Array.isArray(files)) {
      fileArray = Object.values(files).flat();
    } else if (Array.isArray(files)) {
      fileArray = files;
    }

    // Pass the files (if any) to the service
    const result = await RoomServices.createRoomIntoDB(roomData, fileArray);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room added successfully',
      data: result,
    });
  },
);

const getAllRooms = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await RoomServices.getAllRoomsFromDB(req?.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rooms retrieved successfully',
      data: result,
    });
  },
);

const getManagementRooms = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await RoomServices.getManagementRoomsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rooms retrieved successfully',
      data: result,
    });
  },
);

const getSingleRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await RoomServices.getSingleRoomFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room retrieved successfully',
      data: result,
    });
  },
);

const updateRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomUpdateData = req.body;
    const { id } = req.params;
    const result = await RoomServices.updateRoomIntoDB(id, roomUpdateData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room updated successfully',
      data: result,
    });
  },
);

const deleteRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await RoomServices.deleteRoomIntoDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room deleted successfully',
      data: result,
    });
  },
);

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
  getManagementRooms,
};
