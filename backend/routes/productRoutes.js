import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProductById,
} from '../controllers/productControllers.js';
import auth from '../middleware/authMiddleware.js';

// @desc: Fetch all products
// @route: GET /api/product
// @access: Public
router.route('/').get(getProducts);

// @desc: Fetch, Delete single product
// @route: GET, DELETE /api/products/:id
router
  .route('/:id')
  .get(getProductById)
  .delete(auth.isLogin, auth.isAdmin, deleteProductById);

export default router;
