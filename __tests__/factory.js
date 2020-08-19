require('module-alias/register');
const { factory } = require('factory-girl');
const User = require('../src/modules/user/User');
const faker = require('faker');
const auth = require('../src/middlewares/auth');

factory.define('User', User, {
  name: faker.internet.userName,
  email: faker.internet.email,
  password_hash: faker.internet.password,
});

module.exports = factory;
