import mongoose from 'mongoose';

export type TBookingCar = {
  _id?: string;
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  pickUpDate: string;
  dropOffDate: string;
  startTime: string;
  endTime: string;
  additionalFeatures?: string[];
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  paymentStatus: 'unpaid' | 'paid';
  totalCost: number;
  transactionId: string;
};
