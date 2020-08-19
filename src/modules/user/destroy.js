const { request, response } = require('express');
const User = require('./User');
const { ok, badRequest } = require('../../utils/handleResponse');

const deleteUser = (user) => {
  if (!user) {
    return badRequest(res);
  }

  return new Promise((resolve, _) => resolve(user.deleteOne()));
};

function destroy(req = request, res = response) {
  try {
    const { id } = req.params;

    User.findOne({ _id: id })
      .then(deleteUser)
      .then((_) => ok(res)(null))
      .catch((error) => badRequest(res)(error));
  } catch (error) {
    return badRequest(res)(error);
  }
}

module.exports = destroy;
