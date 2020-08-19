const { request, response } = require('express');
const User = require('./User');

async function store(req = request, res = response) {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = store;
