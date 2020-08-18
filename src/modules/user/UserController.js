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

  async destroy(req = request, res = response) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(404).json({
          error: 'not found',
        });
      }

      await User.deleteOne({ _id: user._id });

      return res.status(200).send();
    } catch (_) {
      return res.status(400).json({ error: 'bad request' });
    }
  },
};
