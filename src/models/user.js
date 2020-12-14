const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('../db/mongoose');

const date = new Date();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  refreshTokens: [{
    refreshToken: {
      type: String,
      required: true,
    },
  }],
  accessToken: {
    type: String,
  },
  avatar: {
    type: Buffer,
  },
  userType: {
    type: String,
    default: 'Trial',
  },
  expiryDate: {
    type: Date,
    default: date.setDate(date.getDate() + 7),
  },
  amount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.refreshTokens;
  delete userObject.avatar;
  delete userObject.amount;

  return userObject;
};

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  /* How to make JTW to token secure https://www.youtube.com/watch?v=rCkDE2me_qk */
  // eslint-disable-next-line no-underscore-dangle
  const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '2m', algorithm: 'HS256' });
  // eslint-disable-next-line no-underscore-dangle
  const refreshToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d', issuer: 'nearlaw', algorithm: 'HS256' });
  /*
  Good practice would be let the user login from second device and logged out him from first device
  it would be better from user experience as well as will be easy to handle
  We are giving user to access from only two devices
  */
  if (user.refreshTokens.length >= 2) {
    user.refreshTokens = user.refreshTokens.slice(1);
  }
  user.refreshTokens = user.refreshTokens.concat({ refreshToken });
  user.accessToken = accessToken;
  await user.save();
  return refreshToken;
};

// eslint-disable-next-line func-names
userSchema.methods.checkUserType = async function () {
  const user = this;

  if (user.expiryDate < date) {
    user.userType = 'Free';
  }
  await user.save();
  return user;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

// Hash the plain text password before saving
// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
