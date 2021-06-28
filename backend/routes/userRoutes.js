import express from 'express';
const router = express.Router();
import {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

// @route   /api/users

// prettier-ignore
router.route('/')
  .get(auth.isLogin, auth.isAdmin, getUsers)
  .post(userRegister);

// prettier-ignore
router.route('/login')
  .post(userLogin);

// prettier-ignore
router.route('/profile')
  .get(auth.isLogin, getUserProfile)
  .put(auth.isLogin, updateUserProfile);

// prettier-ignore
router.route('/:id')
  .delete(auth.isLogin, auth.isAdmin, deleteUser);

export default router;
