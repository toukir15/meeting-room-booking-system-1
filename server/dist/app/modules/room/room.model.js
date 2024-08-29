"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    roomNo: { type: Number, required: true },
    floorNo: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    images: { type: [String] },
    isDeleted: { type: Boolean, default: false },
});
// 3. Create a Model.
exports.Room = (0, mongoose_1.model)('Room', roomSchema);
