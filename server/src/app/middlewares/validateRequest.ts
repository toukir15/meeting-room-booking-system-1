import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let parsedData;

    try {
      // Try parsing req.body.data as JSON if it's a string, otherwise fallback to req.body
      if (typeof req.body?.data === 'string') {
        parsedData = JSON.parse(req.body?.data);
      } else {
        parsedData = req.body;
      }

      // Check if parsedData is an array and validate each item
      if (Array.isArray(parsedData)) {
        parsedData.forEach((data) => {
          schema.parse({ body: data });
        });
      } else {
        schema.parse({ body: parsedData });
      }

      next();
    } catch (err) {
      // Handle validation errors explicitly
      next(err);
    }
  };
};
