require('dotenv/config');
const { disconnect } = require('../utils');
const database = require('../../src/config/database');

describe('MongoDB', () => {
  it('verify connection on success', async () => {
    const connect = await database(process.env.DATABASE_URL);
    const { readyState } = connect.connection;

    expect(readyState).toBe(1);

    await disconnect();
  });
});
