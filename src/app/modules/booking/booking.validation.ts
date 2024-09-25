import { z } from 'zod';

const bookingValidationSchema = z.object({
  body: z.object({
    car: z.string(),
    pickUpDate: z.string(),
    dropOffDate: z.string(),
    startTime: z.string(),
    endTime: z.string().optional(),
    additionalFeatures: z.array(z.string()).optional(),
    status: z
      .enum(['pending', 'confirmed', 'canceled', 'completed'])
      .default('pending'),
    paymentStatus: z.enum(['paid', 'unpaid']).default('paid'),
    totalCost: z.number().nonnegative().default(0).optional(),
  }),
});

const returnValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string(),
  }),
});

export const bookingCar = {
  bookingValidationSchema,
  returnValidationSchema,
};
