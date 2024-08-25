import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    slots: z.array(z.string()),
    room: z.string(),
    user: z.string(),
    totalAmount: z.number().default(0),
    isConfirmed: z.enum(['confirmed', 'unconfirmed']).default('unconfirmed'),
    isDeleted: z.boolean().default(false),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    slots: z.array(z.string()).optional(),
    room: z.string().optional(),
    user: z.string().optional(),
    totalAmount: z.number().default(0).optional(),
    isConfirmed: z
      .enum(['confirmed', 'unconfirmed'])
      .default('unconfirmed')
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
