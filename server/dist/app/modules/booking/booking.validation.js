"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string(),
        slots: zod_1.z.array(zod_1.z.string()),
        room: zod_1.z.string(),
        user: zod_1.z.string(),
        totalAmount: zod_1.z.number().default(0),
        isConfirmed: zod_1.z.enum(['confirmed', 'unconfirmed']).default('unconfirmed'),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().optional(),
        slots: zod_1.z.array(zod_1.z.string()).optional(),
        room: zod_1.z.string().optional(),
        user: zod_1.z.string().optional(),
        totalAmount: zod_1.z.number().default(0).optional(),
        isConfirmed: zod_1.z
            .enum(['confirmed', 'unconfirmed'])
            .default('unconfirmed')
            .optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.BookingValidations = {
    createBookingValidationSchema,
    updateBookingValidationSchema,
};
