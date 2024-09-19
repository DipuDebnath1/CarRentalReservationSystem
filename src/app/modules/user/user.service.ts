/* eslint-disable no-console */
import httpStatus from 'http-status';
import AppError from '../../ErrorHandler/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getSingleUserIntoDB = async (payload: Partial<TUser>) => {
  const { password, email } = payload;

  try {
    const data = await User.findOne({ email });

    if (!data) {
      return;
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password as string, data.password);

    if (isMatch) {
      return data;
    } else {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
  } catch (err) {
    console.log('Error comparing passwords:', err);
    throw err; 
  }
};

export const UserServices = {
  createUserIntoDB,
  getSingleUserIntoDB,
};
