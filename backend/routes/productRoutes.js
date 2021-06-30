import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
} from '../controllers/productControllers.js';
import auth from '../middleware/authMiddleware.js';

// @desc: Fetch all products
// @route: GET /api/product
// @access: Public
router
  .route('/')
  .get(getProducts)
  .post(auth.isLogin, auth.isAdmin, createProduct);

// @desc: Fetch, Delete single product
// @route: GET, DELETE /api/products/:id
router
  .route('/:id')
  .get(getProductById)
  .delete(auth.isLogin, auth.isAdmin, deleteProductById)
  .put(auth.isLogin, auth.isAdmin, updateProduct);

export default router;
