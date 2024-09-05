import express from 'express';
import { BookingControllers } from './booking.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
const router = express.Router();

router.post(
  '/',
  // auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', BookingControllers.getAllBookings);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(BookingValidations.updateBookingValidationSchema),
  BookingControllers.updateBooking,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(BookingValidations.updateBookingValidationSchema),
  BookingControllers.deleteBooking,
);

export const BookingRouter = router;
router.get(
  '/',
  //  auth(USER_ROLE.user),
  BookingControllers.getMyBookings,
);
export const MyBookingRouter = router;
