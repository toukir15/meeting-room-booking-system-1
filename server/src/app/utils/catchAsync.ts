import { Request, RequestHandler, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
