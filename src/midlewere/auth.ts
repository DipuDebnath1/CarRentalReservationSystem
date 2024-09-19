import { NextFunction, Request, Response } from 'express';
import catchAsync from '../app/utills/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../app/ErrorHandler/AppError';
import httpStatus from 'http-status';

export const verifyUser = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'Authorization token missing or incorrect format' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token as string, config.accessToken as string) as JwtPayload;

    if (!decoded) {
      new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized, missing token');
    }
    if (decoded?.data.role === 'user') {
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You have no access to this route',
      });
    }
  });
};

export const verifyAdmin = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'Authorization token missing or incorrect format' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token as string, config.accessToken as string) as JwtPayload;
    if (!decoded) {
      new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized, missing token');
    }
    if (decoded?.data.role === 'admin') {
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You have no access to this route',
      });
    }
  });
};
