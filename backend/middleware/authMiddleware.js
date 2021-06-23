import jwt from 'jsonwebtoken';
import 'express-async-errors';
import User from '../model/userModel.js';

const isLogin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // const decoded = jwt.verify(token, 'a');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('-------------------------------', decoded);
      req.user = await User.findById(decoded.id).select('-password');
      //console.log(`req.user: ${req.user}`);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed !');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token found !');
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
};

export default { isLogin, isAdmin };
