import express from 'express';
const router = express.Router();
import {
  userRegister,
  userLogin,
  getUserProfile,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

router.route('/').post(userRegister);
router.route('/login').post(userLogin);
router.route('/profile').get(auth.isLogin, getUserProfile);

export default router;
