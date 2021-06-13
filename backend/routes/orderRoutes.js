import express from 'express';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';

import { addOrderItems } from '../controllers/orderController.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.route('/').post(auth.isLogin, addOrderItems);

export default router;
