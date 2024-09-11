"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    roomName: { type: String, required: true },
    capacity: { type: String, required: true },
    roomNo: { type: String, required: true },
    floorNo: { type: String, required: true },
    pricePerSlot: { type: String, required: true },
    availableQuantity: { type: String, required: true },
    images: { type: [String] },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
});
// 3. Create a Model.
exports.Room = (0, mongoose_1.model)('Room', roomSchema);
