const { request, response } = require('express');
const User = require('./User');
const { notFound, ok, badRequest } = require('../../utils/handleResponse');

const onUpdateUser = (res, user, data) => {
  if (!user._id) {
    return notFound(res)(user);
  }

  return new Promise((resolve, _) => {
    return user.updateOne({ _id: user._id }, data).then((updatedUser) => {
      return resolve(ok(res)(updatedUser));
    });
  });
};

async function update(req = request, res = response) {
  try {
    const { id } = req.params;

    User.findOne({ _id: id })
      .then((user) => onUpdateUser(res, user, req.body))
      .catch((error) => badRequest(res)(error));
  } catch (error) {
    return badRequest(res)(error);
  }
}

module.exports = update;
