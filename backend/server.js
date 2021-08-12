import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const __dirname = path.resolve();
dotenv.config({ path: __dirname + '/.env' });

connectDB();

const app = express();

app.use(cors());

// fix statusCode 304 - Not Modify
app.disable('etag');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>(API Proshop) - NodeJS server is running ...<h1>');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// client fetch paypal_client_id from this route
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//#region
/*

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running ...');
  });
}

*/
//#endregion

// middleware handler 404 error
app.use(notFound);

// middleware default err handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} ... !!!!`
      .yellow.bold
  )
);
