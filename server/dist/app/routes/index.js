"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const room_route_1 = require("../modules/room/room.route");
const slot_route_1 = require("../modules/slot/slot.route");
const booking_route_1 = require("../modules/booking/booking.route");
const user_route_1 = require("../modules/user/user.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRouter,
    },
    {
        path: '/users',
        route: user_route_1.UserRouter,
    },
    {
        path: '/rooms',
        route: room_route_1.RoomRouter,
    },
    {
        path: '/slots',
        route: slot_route_1.SlotRouter,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRouter,
    },
    {
        path: '/my-bookings',
        route: booking_route_1.MyBookingRouter,
    },
    {
        path: '/payments',
        route: payment_route_1.PaymentRouter,
    },
];
moduleRoutes.forEach((moduleRoute) => {
    router.use(moduleRoute.path, moduleRoute.route);
});
exports.default = router;
