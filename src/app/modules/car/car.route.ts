import express from 'express';
import { CarController } from './car.controller';
import carValidation from './car.validation';
import validationRequest from '../../utills/validationRequest';
import { verifyAdmin } from '../../../midlewere/auth';

const router = express.Router();

router.post(
  '/',
  validationRequest(carValidation.carCreateValidationSchema),
  verifyAdmin(),
  CarController.createCar,
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
