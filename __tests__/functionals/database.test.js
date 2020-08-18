require('dotenv/config');
const mongoose = require('mongoose');
const { disconnect, connect } = require('../utils');

describe('MongoDB', () => {
  it('verify connection on success', async () => {
    await connect();
    const { readyState } = mongoose.connection;

    expect(readyState).toBe(1);

    await disconnect();
  });
});
