const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { sendWelcomeEmail, sendCancelationEmail } = require("../email/account.js");

// Create user information in database
const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    sendWelcomeEmail(user)
    const refreshToken = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, refreshToken });
  } catch (e) {
    res.status(400).send(e);
  }
};

// GET user information from database
const getUser = async (req, res) => {
  res.send(await req.user);
};

// UPDATE user information by id
// eslint-disable-next-line consistent-return
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' });
  }

  try {
    // eslint-disable-next-line no-return-assign
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// DELETE user information by id
const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user)
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    let user = await User.findByCredentials(req.body.email, req.body.password);
    if (user.userType === 'Trial' || user.userType === 'Paid') {
      user = await user.checkUserType();
    }
    const refreshToken = await user.generateAuthToken();
    res.send({ user, refreshToken });
  } catch (e) {
    res.status(400).send(e);
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    req.user.tokens = await req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
};

const avatarUser = async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
};

const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send(e);
  }
};

const renewAcessToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(403).send({ error: 'User not authenticated' });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, { algorithm: 'HS256' });
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findOne({ _id: decoded._id, 'refreshTokens.refreshToken': refreshToken });
    if (!user) {
      throw new Error();
    }
    // eslint-disable-next-line no-underscore-dangle
    const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '2m', algorithm: 'HS256' });
    user.accessToken = accessToken;
    await user.save();
    return res.status(201).send({ accessToken });
  } catch (e) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  avatarUser,
  deleteAvatar,
  getAvatar,
  renewAcessToken,
};
