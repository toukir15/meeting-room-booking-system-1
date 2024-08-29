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
const slot_model_1 = require("../slot/slot.model");
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check room  exist or not
    const isExistRoom = yield room_model_1.Room.findById(payload.room);
    if (!isExistRoom) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Room does not exist');
    }
    // check slot exist or not
    payload.slots.forEach((slot) => __awaiter(void 0, void 0, void 0, function* () {
        const isSlotExist = yield slot_model_1.Slot.findById(slot);
        if (!isSlotExist) {
            throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Room does not exist');
        }
    }));
    const result = yield booking_model_1.Booking.create(payload);
    const id = result._id;
    // make total amount and populate the reference data
    const populatedBooking = yield booking_model_1.Booking.aggregate([
        // Stage 1: Match by _id
        { $match: { _id: id } },
        // Stage 2: Lookup slots collection to populate 'slots' field
        {
            $lookup: {
                from: 'slots',
                localField: 'slots',
                foreignField: '_id',
                as: 'slots',
            },
        },
        // Stage 3: Unwind the 'slots' array to process each slot individually
        { $unwind: '$slots' },
        // // Stage 4: Lookup rooms collection to populate 'room' field
        {
            $lookup: {
                from: 'rooms',
                localField: 'slots.room',
                foreignField: '_id',
                as: 'room',
            },
        },
        // // Stage 5: Unwind the 'room' array to ensure 'room' is a single object
        { $unwind: '$room' },
        // // Stage 6: Lookup users collection to populate 'user' field
        {
            $lookup: {
                from: 'users', // The name of the users collection
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            },
        },
        // // Stage 7: Unwind the 'user' array to ensure 'user' is a single object
        { $unwind: '$user' },
        // Stage 8: Group by _id to restore the structure and accumulate 'slots' array
        {
            $group: {
                _id: '$_id',
                date: { $first: '$date' },
                room: { $first: '$room' },
                user: { $first: '$user' },
                slots: { $push: '$slots' },
                totalAmount: { $sum: '$room.pricePerSlot' },
                isConfirmed: { $first: '$isConfirmed' },
                isDeleted: { $first: '$isDeleted' },
            },
        },
    ]);
    // update total amount
    const totalAmount = populatedBooking[0].totalAmount;
    yield booking_model_1.Booking.findByIdAndUpdate(id, {
        totalAmount,
    }, { new: true, runValidators: true });
    return populatedBooking;
});
const getMyBookingsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ user: id });
    return result;
});
const updateBookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is the bookin exist in the db or not
    const isBookingExist = yield booking_model_1.Booking.findById(id);
    if (!isBookingExist) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Booking is not exist.');
    }
    // update the booking
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
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
};
