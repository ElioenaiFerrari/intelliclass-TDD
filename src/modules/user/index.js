const { response } = require('express');
const User = require('./User');
const { ok, badRequest } = require('../../utils/handleResponse');

function index(_, res = response) {
  try {
    return User.find().then((users) => ok(res)(users));
  } catch (error) {
    return badRequest(res)(error);
  }
}

module.exports = index;
