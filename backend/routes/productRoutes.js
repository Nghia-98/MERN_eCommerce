import express from 'express';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';
import * as productController from '../controllers/productControllers.js';

// @desc: Fetch all products
// @route: GET /api/product
// @access: Public
router
  .route('/')
  .get(productController.getProducts)
  .post(auth.isLogin, auth.isAdmin, productController.createProduct);

router.get('/all', productController.getAllProducts);

router.get('/top', productController.getTopProducts);

router
  .route('/:id/reviews')
  .post(auth.isLogin, productController.createProductReview);

// @desc: Fetch, Delete single product
// @route: GET, DELETE /api/products/:id
router
  .route('/:id')
  .get(productController.getProductById)
  .delete(auth.isLogin, auth.isAdmin, productController.deleteProductById)
  .put(auth.isLogin, auth.isAdmin, productController.updateProduct);

export default router;
