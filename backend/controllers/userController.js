import User from '../model/userModel.js';
import 'express-async-errors';

// @desc:   Auth user & get token
// @route:  POST /api/Uusers/loginproduct
// @access: Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password !!!' });
  }
};

export { authUser };
