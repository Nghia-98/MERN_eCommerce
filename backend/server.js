import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// fix statusCode 304 - Not Modify
app.disable('etag');

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running ...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// middleware handler 404 error
app.use(notFound);

// middleware default err handler
app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} ... !!!!`
      .yellow.bold
  )
);
