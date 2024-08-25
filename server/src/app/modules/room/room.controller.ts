/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { RoomServices } from './room.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const createRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const roomData = req?.body;
    const result = await RoomServices.createRoomIntoDB(roomData);
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
    const result = await RoomServices.getAllRoomsFromDB();
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
};
