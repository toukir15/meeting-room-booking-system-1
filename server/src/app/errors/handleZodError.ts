import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message: 'Zod validation error.',
    errorSource,
  };
};
