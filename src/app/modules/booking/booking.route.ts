import express from 'express';
import { BookingController } from './booking.controller';
import { verifyAdmin, verifyUser } from '../../../midlewere/auth';
import validationRequest from '../../utills/validationRequest';
import { bookingCar } from './booking.validation';

const router = express.Router();

// *******admin *******
router.get('/', verifyAdmin(), BookingController.GetAllBookingCar);
router.post('/approve-booking',verifyAdmin(), BookingController.ApproveCustomerBooking);
router.post('/canceled-booking',verifyAdmin(), BookingController.CancelledBookingIn);
// *******user *******
router.post('/', verifyUser(),validationRequest(bookingCar.bookingValidationSchema),BookingController.BookingACar);
router.get('/my-bookings', verifyUser(), BookingController.FindUserBookings);
router.get('/my-upcoming-booking',verifyUser(), BookingController.FindUserUpcomingBooking);
router.put('/cancel-my-order',verifyUser(), BookingController.UserCancelHisBooking);

export const BookingRoute = router;
