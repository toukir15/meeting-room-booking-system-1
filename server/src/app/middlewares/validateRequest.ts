import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let parsedData;

    try {
      if (typeof req.body?.data === 'string') {
        parsedData = JSON.parse(req.body?.data);
      } else {
        parsedData = req.body;
      }
      schema.parse({ body: parsedData });
      next();
    } catch (err) {
      next(err);
    }
  };
};
