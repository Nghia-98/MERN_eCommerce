import { verifyToken } from '../utils/jwt.js';
import 'express-async-errors';
import User from '../model/userModel.js';

const isLogin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

    const { isValid, decoded } = verifyToken(token);

    if (!isValid) {
      res.status(401);
      throw new Error('Not authorized, token failed !');
    }

    console.log('authMiddler.js: decoded', decoded);
    req.user = await User.findById(decoded.id).select('-password');
    console.log('authMiddler.js: req.user', req.user);
    next();
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token found !');
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export default { isLogin, isAdmin };
