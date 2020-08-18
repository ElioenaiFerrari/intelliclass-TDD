const User = require('../../src/models/user');
const auth = require('../../src/middlewares/auth');
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

    await drop();
  });

  it('verify if password is valid', async () => {
    const user = await User.create(params);
    const password = '123123';

    const isValid = await auth.check(password, user.password_hash);

    expect(isValid).toBe(true);
    await drop();
  });

  it('verify if password is invalid', async () => {
    const user = await User.create(params);
    const password = '123';

    const isValid = await auth.check(password, user.password_hash);

    expect(isValid).toBe(false);
    await drop();
  });

  it('verify if token as been created', async () => {
    const user = await User.create(params);
    const token = await auth.generateToken({ user }, process.env.SECRET);

    expect(token).not.toBe(null);
    await drop();
  });

  it('verify if two hashs has equal', async () => {
    const hashOne = await auth.generateToken({ params }, process.env.SECRET);
    const hashTwo = await auth.generateToken({ params }, process.env.SECRET);

    expect(hashOne).toEqual(hashTwo);
    await drop();
  });

  it('verify if two hashs has different', async () => {
    const hashOne = await auth.generateToken({ params }, process.env.SECRET);
    const hashTwo = await auth.generateToken({ params }, 'otherSecret');

    expect(hashOne).not.toEqual(hashTwo);
    await drop();
  });
});
