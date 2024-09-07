"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: { type: String },
    slot: { type: mongoose_1.Schema.ObjectId, ref: 'Slot' },
    room: { type: mongoose_1.Schema.ObjectId, ref: 'Room' },
    user: { type: mongoose_1.Schema.ObjectId, ref: 'User' },
    isConfirmed: {
        type: String,
        enum: ['unconfirmed', 'confirmed'],
        default: 'unconfirmed',
    },
    isDeleted: { type: Boolean, default: false },
});
// create a model for booking
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
