/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import catchAsync from '../../utills/catchAsync';
import { carService } from './car.service';
import sendResponse from '../../utills/sendResponse';
import httpStatus from 'http-status';

const createCar: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await carService.createCarIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Car created successfully',
    success: true,
    data: result,
  });
});

const getAllCar: RequestHandler = catchAsync(async (req, res, next) => {
  const { status } = req.query;

  const result = await carService.getAllCarIntoDB(status);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Cars retrieved false',
      data: [],
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});

const GetAllCarWithSearchCriteriaInto: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await carService.getAllCarWithSearchCriteriaIntoDB(
      req.query,
    );

    if (!result) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Cars retrieved false',
        data: [],
      });
      return;
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  },
);

const getSingleCar: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await carService.getSingleCarIntoDB(id);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Cars retrieved false',
      data: [],
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Cars retrieved successfully',
    data: result,
  });
});

const updateSingleCar: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await carService.updateSingleCarIntoDB(id, req.body);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Cars retrieved false',
      data: [],
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteSingleCar: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await carService.deleteACar(id);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Cars retrieved false',
      data: [],
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  });
});

export const CarController = {
  createCar,
  getAllCar,
  GetAllCarWithSearchCriteriaInto,
  getSingleCar,
  updateSingleCar,
  deleteSingleCar,
};
