require('dotenv/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function check(password, hash) {
  const isValid = await bcrypt.compare(password, hash);

  return isValid;
}

async function generateToken(data, secret = '123123') {
  const token = await jwt.sign(data, secret);

  return token;
}

module.exports = { check, generateToken };
