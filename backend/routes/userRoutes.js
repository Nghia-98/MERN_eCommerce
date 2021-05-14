import express from 'express';
const router = express.Router();
import { userLogin, getUserProfile } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

router.route('/login').post(userLogin);
router.route('/profile').get(auth.isLogin, getUserProfile);

export default router;
