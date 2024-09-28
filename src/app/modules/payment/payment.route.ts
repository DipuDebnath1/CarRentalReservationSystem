import express from 'express';
import { verifyUser } from '../../../midlewere/auth';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post('/:booking', verifyUser(), paymentController.PaymentTotalPrice);
router.get('/success', paymentController.PaymentSuccess);

export const paymentRouter = router;
