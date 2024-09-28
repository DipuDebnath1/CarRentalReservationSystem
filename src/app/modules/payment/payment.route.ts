import express from 'express';
import { verifyUser } from '../../../midlewere/auth';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post('/:booking', verifyUser(), paymentController.PaymentTotalPrice);
router.get('/success', paymentController.PaymentSuccess);
router.get('/failed', paymentController.paymentFailed);
router.get('/cancelled', paymentController.paymentCancelled);

export const paymentRouter = router;
