// Importing middleware for error handling

import { errorHandler, notFound } from './Middleware/ErrorMiddleWare.js';

import connectDB from '../config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import orderRoutes from './Routes/orderRoutes.js';
import productRoute from './Routes/productRoutes.js';
import userRoute from './Routes/userRoutes.js';

// Loading environment variables from a .env file
dotenv.config();

// Defining the port for the server to run on
const port = process.env.PORT || 5000;

// Establishing a connection to the database
connectDB();

// Creating an instance of the Express.js application
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());



// Routes for handling products and users
app.use(`/api/products`, productRoute);
app.use(`/api/users`, userRoute);
app.use(`/api/orders`, orderRoutes);

app.get('api/config/paypal', (req, res)=>res.send({
  clientId:process.env.PAYPAL_CLIENT_ID
}))


// Applying the notFound and errorHandler middleware after defining routes
app.use(notFound);
app.use(errorHandler);

// Starting the server and listening on the specified port
app.listen(port, () => console.log(`Server running on port ${port}`));
