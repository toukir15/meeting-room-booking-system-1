/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createSlot = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slotData = req.body;
    const result = await SlotServices.createSlotIntoDB(slotData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Slots created successfully',
      data: result,
    });
  },
);

const getAvailableAllSlot = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req?.query;
    const result = await SlotServices.getAvailableAllSlotFromDB(query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Slots created successfully',
      data: result,
    });
  },
);

export const SlotControllers = {
  createSlot,
  getAvailableAllSlot,
};
