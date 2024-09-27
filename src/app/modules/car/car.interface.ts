import { Types } from 'mongoose';

export type TCar = {
  name: string;
  description: string;
  img: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: 'available' | 'unavailable' | 'booked' | 'maintenance';
  type: 'SUV' | 'Sedan' | 'Hybrid';
  isDeleted: boolean;
};

// Extend TCar with the _id field for cases where the car document is retrieved from the database
export type TCarWithId = TCar & { _id: Types.ObjectId };
