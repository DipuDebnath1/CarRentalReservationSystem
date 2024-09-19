import { Schema, model } from 'mongoose';
import { TCar } from './car.interface';

const carScheme = new Schema<TCar>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img:{
      type:String,
      required:true,
    },
    color: {
      type: String,
      required: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
    },
    features: {
      type: [String],
    },
    pricePerHour: {
      type: Number,
      required:true
    },
    status: {
      type: String,
      enum: ['available', 'unavailable', "booked", 'maintenance' ],
      default: 'available',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const CarCollection = model<TCar>('car', carScheme);
