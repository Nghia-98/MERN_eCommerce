import express from 'express';
const router = express.Router();
import {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

// @route   /api/users

router.route('/')
  .get(auth.isLogin, auth.isAdmin, getUsers)
  .post(userRegister);

router.route('/login')
  .post(userLogin);

router.route('/profile')
  .get(auth.isLogin, getUserProfile)
  .put(auth.isLogin, updateUserProfile);

export default router;
