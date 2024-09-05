import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import { Slot } from './app/modules/slot/slot.model';
import { AppError } from './app/errors/appError';
import httpStatus from 'http-status';
import { Booking } from './app/modules/booking/booking.model';
const app: Application = express();

// parser
// app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api', express.json(), router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Stripe webhook route: parse the body as raw buffer
const stripe = new Stripe(
  'sk_test_51NrBpjKfBQVbvexEZDxgs6htLSnLhY2gNUMeW5K7U9Af9twEy3PVfOWFCJ5vk3JfMj6Xi5GofPVoqZbPfXVEP2fN00OwF2s04k',
);
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        'whsec_2305593bfaeeb4dc5073fe220e8c92b9702b55bc9a5b527d0ed2715ab8c3f7b5',
      );
    } catch (err) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Webhook Error');
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const bookingData = JSON.parse(session.metadata!.bookingData);
      const slotId = session.metadata!.slotId;

      try {
        // update slot status
        await Slot.findByIdAndUpdate(
          slotId,
          {
            isBooked: true,
          },
          { new: true },
        );

        // create booking
        if (bookingData) {
          await Booking.create(bookingData);
        }
      } catch (err) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Failed to find slot for booking ID ${slotId}:`,
        );
      }
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  },
);

app.use(globalErrorHandler);

// Not found route
app.use(notFound);

export default app;
