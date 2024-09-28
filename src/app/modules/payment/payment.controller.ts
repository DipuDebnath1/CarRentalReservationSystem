/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import catchAsync from '../../utills/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utills/sendResponse';
import { PaymentService } from './payment.service';
import { success } from './responsePage';

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
      statusCode: httpStatus.OK,
      success: true,
      message: 'pay filed',
      data: result,
    });
  }
});

export const paymentController = {
  PaymentTotalPrice,
  PaymentSuccess,
};
