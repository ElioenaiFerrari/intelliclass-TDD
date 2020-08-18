require('dotenv/config');
const mongoose = require('mongoose');

async function drop() {
  mongoose.connection.db.dropDatabase(function (err, result) {
    if (err) return 'error';

    return result;
  });
}

async function disconnect() {
  await mongoose.disconnect();
}

async function connect() {
  return require('../../src/config/database')(process.env.DATABASE_URL);
}

module.exports = {
  disconnect,
  connect,
  drop,
};
