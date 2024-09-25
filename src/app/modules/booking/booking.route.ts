import express from 'express';
import { BookingController } from './booking.controller';
import { verifyAdmin, verifyUser } from '../../../midlewere/auth';
import validationRequest from '../../utills/validationRequest';
import { bookingCar } from './booking.validation';

const router = express.Router();

// *******admin *******
router.get('/', verifyAdmin(), BookingController.GetAllBookingCar);
router.post(
  '/approve-booking',
  verifyAdmin(),
  BookingController.ApproveCustomerBooking,
);
router.post(
  '/canceled-booking',
  verifyAdmin(),
  BookingController.CancelledBookingIn,
);
router.put(
  '/return',
  validationRequest(bookingCar.returnValidationSchema),
  verifyAdmin(),
  BookingController.ReturnBookingCar,
);
// *******user *******
router.post(
  '/',
  verifyUser(),
  validationRequest(bookingCar.bookingValidationSchema),
  BookingController.BookingACar,
);
router.post(
  '/cancel-my-booking',
  verifyUser(),
  BookingController.UserCancelHisBooking,
);
router.get('/my-bookings', verifyUser(), BookingController.FindUserBookings);
router.get(
  '/my-upcoming-booking',
  verifyUser(),
  BookingController.FindUserUpcomingBooking,
);

export const BookingRoute = router;
