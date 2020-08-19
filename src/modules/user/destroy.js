const { request, response } = require('express');
const User = require('./User');

async function destroy(req = request, res = response) {
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
}

module.exports = destroy;
