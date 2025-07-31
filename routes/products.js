import express from 'express';
import { validateProduct } from '../utils/validation.js';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

export default router;