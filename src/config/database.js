const mongoose = require('mongoose');

module.exports = async (url) => {
  try {
    console.log(`connected in ${url}`);
    return mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      autoIndex: false,
    });
  } catch (error) {
    return error;
  }
};
