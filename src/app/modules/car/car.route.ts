import express from 'express';
import { CarController } from './car.controller';
import carValidation from './car.validation';
import validationRequest from '../../utills/validationRequest';
import { verifyAdmin } from '../../../midlewere/auth';
import { BookingController } from '../booking/booking.controller';
import { bookingCar } from '../booking/booking.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(carValidation.carCreateValidationSchema),
  verifyAdmin(),
  CarController.createCar,
);
router.put(
  '/return',
  validationRequest(bookingCar.returnValidationSchema),
  verifyAdmin(),
  BookingController.ReturnBookingCar,
);
router.get('/', CarController.getAllCar);
router.get('/:id', CarController.getSingleCar);
router.put(
  '/:id',
  verifyAdmin(),
  validationRequest(carValidation.carUpdateValidationSchema),
  CarController.updateSingleCar,
);
router.delete('/:id', verifyAdmin(), CarController.deleteSingleCar);

export const CarRoute = router;
