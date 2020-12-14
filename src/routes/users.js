const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth.js');

const {
  // eslint-disable-next-line max-len
  createUser, getUser, updateUser, deleteUser, loginUser, logoutUser, avatarUser, deleteAvatar, getAvatar, renewAcessToken,
} = require('../controllers/user.js');

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    return cb(undefined, true);
  },
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

/* Create user */
router.post('/signup', createAccountLimiter, createUser);
router.post('/login', loginUser);
router.post('/renewAcessToken', renewAcessToken);
router.post('/me/avatar', auth, upload.single('avatar'), avatarUser, (error, req, res) => {
  res.status(400).send({ error: error.message });
});
router.get('/logout', auth, logoutUser);
router.get('/me', auth, getUser);
router.get('/:id/avatar', getAvatar);
router.patch('/me', auth, updateUser);
router.delete('/me', auth, deleteUser);
router.delete('/me/avatar', auth, deleteAvatar);

module.exports = router;
