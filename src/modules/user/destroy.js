const { request, response } = require('express');
const User = require('./User');
const { ok, badRequest } = require('../../utils/handleResponse');

const deleteUser = (res, user) => {
  if (!user._id) {
    return badRequest(res);
  }

  return new Promise((resolve, _) => {
    return user.deleteOne({ _id: user._id }).then(() => resolve(ok(res)(null)));
  });
};

function destroy(req = request, res = response) {
  try {
    const { id } = req.params;

    User.findOne({ _id: id })
      .then((user) => deleteUser(res, user))
      .catch((error) => badRequest(res)(error));
  } catch (error) {
    return badRequest(res)(error);
  }
}

module.exports = destroy;
