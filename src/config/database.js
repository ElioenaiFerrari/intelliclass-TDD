const mongoose = require('mongoose');

module.exports = async (url) => {
  try {
    console.log('success');
    return mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  } catch (error) {
    return error;
  }
};
