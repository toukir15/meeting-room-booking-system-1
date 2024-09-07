/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { BookingServices } from './booking.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingData = req?.body;
    const result = await BookingServices.createBookingIntoDB(bookingData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking created successfully',
      data: result,
    });
  },
);

const getMyBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id as string;
    const result = await BookingServices.getMyBookingsFromDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User bookings retrieved successfully',
      data: result,
    });
  },
);

const getAllBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingServices.getAllBookingsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All bookings retrieved successfully',
      data: result,
    });
  },
);

// const updateBooking = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const updateData = req.body;
//     const result = await BookingServices.updateBookingIntoDB(id, updateData);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Booking updated successfully',
//       data: result,
//     });
//   },
// );

const updateBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BookingServices.updateBookingIntoDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking updated successfully',
      data: result,
    });
  },
);

const deleteBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BookingServices.deleteBookingFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking deleted successfully',
      data: result,
    });
  },
);

export const BookingControllers = {
  createBooking,
  getMyBookings,
  updateBooking,
  deleteBooking,
  getAllBookings,
};
