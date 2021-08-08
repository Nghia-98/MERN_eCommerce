import express from 'express';
const router = express.Router();
import {
  userRegister,
  userLogin,
  userLoginSocial,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  authToken,
  sendVerifyEmail,
  verifyEmailByToken,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

// @route   /api/users

// prettier-ignore
router.route('/')
  .get(auth.isLogin, auth.isAdmin, getUsers)
  .post(userRegister);

// prettier-ignore
router.route('/authToken')
  .get(auth.isLogin, authToken)

// prettier-ignore
router.route('/login')
    .post(userLogin);

// prettier-ignore
router.route('/loginSocial')
  .get(userLoginSocial);

// prettier-ignore
router.route('/profile')
  .get(auth.isLogin, getUserProfile)
  .put(auth.isLogin, updateUserProfile);

// prettier-ignore
router.route('/:id')
  .get(auth.isLogin, auth.isAdmin, getUserById)
  .put(auth.isLogin, auth.isAdmin, updateUser)
  .delete(auth.isLogin, auth.isAdmin, deleteUser);

/* --------------- verify Email --------------- */
// prettier-ignore
router.route('/account/verifyEmail/:token')
  .get(auth.isLogin, verifyEmailByToken);

// prettier-ignore
router.route('/account/verifyEmail')
  .get(auth.isLogin, sendVerifyEmail);

// // prettier-ignore
// router.route('/verifyEmail')
//   .get(sendEmailVerify)

export default router;
