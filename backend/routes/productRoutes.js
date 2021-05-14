import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productControllers.js';

// @desc: Fetch all products
// @route: GET /api/product
// @access: Public
router.route('/').get(getProducts);

// @desc: Fetch single product
// @route: GET /api/products/:id
// @access: Public
router.route('/:id').get(getProductById);

export default router;
