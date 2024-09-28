import { model, Schema } from 'mongoose';
import { TBookingCar } from './booking.interface';

const bookingSchema = new Schema<TBookingCar>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'car',
      required: true,
    },
    pickUpDate: {
      type: String,
      required: true,
    },
    dropOffDate: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    additionalFeatures: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const BookingModel = model<TBookingCar>('BookingCar', bookingSchema);
