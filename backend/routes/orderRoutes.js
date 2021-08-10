import express from 'express';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';

import orderController from '../controllers/orderController.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router
  .route('/')
  .post(auth.isLogin, orderController.addOrderItems)
  .get(auth.isLogin, auth.isAdmin, orderController.getOrders);

// @desc    Get logged in user order
// @route   PUT /api/orders/myorders
// @access  Private
router.route('/myorders').get(auth.isLogin, orderController.getMyOrders);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route('/:id').get(auth.isLogin, orderController.getOrderById);

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.route('/:id/pay').put(auth.isLogin, orderController.updateOrderToPay);

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private
router
  .route('/:id/deliver')
  .put(auth.isLogin, auth.isAdmin, orderController.updateOrderToDelivered);

export default router;
