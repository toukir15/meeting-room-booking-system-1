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
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = require("../../errors/appError");
const booking_model_1 = require("./booking.model");
const room_model_1 = require("../room/room.model");
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check room  exist or not
    const isExistRoom = yield room_model_1.Room.findById(payload.room);
    if (!isExistRoom) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Room does not exist');
    }
    const result = yield booking_model_1.Booking.create(payload);
    return result;
});
const mongoose_1 = require("mongoose");
const getMyBookingsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.Types.ObjectId(id);
    const result = yield booking_model_1.Booking.aggregate([
        {
            $match: { user: userId }, // Match bookings for the specified user
        },
        {
            $lookup: {
                from: 'rooms',
                localField: 'room',
                foreignField: '_id',
                as: 'room',
            },
        },
        {
            $unwind: '$room',
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $lookup: {
                from: 'slots',
                localField: 'slot',
                foreignField: '_id',
                as: 'slot',
            },
        },
        {
            $unwind: '$slot',
        },
        {
            $project: {
                _id: 1,
                date: 1,
                user: {
                    _id: 1,
                    name: 1,
                },
                room: {
                    _id: 1,
                    roomName: 1,
                    pricePerSlot: 1,
                },
                slot: {
                    _id: 1,
                    date: 1,
                    startTime: 1,
                    endTime: 1,
                },
                isConfirmed: 1,
                isDeleted: 1,
            },
        },
    ]);
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.aggregate([
        {
            $match: {
                isDeleted: { $ne: true },
            },
        },
        {
            $lookup: {
                from: 'rooms',
                localField: 'room',
                foreignField: '_id',
                as: 'room',
            },
        },
        {
            $unwind: '$room',
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $lookup: {
                from: 'slots',
                localField: 'slot',
                foreignField: '_id',
                as: 'slot',
            },
        },
        {
            $unwind: '$slot',
        },
        {
            $project: {
                _id: 1,
                date: 1,
                user: {
                    _id: 1,
                    name: 1,
                },
                room: {
                    _id: 1,
                    roomName: 1,
                    pricePerSlot: 1,
                },
                slot: {
                    _id: 1,
                    date: 1,
                    startTime: 1,
                    endTime: 1,
                },
                isConfirmed: 1,
                isDeleted: 1,
            },
        },
    ]);
    return result;
});
// const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
//   // check is the bookin exist in the db or not
//   const isBookingExist = await Booking.findById(id);
//   if (!isBookingExist) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Booking is not exist.');
//   }
//   // update the booking
//   const result = await Booking.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };
const updateBookingIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isConfirmed: 'confirmed' }, { new: true });
    return result;
});
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check is the bookin exist in the db or not
    const isBookingExist = yield booking_model_1.Booking.findById(id);
    if (!isBookingExist) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Booking is not exist.');
    }
    // update the booking
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getMyBookingsFromDB,
    updateBookingIntoDB,
    deleteBookingFromDB,
    getAllBookingsFromDB,
};
