import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/connect';
import authRouter from './routes/authRouter';
import productRouter from './routes/productRouter';
import orderRouter from './routes/orderRouter';
import notFoundMiddleware from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import authenticateUser from './middleware/authenticator';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.static('dist/public'));
app.use(express.json());
app.use(cors());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', authenticateUser, productRouter);
app.use('/api/v1/orders', authenticateUser, orderRouter);
app.use(notFoundMiddleware);
app.use(errorHandler);

const start = async () => {
  try {
    const dbURL = process.env.MONGO_URI;
    if (!dbURL) {
      console.log('No database url present in env file.');
      return;
    }
    await connectDB(dbURL);
    console.log('Database connection successful.');
    app.listen(port, () => console.log(`Server is listening on port 5000...`));
  } catch (error) {
    console.log(error);
  }
};

start();
