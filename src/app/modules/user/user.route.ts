import express from 'express';
import { UserController } from './user.controller';
import validationRequest from '../../utills/validationRequest';
import userValidation from './user.validation';
const router = express.Router();

router.post(
  '/signup',
  validationRequest(userValidation.userValidationSchema),
  UserController.createStudent,
);
router.post('/signin', UserController.getSingleUser);

export const UserRoute = router;
