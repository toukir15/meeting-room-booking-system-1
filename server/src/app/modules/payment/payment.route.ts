import express from 'express';
import { PaymentController } from './payment.controller';
const router = express.Router();

router.post('/create-payment', PaymentController.createPaymentSession);

export const PaymentRouter = router;
