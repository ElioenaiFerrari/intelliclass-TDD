const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password_hash: {
    type: String,
  },
});

schema.pre('save', async function () {
  const HASH_SALTS = 8;

  const password = this.get('password_hash');
  const hashPassword = await bcrypt.hash(password, HASH_SALTS);

  this.set('password_hash', hashPassword);
});

module.exports = mongoose.model('User', schema);
