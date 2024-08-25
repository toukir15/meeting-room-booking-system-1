/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginData = req?.body;
    const result = await AuthServices.loginUser(loginData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      token: result.token,
      data: result.isUserExist,
    });
  },
);

export const AuthControllers = {
  loginUser,
};
