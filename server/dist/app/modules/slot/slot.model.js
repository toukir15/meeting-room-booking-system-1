"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
// create a schema for slot
const slotSchema = new mongoose_1.Schema({
    room: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room' },
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    isBooked: { type: Boolean },
});
// Create a Model for slot.
exports.Slot = (0, mongoose_1.model)('Slot', slotSchema);
