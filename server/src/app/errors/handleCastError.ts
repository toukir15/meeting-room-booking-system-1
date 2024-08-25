import { TErrorSource, TGenericErrorResponse } from '../interface/error';
import mongoose from 'mongoose';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: 'Invalid ID.',
    errorSource,
  };
};
