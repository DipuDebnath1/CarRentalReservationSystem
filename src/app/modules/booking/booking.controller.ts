/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import catchAsync from '../../utills/catchAsync';
import { booking } from './booking.service';
import sendResponse from '../../utills/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../ErrorHandler/AppError';

//******admin**** */

// Get All Booking Car
const GetAllBookingCar: RequestHandler = catchAsync(async (req, res, next) => {
  const { carId, date, status } = req.query;
  const result = await booking.getAllBookingCarFromDB(
    carId as string,
    date as string,
    status as string,
  );
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'find all booking Cars not found',
      data: [],
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

//Return Booking Car
const ReturnBookingCar: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await booking.returnBookingCarFromDB(req.body);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'your booking Cars not found',
      data: [],
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car returned successfully',
    data: result,
  });
});

//Approve Customer Booking DB
const ApproveCustomerBooking: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { bookingId } = req.body;
    const result = await booking.approveCustomerBookingDB(bookingId);

    if (!result) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'your booking Cars not found',
        data: [],
      });
      return;
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your Order Confirmed successfully',
      success: true,
      data: result,
    });
  },
);

//Cancelled Customer Booking DB
const CancelledBookingIn: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { bookingId } = req.body;

    const result = await booking.cancelledBookingInDB(bookingId);

    if (!result) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'your booking Cars not found',
        data: [],
      });
      return;
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your Order Canceled successfully',
      success: true,
      data: result,
    });
  },
);

//********user ********

//Booking ACar
const BookingACar: RequestHandler = catchAsync(async (req, res, next) => {
  // const  decoded = jwt.verify(req?.headers?.authorization?.split(' ')[1] as string, config.accessToken as string);
  const token = req?.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError(httpStatus.UNAUTHORIZED, 'No token provided'));
  }

  const decoded = jwt.verify(
    token,
    config.accessToken as string,
  ) as JwtPayload & { data: { _id: string } };

  const result = await booking.bookingACarIntoDB(decoded.data._id, req.body);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Cars booking false',
      data: [],
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings booked successfully',
    data: result,
  });
});

//Find User Bookings
const FindUserBookings: RequestHandler = catchAsync(async (req, res, next) => {
  const { status } = req.query;
  // const decoded = jwt.verify(req?.headers.authorization?.split(' ')[1] as string, config.accessToken as string)
  const token = req?.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError(httpStatus.UNAUTHORIZED, 'No token provided'));
  }

  const decoded = jwt.verify(
    token,
    config.accessToken as string,
  ) as JwtPayload & { data: { _id: string } };

  const result = await booking.findUserBookingsCarFromDB(
    decoded.data._id,
    status as string,
  );

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'your booking Cars not found',
      data: [],
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    success: true,
    data: result,
  });
});

// find User Upcoming Booking
const FindUserUpcomingBooking: RequestHandler = catchAsync(
  async (req, res, next) => {
    const token = req?.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'No token provided'));
    }

    const decoded = jwt.verify(
      token,
      config.accessToken as string,
    ) as JwtPayload & { data: { _id: string } };

    const result = await booking.findUserUpcomingBooking(decoded.data._id);

    if (!result) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'your booking Cars not found',
        data: [],
      });
      return;
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'My Bookings retrieved successfully',
      success: true,
      data: result,
    });
  },
);

// cancel User BookingInDB
const UserCancelHisBooking: RequestHandler = catchAsync(
  async (req, res, next) => {
    const token = req?.headers.authorization?.split(' ')[1];
    const { carId, bookingId } = req.body;
    if (!token) {
      return next(new AppError(httpStatus.UNAUTHORIZED, 'No token provided'));
    }

    const decoded = jwt.verify(
      token,
      config.accessToken as string,
    ) as JwtPayload & { data: { _id: string } };

    const result = await booking.userCancelHisBookingDB(
      decoded.data._id,
      bookingId,
    );

    if (!result) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'your booking Cars not found',
        data: [],
      });
      return;
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your Order Canceled successfully',
      success: true,
      data: result,
    });
  },
);

export const BookingController = {
  ApproveCustomerBooking,
  GetAllBookingCar,
  ReturnBookingCar,
  BookingACar,
  FindUserBookings,
  FindUserUpcomingBooking,
  UserCancelHisBooking,
  CancelledBookingIn,
};
