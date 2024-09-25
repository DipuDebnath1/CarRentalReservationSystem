import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
// import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'booking',
      },
    ],
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const saltRounds = 10;

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const userData = this;
  userData.password = await bcrypt.hash(userData.password, Number(saltRounds));
  next();
});

userSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform: function (doc, ret, options) {
    ret.password = undefined; // or delete ret.password;
    return ret;
  },
});

export const User = model<TUser>('user', userSchema);
