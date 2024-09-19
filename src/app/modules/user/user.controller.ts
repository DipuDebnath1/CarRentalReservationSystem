/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import catchAsync from '../../utills/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utills/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import jwt from 'jsonwebtoken';

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    success: true,
    data: result,
  });
});

const getSingleUser: RequestHandler = catchAsync(async (req, res, next) => {
  const data = await UserServices.getSingleUserIntoDB(req.body);
  if (data) {
    const token = jwt.sign({ data }, config.accessToken as string, {
      expiresIn: '1y',
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: data,
      token: token,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found',
      data: [],
    });
  }
});

export const UserController = {
  createStudent,
  getSingleUser,
};
