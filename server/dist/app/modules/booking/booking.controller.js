"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const booking_service_1 = require("./booking.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createBooking = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req === null || req === void 0 ? void 0 : req.body;
    const result = yield booking_service_1.BookingServices.createBookingIntoDB(bookingData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
}));
const getMyBookings = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const result = yield booking_service_1.BookingServices.getMyBookingsFromDB(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User bookings retrieved successfully',
        data: result,
    });
}));
const updateBooking = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const result = yield booking_service_1.BookingServices.updateBookingIntoDB(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking updated successfully',
        data: result,
    });
}));
const deleteBooking = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingServices.deleteBookingFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking deleted successfully',
        data: result,
    });
}));
exports.BookingControllers = {
    createBooking,
    getMyBookings,
    updateBooking,
    deleteBooking,
};
