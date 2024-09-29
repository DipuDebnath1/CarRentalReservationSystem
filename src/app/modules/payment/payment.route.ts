import express from 'express';
import { verifyUser } from '../../../midlewere/auth';
import { paymentController } from './payment.controller';

const router = express.Router();

router.get('/success', paymentController.PaymentSuccess);
router.get('/failed', paymentController.paymentFailed);
router.get('/cancelled', paymentController.paymentCancelled);
router.post('/:booking', verifyUser(), paymentController.PaymentTotalPrice);

export const paymentRouter = router;
