import { z } from 'zod';

const createRoomValidationSchema = z.object({
  body: z.object({
    roomName: z.string({ required_error: 'Name is required' }),
    roomNo: z.string({ required_error: 'Room no is required' }),
    floorNo: z.string({ required_error: 'Floor no is required' }),
    capacity: z.string({ required_error: 'Capacity is required' }),
    pricePerSlot: z.string({ required_error: 'Price is required' }),
    amenities: z.array(z.string(), {
      required_error: 'Amenities are required',
    }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    roomName: z.string({ required_error: 'Name is required' }).optional(),
    roomNo: z.string({ required_error: 'Room no is required' }).optional(),
    floorNo: z.string({ required_error: 'Floor no is required' }).optional(),
    capacity: z.string({ required_error: 'Capacity is required' }).optional(),
    pricePerSlot: z.string({ required_error: 'Price is required' }).optional(),
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
