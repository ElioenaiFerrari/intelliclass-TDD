const mongoose = require('mongoose');

async function dropDatabase() {
  await mongoose.connection.db.dropDatabase(function (err, result) {
    if (err) return 'error';

    return result;
  });
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = {
  dropDatabase,
  disconnect,
};
