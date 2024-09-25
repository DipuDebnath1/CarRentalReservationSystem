/* eslint-disable no-console */
import httpStatus from 'http-status';
import AppError from '../../ErrorHandler/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

// ********user*********
const createUserIntoDB = async (payload: TUser) => {
  try {
    const result = await User.create(payload);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log('Error comparing passwords:', err);
    throw new AppError(
      httpStatus.CONFLICT,
      err.message || 'user account create failed',
    );
  }
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

const updateUserProfileDB = async (userId: string, payload: Partial<TUser>) => {
  try {
    // console.log(userId, payload);
    const result = User.findByIdAndUpdate(userId, payload, { new: true });
    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new AppError(
      httpStatus.CONFLICT,
      err.message || 'user account create failed',
    );
  }
};

// ********admin******

const changeUserRoleDB = async (userId: string, role: string) => {
  try {
    if (role !== 'admin' && role !== 'user') {
      throw new AppError(httpStatus.BAD_REQUEST, 'enter valid user role !');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "user Can't found !");
    }
    if (user.role === role) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `user already have role : ${role}`,
      );
    }

    if (user.role !== role) {
      user.role = role;
      await user.save();
      return user;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AppError(
      httpStatus.CONFLICT,
      error.message || 'user blocked failed',
    );
  }
};

const blockedUserDB = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "user Can't found !");
    }
    if (user.isBlocked) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user already have blocked');
    }
    user.isBlocked = true;
    await user.save();

    return user;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AppError(
      httpStatus.CONFLICT,
      error.message || 'user blocked failed',
    );
  }
};
const unBlockedUserDB = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "user Can't found !");
    }
    if (!user?.isBlocked) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'user already have been Unblocked',
      );
    }
    user.isBlocked = false;
    await user.save();

    return user;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AppError(
      httpStatus.CONFLICT,
      error.message || 'user blocked failed',
    );
  }
};

const findAllUsersFromDB = async () => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    if (!users.length) {
      throw new AppError(httpStatus.NOT_FOUND, 'No users found');
    }

    return users;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'Failed to fetch users',
    );
  }
};

export const UserServices = {
  createUserIntoDB,
  getSingleUserIntoDB,
  updateUserProfileDB,
  changeUserRoleDB,
  blockedUserDB,
  unBlockedUserDB,
  findAllUsersFromDB,
};
