import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true, // not allow to change email field
    },
    emailVerificationToken: String,
    isVerifiedEmail: { type: Boolean, required: true, default: false },

    name: { type: String, required: true },
    password: String,

    facebookId: String,
    googleId: String,

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // return true or false
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
  } catch (error) {
    throw new Error(error.message);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
