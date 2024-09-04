import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { RoomRouter } from '../modules/room/room.route';
import { SlotRouter } from '../modules/slot/slot.route';
import {
  BookingRouter,
  MyBookingRouter,
} from '../modules/booking/booking.route';
import { UserRouter } from '../modules/user/user.route';
import { PaymentRouter } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/rooms',
    route: RoomRouter,
  },
  {
    path: '/slots',
    route: SlotRouter,
  },
  {
    path: '/bookings',
    route: BookingRouter,
  },
  {
    path: '/my-bookings',
    route: MyBookingRouter,
  },
  {
    path: '/payments',
    route: PaymentRouter,
  },
];

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
