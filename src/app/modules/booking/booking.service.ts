/* eslint-disable no-console */
import { CarCollection } from '../car/car.model';
import { BookingModel } from './booking.model';
import AppError from '../../ErrorHandler/AppError';
import httpStatus from 'http-status';
import { startSession, Types } from 'mongoose';
import { TCarWithId } from '../car/car.interface';
import { calculateTotalPrice } from '../../utills/canculatePrice';

type TCarOrder = {
  car: string;
  pickUpDate: string;
  dropOffDate: string;
  startTime: string;
};
type TCarReturn = {
  bookingId: string;
  endTime: string;
};

// *********start admin route********

// ****get All Booking Car FromDB *****
const getAllBookingCarFromDB = async (
  carId: string,
  date: string,
  status: string,
) => {
  const query: { car?: Types.ObjectId; date?: string; status?: string } = {};

  if (carId) query.car = new Types.ObjectId(carId); // Convert carId to ObjectId
  if (date) query.date = date;
  if (status) query.status = status;

  try {
    const allBooking = await BookingModel.find(query)
      .populate('car')
      .populate('user')
      .exec();

    return allBooking;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// return booking
const returnBookingCarFromDB = async (payload: TCarReturn) => {
  const session = await BookingModel.startSession();

  try {
    session.startTransaction();

    const findBooking = await BookingModel.findById(payload.bookingId)
      .populate<{ car: TCarWithId }>('car')
      .populate('user')
      .session(session);

    if (!findBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, ' Booking Car not found');
    }
    // car status update
    await CarCollection.findByIdAndUpdate(
      findBooking.car._id,
      { status: 'available' },
      { new: true },
    ).session(session);

    const totalCost = calculateTotalPrice(
      findBooking.pickUpDate,
      findBooking.dropOffDate,
      findBooking.startTime,
      payload.endTime,
      findBooking.car.pricePerHour,
    );
    console.log(totalCost);
    // console.log({ totalCost: totalCost, info: totalCost });
    const result = await BookingModel.findByIdAndUpdate(
      payload.bookingId,
      { endTime: payload.endTime, totalCost: totalCost, status: 'completed' },
      { new: true },
    )
      .populate('car')
      .populate('user')
      .session(session);
    await session.commitTransaction();

    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// // approve customer booking
const approveCustomerBookingDB = async (bookingId: string) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const bookingItem = await BookingModel.findById(bookingId).session(session);

    if (!bookingItem) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    if (bookingItem.status !== 'pending') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Sorry, your booking is already ${bookingItem.status}`,
      );
    }

    bookingItem.status = 'confirmed';
    await bookingItem.save({ session });

    await CarCollection.findByIdAndUpdate(
      bookingItem?.car._id,
      { status: 'booked' },
      { session },
    );

    // Commit the transaction
    await session.commitTransaction();
    return bookingItem;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      err.message || 'An error occurred while approving the booking',
    );
  } finally {
    session.endSession();
  }
};

// cancelled booking

const cancelledBookingInDB = async (bookingId: string) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const bookingItem = await BookingModel.findById(bookingId).session(session);

    if (!bookingItem) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    // check booking status
    if (bookingItem.status == 'completed' || bookingItem.status == 'canceled') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Sorry, your booking is already ${bookingItem.status}`,
      );
    }

    bookingItem.status = 'canceled';
    await bookingItem.save({ session });

    await CarCollection.findByIdAndUpdate(
      bookingItem?.car._id,
      { status: 'available' },
      { session },
    );

    // Commit the transaction
    await session.commitTransaction();
    return bookingItem;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      err.message || 'An error occurred while canceled the booking',
    );
  } finally {
    session.endSession();
  }
};

// ********end admin route*******

// ********start user route*********
const bookingACarIntoDB = async (
  userId: string,
  payload: Partial<TCarOrder>,
) => {
  const session = await BookingModel.startSession();

  try {
    session.startTransaction();

    const car = await CarCollection.findById(payload.car).session(session);
    if (!car) {
      throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
    }

    if (car.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Car already deleted');
    }

    if (car.status === 'unavailable') {
      throw new AppError(httpStatus.CONFLICT, 'Car is unavailable');
    }

    // Create booking
    const bookingInfo = {
      car: payload.car,
      pickUpDate: payload.pickUpDate,
      dropOffDate: payload.dropOffDate,
      startTime: payload.startTime,
      user: userId,
    };
    const bookingResult = await BookingModel.create([bookingInfo], { session });

    // Populate the car and user information in the booking result
    const populatedBooking = await BookingModel.findById(bookingResult[0]._id)
      .populate('user')
      .populate('car')
      .session(session);

    await session.commitTransaction();
    return populatedBooking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
// find User Bookings Car FromDB
const findUserBookingsCarFromDB = async (userId: string, status: string) => {
  const query: { user?: Types.ObjectId; status?: string } = {};
  if (userId) query.user = new Types.ObjectId(userId);
  if (status) query.status = status;
  try {
    const allBooking = await BookingModel.find(query)
      .populate('car')
      .populate('user')
      .exec();

    if (!allBooking) return;

    return allBooking;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// User Upcoming Booking
const findUserUpcomingBooking = async (userId: string) => {
  const query = {
    user: new Object(userId),
    // set search Param
    status: { $in: ['pending', 'confirmed'] },
  };

  try {
    const bookings = await BookingModel.find(query).populate('car');

    return bookings;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new AppError(httpStatus.CONFLICT, 'Car not found unavailable');
  }
};

// if user status pending user canceled booking
const userCancelHisBookingDB = async (userId: string, bookingId: string) => {
  try {
    const query = {
      user: new Types.ObjectId(userId),
      _id: new Types.ObjectId(bookingId),
      status: 'pending',
    };

    const booking = await BookingModel.findOne(query);

    if (!booking) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Booking not found or not in pending status',
      );
    }

    // update booking
    booking.status = 'canceled';
    // await booking.save()
    const result = await booking.save();

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new AppError(
      httpStatus.CONFLICT,
      err.message || 'Error canceling the booking',
    );
  }
};

// **************end user route***********

export const booking = {
  bookingACarIntoDB,
  getAllBookingCarFromDB,
  findUserBookingsCarFromDB,
  returnBookingCarFromDB,
  findUserUpcomingBooking,
  userCancelHisBookingDB,
  approveCustomerBookingDB,
  cancelledBookingInDB,
};
