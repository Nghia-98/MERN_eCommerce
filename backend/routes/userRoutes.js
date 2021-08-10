import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

// @route   /api/users

// prettier-ignore
router.route('/')
  .get(auth.isLogin, auth.isAdmin, userController.getUsers)
  .post(userController.userRegister);

// prettier-ignore
router.route('/authToken')
  .get(auth.isLogin, userController.authToken)

// prettier-ignore
router.route('/login')
    .post(userController.userLogin);

// prettier-ignore
router.route('/loginSocial')
  .get(userController.userLoginSocial);

// prettier-ignore
router.route('/profile')
  .get(auth.isLogin, userController.getUserProfile)
  .put(auth.isLogin, userController.updateUserProfile);

// prettier-ignore
router.route('/:id')
  .get(auth.isLogin, auth.isAdmin, userController.getUserById)
  .put(auth.isLogin, auth.isAdmin, userController.updateUser)
  .delete(auth.isLogin, auth.isAdmin, userController.deleteUser);

/* --------------- verify Email --------------- */
// prettier-ignore
router.route('/account/verifyEmail/:token')
  .get(auth.isLogin, userController.verifyEmailByToken);

// prettier-ignore
router.route('/account/verifyEmail')
  .get(auth.isLogin, userController.sendVerifyEmail);

// // prettier-ignore
// router.route('/verifyEmail')
//   .get(sendEmailVerify)

export default router;
