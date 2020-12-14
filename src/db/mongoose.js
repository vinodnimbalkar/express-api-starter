const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection failed');
  } else {
    // eslint-disable-next-line no-console
    console.log('Suucessfully connected with mongo db..!');
  }
});

module.exports = mongoose;
