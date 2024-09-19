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

const changeUserRoleDB = async(userId:string, role:string) =>{
  try{
    if (role !=="admin" && role !=="user" ) {
      throw new AppError(httpStatus.BAD_REQUEST, "enter valid user role !")
    } 

    const user = await User.findById(userId)

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "user Can't found !")
    }
    if (user.role === role) {
      throw new AppError(httpStatus.BAD_REQUEST, `user already have role : ${role}`)
    }
      // eslint-disable-next-line no-constant-condition, no-cond-assign
      if (user.role = "admin") user.role = "user"
      // eslint-disable-next-line no-constant-condition, no-cond-assign
      if (user.role = "user") user.role = "admin"
      await user.save()

      return user

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(error:any){
    throw new AppError(httpStatus.CONFLICT, error.message || "user blocked failed")
  }
}

const blockedUserDB = async(userId:string) =>{
  try{
    const user = await User.findById(userId)
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "user Can't found !")
    }
    if (user.isBlocked) {
      throw new AppError(httpStatus.BAD_REQUEST, "user already have blocked")
    }
      user.isBlocked = true
      await user.save()

      return user

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(error:any){
    throw new AppError(httpStatus.CONFLICT, error.message || "user blocked failed")
  }
}
const unBlockedUserDB = async(userId:string) =>{
  try{
    const user = await User.findById(userId)
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "user Can't found !")
    }
    if (!user?.isBlocked) {
      throw new AppError(httpStatus.BAD_REQUEST, "user already have been Unblocked")
    }
      user.isBlocked = false
      await user.save()

      return user

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(error:any){
    throw new AppError(httpStatus.CONFLICT, error.message || "user blocked failed")
  }
}

export const UserServices = {
  createUserIntoDB,
  getSingleUserIntoDB,
  changeUserRoleDB,
  blockedUserDB,
  unBlockedUserDB
};
