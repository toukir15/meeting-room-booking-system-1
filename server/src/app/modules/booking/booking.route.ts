import express from 'express';
import { BookingControllers } from './booking.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
const router = express.Router();

router.post(
  '/',
  auth([USER_ROLE.user, USER_ROLE.admin]),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/get-bookings', BookingControllers.getAllBookings);

router.delete(
  '/:id',
  auth([USER_ROLE.admin]),
  validateRequest(BookingValidations.updateBookingValidationSchema),
  BookingControllers.deleteBooking,
);

router.patch('/:id', BookingControllers.updateBooking);

export const BookingRouter = router;
router.get(
  '/',
  auth([USER_ROLE.user, USER_ROLE.admin]),
  BookingControllers.getMyBookings,
);
export const MyBookingRouter = router;
