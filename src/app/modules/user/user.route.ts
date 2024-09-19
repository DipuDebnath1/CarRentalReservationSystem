import express from 'express';
import { UserController } from './user.controller';
import validationRequest from '../../utills/validationRequest';
import userValidation from './user.validation';
import { verifyAdmin } from '../../../midlewere/auth';
const router = express.Router();

router.post(
  '/signup',
  validationRequest(userValidation.userValidationSchema),
  UserController.createStudent,
);
router.post('/signin', UserController.getSingleUser);
router.post('/update-role',verifyAdmin(), UserController.ChangeUserRole);
router.post('/unblock',verifyAdmin(), UserController.UnBlockedUser);
router.post('/block',verifyAdmin(), UserController.BlockedUser);

export const UserRoute = router;
