const { request, response } = require('express');
const User = require('./User');

async function show(req = request, res = response) {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = show;
