/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../ErrorHandler/AppError';
import { BookingModel } from '../booking/booking.model';
import { initialPayment, verifyPayment } from './Payment.utills';
import { TCar } from '../car/car.interface';
import { TUser } from '../user/user.interface';

// paymentBookingPrice
const paymentBookingPrice = async (id: string) => {
  const session = await BookingModel.startSession();
  try {
    session.startTransaction();
    const bookingData = await BookingModel.findById(id)
      .populate<{ car: TCar }>('car')
      .populate<{ user: TUser }>('user')
      .session(session);

    if (!bookingData) {
      throw new AppError(httpStatus.NOT_FOUND, 'booking Not found!!');
    }
    if (bookingData.paymentStatus === 'paid') {
      throw new AppError(httpStatus.BAD_REQUEST, 'Money already Paid!!');
    }

    const transactionId = `TXN-${Date.now()}`;

    bookingData.transactionId = transactionId;

    bookingData.save({ session });

    const paymentData = {
      transactionId,
      totalPrice: bookingData.totalCost,
      customerName: bookingData.user.name,
      customerEmail: bookingData.user.email,
      customerPhone: bookingData.user.phone,
      customerAddress: bookingData.user.address,
      paymentSuccessUrl: `http://localhost:5000/api/payment/success?${transactionId}`,
      paymentFailedUrl: 'https://i.ibb.co.com/Fxhc7m7/download.jpg',
      paymentCancelledUrl: 'https://i.ibb.co.com/5xJkQXw/download.png',
    };
    // payment
    const paymentSession = await initialPayment(paymentData);
    // eslint-disable-next-line no-console
    console.log(paymentSession);
    await session.commitTransaction();

    return paymentSession;
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.NOT_FOUND, err.message);
  } finally {
    session.endSession();
  }
};

//payment success
const paymentSuccess = async (txnId: string) => {
  try {
    const verifyPay = await verifyPayment(txnId);

    if (verifyPay.pay_status === 'Successful') {
      await BookingModel.findOneAndUpdate(
        { transactionId: txnId },
        { paymentStatus: 'paid' },
        { new: true },
      );
      return verifyPay;
    } else {
      return false;
    }
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err.message);
  }
};
export const PaymentService = {
  paymentBookingPrice,
  paymentSuccess,
};
