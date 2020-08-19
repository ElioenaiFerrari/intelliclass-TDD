const { response } = require('express');

const responseTypes = {
  200: 'ok',
  201: 'created',
  400: 'bad request',
  404: 'not found',
};

const make = (res = response, status, data) =>
  res.status(status).json({
    message: responseTypes[status],
    data,
  });

const ok = (res = response) => (data) => make(res, 200, data);

const created = (res = response) => (data) => make(res, 201, data);

const badRequest = (res = response) => (data) => make(res, 400, data);

const notFound = (res = response) => (data) => make(res, 404, data);

module.exports = {
  ok,
  created,
  badRequest,
  notFound,
  make,
};
