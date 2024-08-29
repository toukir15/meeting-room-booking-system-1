"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomValidations = void 0;
const zod_1 = require("zod");
const createRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        roomNo: zod_1.z
            .number({ required_error: 'Room no is required' })
            .int()
            .positive('Room number must be a positive integer'),
        floorNo: zod_1.z
            .number({ required_error: 'Floor no is required' })
            .int()
            .nonnegative('Floor number must be a non-negative integer'),
        capacity: zod_1.z
            .number({ required_error: 'Capacity is required' })
            .int()
            .positive('Capacity must be a positive integer'),
        pricePerSlot: zod_1.z.number({ required_error: 'Price is required' }),
        amenities: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Amenities are required',
        }),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        roomNo: zod_1.z
            .number({ required_error: 'Room no is required' })
            .int()
            .positive('Room number must be a positive integer')
            .optional(),
        floorNo: zod_1.z
            .number({ required_error: 'Floor no is required' })
            .int()
            .nonnegative('Floor number must be a non-negative integer')
            .optional(),
        capacity: zod_1.z
            .number({ required_error: 'Capacity is required' })
            .int()
            .positive('Capacity must be a positive integer')
            .optional(),
        pricePerSlot: zod_1.z.number({ required_error: 'Price is required' }).optional(),
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
