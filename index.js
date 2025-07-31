import express from 'express';
import dotenv from 'dotenv';
import * as productController from './controllers/productController.js';
import productsRouter from './routes/products.js';
import connectDB from './config/dbconfig.js'; 

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/products', productsRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});