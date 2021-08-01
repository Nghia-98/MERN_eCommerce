import 'express-async-errors';
import User from '../model/userModel.js';
import { generateToken, verifyToken, decodeToken } from '../utils/jwt.js';

// @desc:    User register
// @route:   POST /api/users
// @access:  Public

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    res.status(400); // 400 - bad request
    throw new Error('User already existing !');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    return res
      .status(201) // 201 - create success
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
  } else {
    res.status(400);
    throw new Error('Invalid user data !');
  }
};

// @desc:   User login & get token
// @route:  POST /api/users/login
// @access: Public
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    return res.status(200).json(userInfo);
  } else {
    res.status(401).json({ message: 'Invalid email or password !!!' });
  }
};

// @desc    User login by social account (facebook, google)
// @route   GET /api/user/loginSocial
// @acess   Public
const userLoginSocial = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.replace('Bearer ', '');

    const { isValid, decoded } = verifyToken(token);

    if (!isValid) {
      res.status(401);
      throw new Error('Not authorized, token failed !');
    } else {
      const { email, username, facebookId, googleId } = decoded;

      const userExists = await User.findOne({ email });
      console.log('userExists', userExists);

      // User login by facebook account
      if (facebookId) {
        if (!userExists) {
          const createdUser = await User.create({
            name: username,
            email,
            facebookId,
          });

          if (createdUser) {
            const token = generateToken(createdUser._id);

            return res.status(201).json({
              _id: createdUser._id,
              name: createdUser.name,
              email: createdUser.email,
              isAdmin: createdUser.isAdmin,
              facebookId: createdUser.facebookId,
              token,
            });
          } else {
            res.status(400);
            throw new Error('Invalid user data !');
          }
        } else {
          if (userExists.facebookId) {
            const token = generateToken(userExists._id);

            return res.status(200).json({
              _id: userExists._id,
              name: userExists.name,
              email: userExists.email,
              isAdmin: userExists.isAdmin,
              facebookId: userExists.facebookId,
              token,
            });
          }

          // User login by Facebook
          // && email has been registered by an account
          // && account dont have facebookId
          if (userExists.googleId) {
            res.status(400);
            throw new Error(
              `Email "${email}" has been registered at PROSHOP with Google account !`
            );
          } else {
            res.status(400);
            throw new Error(
              `Email "${email}" has been registered at PROSHOP with Local account !`
            );
          }
        }
      }

      // User login by Google account
      if (googleId) {
        if (!userExists) {
          const createdUser = await User.create({
            name: username,
            email,
            googleId,
          });

          if (createdUser) {
            const token = generateToken(createdUser._id);

            return res.status(201).json({
              _id: createdUser._id,
              name: createdUser.name,
              email: createdUser.email,
              isAdmin: createdUser.isAdmin,
              googleId: createdUser.googleId,
              token,
            });
          } else {
            res.status(400);
            throw new Error('Invalid user data !');
          }
        } else {
          if (userExists.googleId) {
            const token = generateToken(userExists._id);

            return res.status(200).json({
              _id: userExists._id,
              name: userExists.name,
              email: userExists.email,
              isAdmin: userExists.isAdmin,
              googleId: userExists.googleId,
              token,
            });
          }

          // User login by Google
          // && email has been registered by an account
          // && account dont have googleId
          if (userExists.facebookId) {
            res.status(400);
            throw new Error(
              `Email "${email}" has been registered at PROSHOP with Facebook account !`
            );
          } else {
            res.status(400);
            throw new Error(
              `Email "${email}" has been registered at PROSHOP with Local account !`
            );
          }
        }
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token found !');
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      facebookId: user.facebookId,
      googleId: user.googleId,
    });
  } else {
    res.status(404);
    throw new Error('User not found !');
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    if (name) user.name = name;
    if (password) user.password = password;

    const updatedUser = await user.save();
    const token = generateToken(updatedUser._id);

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      facebookId: updatedUser.facebookId,
      googleId: updatedUser.googleId,
      token,
    });
  } else {
    res.status(404);
    throw new Error('User not found !');
  }
};

// @desc    Get all user
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ _id: -1 });

  res.json(users);
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const { name, isAdmin } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    if (name) user.name = name;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found !');
  }
};

export {
  userLogin,
  getUserProfile,
  updateUserProfile,
  userRegister,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  userLoginSocial,
};
