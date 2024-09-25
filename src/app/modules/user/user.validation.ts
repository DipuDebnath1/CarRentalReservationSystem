import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().max(20),
    phone: z.string(),
    role: z.enum(['user', 'admin']).default('user').optional(),
    isBlocked: z.boolean().default(false).optional(),
    bookings: z.array(z.string()).optional(),
    address: z.string().optional(),
  }),
});

export default {
  userValidationSchema,
};
