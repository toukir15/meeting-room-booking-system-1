import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

// Not found route
app.use(notFound);

export default app;
