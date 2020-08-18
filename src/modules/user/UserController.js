const { request, response } = require('express');
const User = require('./User');

module.exports = {
  async index(_, res = response) {
    try {
      const users = await User.find();

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  async store(req = request, res = response) {
    try {
      const user = await User.create(req.body);

      return res.status(201).json({ user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
