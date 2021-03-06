const User = require('../../src/modules/user/User');
const auth = require('../../src/middlewares/auth');
const { disconnect, connect } = require('../utils');
const factory = require('../factory');

describe('Auth', () => {
  beforeAll(async () => {
    await disconnect();
    await connect();
  });

  const params = {
    name: 'Elioenai Ferrari',
    email: 'elioenaiferrari@gmail.com',
    password_hash: '123123',
  };

  it('verify if password has encrypted', async () => {
    const user = await factory.create('User');

    expect(user.password_hash).not.toBe(params.password_hash);
  });

  it('verify if password is valid', async () => {
    const user = await factory.create('User', {
      password_hash: '123123',
    });
    const password = '123123';

    const isValid = await auth.check(password, user.password_hash);

    expect(isValid).toBe(true);
  });

  it('verify if password is invalid', async () => {
    const user = await factory.create('User');

    const password = '123123';

    const isValid = await auth.check(password, user.password_hash);

    expect(isValid).toBe(false);
  });

  it('verify if token as been created', async () => {
    const user = await factory.create('User');
    const token = await auth.generateToken({ user }, process.env.SECRET);

    expect(token).not.toBe(null);
  });

  it('verify if two hashs has equal', async () => {
    const hashOne = await auth.generateToken({ params }, process.env.SECRET);
    const hashTwo = await auth.generateToken({ params }, process.env.SECRET);

    expect(hashOne).toEqual(hashTwo);
  });

  it('verify if two hashs has different', async () => {
    const hashOne = await auth.generateToken({ params }, process.env.SECRET);
    const hashTwo = await auth.generateToken({ params }, 'otherSecret');

    expect(hashOne).not.toEqual(hashTwo);
  });
});
