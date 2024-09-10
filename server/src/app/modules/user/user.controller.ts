/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req?.body;
    const result = await UserServices.createUserIntoDB(userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create user successfully',
      data: result,
    });
  },
);
const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getUserFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrive successfully',
      data: result,
    });
  },
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await UserServices.updateUserIntoDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User update successfully',
      data: result,
    });
  },
);

export const UserControllers = {
  createUser,
  getUsers,
  updateUser,
};
