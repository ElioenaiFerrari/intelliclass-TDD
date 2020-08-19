const { request, response } = require('express');
const User = require('./User');

async function update(req = request, res = response) {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).send();
    }
    const updatedUser = await user.update(req.body);

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = update;
