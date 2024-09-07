import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import config from '../config';
import { AppError } from '../errors/appError';
import httpStatus from 'http-status';
import { USER_ROLE } from '../modules/user/user.const';

// Update the role parameter to accept an array of roles
export const auth = (
  roles: Partial<(typeof USER_ROLE)[keyof typeof USER_ROLE]>[],
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers.authorization?.split(' ')[1] as string;
    if (!jwtToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // Verify the JWT token
    const decoded = jwt.verify(
      jwtToken,
      config.secret_key as string,
    ) as JwtPayload;

    // Check if the user's role is in the allowed roles
    if (!roles.includes(decoded.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Attach the decoded user to the request object
    req.user = decoded;
    next();
  });
};
