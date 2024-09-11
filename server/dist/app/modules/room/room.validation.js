"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomValidations = void 0;
const zod_1 = require("zod");
const createRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        roomName: zod_1.z.string({ required_error: 'Name is required' }),
        roomNo: zod_1.z.string({ required_error: 'Room no is required' }),
        floorNo: zod_1.z.string({ required_error: 'Floor no is required' }),
        capacity: zod_1.z.string({ required_error: 'Capacity is required' }),
        pricePerSlot: zod_1.z.string({ required_error: 'Price is required' }),
        amenities: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Amenities are required',
        }),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        roomName: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        roomNo: zod_1.z.string({ required_error: 'Room no is required' }).optional(),
        floorNo: zod_1.z.string({ required_error: 'Floor no is required' }).optional(),
        capacity: zod_1.z.string({ required_error: 'Capacity is required' }).optional(),
        pricePerSlot: zod_1.z.string({ required_error: 'Price is required' }).optional(),
        amenities: zod_1.z
            .array(zod_1.z.string(), {
            required_error: 'Amenities are required',
        })
            .optional(),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
exports.RoomValidations = {
    createRoomValidationSchema,
    updateRoomValidationSchema,
};
