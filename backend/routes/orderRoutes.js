import express from 'express';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';

import { addOrderItems, getOrderById } from '../controllers/orderController.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.route('/').post(auth.isLogin, addOrderItems);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route('/:id').get(auth.isLogin, getOrderById);

export default router;
