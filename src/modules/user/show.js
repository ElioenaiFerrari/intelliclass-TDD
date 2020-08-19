const { request, response } = require('express');
const User = require('./User');
const { badRequest, ok } = require('../../utils/handleResponse');

const getUser = (res, user) => {
  if (!user) {
    return notFound(res);
  }

  return new Promise((resolve, _) => resolve(ok(res)(user)));
};

function show(req = request, res = response) {
  try {
    const { id } = req.params;

    User.findOne({ _id: id })
      .then((user) => getUser(res, user))
      .catch((error) => badRequest(res)(error));
  } catch (error) {
    return badRequest(res)(error);
  }
}

module.exports = show;
