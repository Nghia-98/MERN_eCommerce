import express from 'express';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPay,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router
  .route('/')
  .post(auth.isLogin, addOrderItems)
  .get(auth.isLogin, auth.isAdmin, getOrders);

// @desc    Get logged in user order
// @route   PUT /api/orders/myorders
// @access  Private
router.route('/myorders').get(auth.isLogin, getMyOrders);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route('/:id').get(auth.isLogin, getOrderById);

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.route('/:id/pay').put(auth.isLogin, updateOrderToPay);

export default router;
