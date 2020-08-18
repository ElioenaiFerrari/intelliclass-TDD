const User = require('../../src/models/user');
const { disconnect, connect, drop } = require('../utils');

describe('Auth', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await drop();
    await disconnect();
  });

  const params = {
    name: 'Elioenai Ferrari',
    email: 'elioenaiferrari@gmail.com',
    password_hash: '123123',
  };

  it('verify if password has encrypted', async () => {
    const user = await User.create(params);

    expect(user.password_hash).not.toBe(params.password_hash);
  });
});
