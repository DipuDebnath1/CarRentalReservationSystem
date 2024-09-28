/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import catchAsync from '../../utills/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utills/sendResponse';
import { PaymentService } from './payment.service';
import { cancelledPayment, failedPayment, success } from './responsePage';

const PaymentTotalPrice: RequestHandler = catchAsync(async (req, res, next) => {
  const { booking } = req.params;
  const result = await PaymentService.paymentBookingPrice(booking);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'booking collection not found',
      data: [],
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'pay requested receive success',
    data: result,
  });
});

// get success Url
const PaymentSuccess: RequestHandler = catchAsync(async (req, res, next) => {
  const { txnId } = req.query;

  const result = await PaymentService.paymentSuccess(txnId as string);
  if (result) {
    res.send(success(result));
  } else {
    sendResponse(res, {
      statusCode: httpStatus.FAILED_DEPENDENCY,
      success: false,
      message: 'pay filed',
      data: result,
    });
  }
});

// get paymentFailedUrl
const paymentFailed: RequestHandler = catchAsync(async (req, res, next) => {
  res.send(failedPayment());
});
// get payment cancelled
const paymentCancelled: RequestHandler = catchAsync(async (req, res, next) => {
  res.send(cancelledPayment());
});

export const paymentController = {
  PaymentTotalPrice,
  paymentCancelled,
  paymentFailed,
  PaymentSuccess,
};
