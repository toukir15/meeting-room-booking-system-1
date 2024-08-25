import { z } from 'zod';

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    roomNo: z
      .number({ required_error: 'Room no is required' })
      .int()
      .positive('Room number must be a positive integer'),
    floorNo: z
      .number({ required_error: 'Floor no is required' })
      .int()
      .nonnegative('Floor number must be a non-negative integer'),
    capacity: z
      .number({ required_error: 'Capacity is required' })
      .int()
      .positive('Capacity must be a positive integer'),
    pricePerSlot: z.number({ required_error: 'Price is required' }),
    amenities: z.array(z.string(), {
      required_error: 'Amenities are required',
    }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    roomNo: z
      .number({ required_error: 'Room no is required' })
      .int()
      .positive('Room number must be a positive integer')
      .optional(),
    floorNo: z
      .number({ required_error: 'Floor no is required' })
      .int()
      .nonnegative('Floor number must be a non-negative integer')
      .optional(),
    capacity: z
      .number({ required_error: 'Capacity is required' })
      .int()
      .positive('Capacity must be a positive integer')
      .optional(),
    pricePerSlot: z.number({ required_error: 'Price is required' }).optional(),
    amenities: z
      .array(z.string(), {
        required_error: 'Amenities are required',
      })
      .optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const RoomValidations = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
