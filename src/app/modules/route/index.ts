import { BookingRoute } from '../booking/booking.route';
import { CarRoute } from '../car/car.route';
import { UserRoute } from '../user/user.route';
import express from 'express';

const router = express.Router();
const moduleRoute = [
  {
    path: '/auth',
    route: UserRoute,
  },
  {
    path: '/cars',
    route: CarRoute,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
];

moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
