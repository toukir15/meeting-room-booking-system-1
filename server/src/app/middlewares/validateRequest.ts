import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (Array.isArray(req.body)) {
        req.body.forEach((data) => {
          schema.parse({ body: data });
        });
      } else {
        schema.parse({ body: req.body });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
