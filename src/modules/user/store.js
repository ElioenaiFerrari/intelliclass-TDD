const { request, response } = require('express');
const User = require('./User');
const { badRequest, created } = require('../../utils/handleResponse');

const onCreateUser = (res, user) => {
  if (!user._id) {
    return badRequest(res)(user);
  }

  return new Promise((resolve, _) => resolve(created(res)(user)));
};

function store(req = request, res = response) {
  try {
    User.create(req.body)
      .then((user) => onCreateUser(res, user))
      .catch((error) => badRequest(res)(error));
  } catch (error) {
    return badRequest(res)(error);
  }
}

module.exports = store;
