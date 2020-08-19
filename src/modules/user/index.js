const { request, response } = require('express');
const User = require('./User');

async function index(_, res = response) {
  try {
    const users = await User.find();

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = index;
