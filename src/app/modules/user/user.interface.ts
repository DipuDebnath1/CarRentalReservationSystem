import mongoose from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  isBlocked: boolean,
  bookings: mongoose.Types.ObjectId,
  address: string;
};
