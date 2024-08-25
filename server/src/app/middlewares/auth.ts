import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/appError';
import httpStatus from 'http-status';
import { USER_ROLE } from '../modules/user/user.const';

export const auth = (
  role: Partial<(typeof USER_ROLE)[keyof typeof USER_ROLE]>,
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers.authorization?.split(' ')[1] as string;
    if (!jwtToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    const decoded = jwt.verify(jwtToken, config.secret_key as string);
    if ((decoded as JwtPayload).role !== role) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
