import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
    }),
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email('Invalid email address'),
    password: z.string({
      required_error: 'Password is required!',
    }),
    phone: z.string({
      required_error: 'Phone is required!',
    }),
    address: z.string({
      required_error: 'Role is required!',
    }),
    role: z.enum(['admin', 'user']).default('user'),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
