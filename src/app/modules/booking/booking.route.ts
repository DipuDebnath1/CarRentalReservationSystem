import express from 'express';
import { BookingController } from './booking.controller';
import { verifyAdmin, verifyUser } from '../../../midlewere/auth';
import validationRequest from '../../utills/validationRequest';
import { bookingCar } from './booking.validation';

const router = express.Router();

router.get('/', verifyAdmin(), BookingController.GetAllBookingCar);
router.post(
  '/',
  verifyUser(),
  validationRequest(bookingCar.bookingValidationSchema),
  BookingController.BookingACar,
);
router.get('/my-bookings', verifyUser(), BookingController.FindUserBookings);
router.get('/my-upcoming-booking',verifyUser(), BookingController.FindUserUpcomingBooking);

export const BookingRoute = router;
