/* eslint-disable no-undef */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../src/models/user.js');
const mongoose = require('../src/db/mongoose.js');

// set Today date
const date = new Date();

// get userID
const userOneId = new mongoose.Types.ObjectId();
// seed user
const userOne = {
  _id: userOneId,
  firstName: 'Vinod',
  lastName: 'Nimbalkar',
  email: 'vin@yahoo.com',
  password: 'vinversion',
  accessToken: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET, { expiresIn: '2m', issuer: 'nearlaw', algorithm: 'HS256' }),
  refreshTokens: [{
    refreshToken: jwt.sign({ _id: userOneId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d', issuer: 'nearlaw', algorithm: 'HS256' }),
  }],
};

// beforeEach :: before execute test delete all users and store seed user
// eslint-disable-next-line no-undef
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

// eslint-disable-next-line no-undef
test('Should signup a new user', async () => {
  const response = await request(app).post('/users/signup').send({
    firstName: 'Akshay',
    lastName: 'Mhatre',
    email: 'akshay@yahoo.com',
    password: 'testing123456',
  }).expect(201);

  // Assert that database was changed correctly
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findById(response.body.user._id);
  // eslint-disable-next-line no-undef
  expect(user).not.toBeNull();

  // Assertion about the response
  // eslint-disable-next-line no-undef
  expect(response.body).toMatchObject({
    user: {
      firstName: 'Akshay',
      lastName: 'Mhatre',
      email: 'akshay@yahoo.com',
      accessToken: user.accessToken,
    },
    refreshToken: user.refreshTokens[0].refreshToken,
  });
  // eslint-disable-next-line no-undef
  expect(user.password).not.toBe('MyPass777!');
  // check usertype
  expect(user.userType).toBe('Trial');
  // check expiry date should be greather than todays date
  expect(user.expiryDate > date).toBeTruthy();
});

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.user.accessToken).toBe(user.accessToken);
});

test('Sould not login non-existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'thisisnotmypass',
  }).expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.accessToken}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.accessToken}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('Should not delete account for unauthenticate user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.accessToken}`)
    .send({
      firstName: 'Sachin',
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.firstName).toEqual('Sachin');
});

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.accessToken}`)
    .send({
      location: 'Mumbai',
    })
    .expect(400);
});
