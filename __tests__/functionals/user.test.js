require('dotenv/config');
const User = require('../../src/modules/user/User');
const { disconnect, connect, drop } = require('../utils');

describe('User', () => {
  beforeAll(async () => {
    await disconnect();
    await connect();
  });

  const params = {
    name: 'Elioenai Ferrari',
    email: 'elioenaiferrari@gmail.com',
    password_hash: '123123',
  };

  it('verify if User instance has correct', () => {
    const user = new User(params);

    expect(user.email).toBe(params.email);
  });

  it('verify if User instance has incorrect', () => {
    const user = new User(params);

    expect(user.email).not.toBe('test@test.com');
  });

  it('verify if User has created in database', async () => {
    const user = await User.create(params);

    expect(user.email).toBe(params.email);
  });

  it('get user by valid email', async () => {
    await User.create(params);
    const user = await User.findOne({ email: params.email });

    expect(user.email).toBe(params.email);
  });

  it('get user by invalid email', async () => {
    const user = await User.findOne({ email: 'invalid@gmail.com' });

    expect(user).toBe(null);
  });

  it('get all users', async () => {
    await User.create(params);
    const users = await User.find();

    expect(users.length).not.toBe(0);
  });

  it('delete user by valid id', async () => {
    const createdUser = await User.create(params);
    const fetchedUser = await User.findOne({ _id: createdUser._id });

    expect(fetchedUser.email).toBe(createdUser.email);

    await User.deleteOne({ _id: fetchedUser._id });
    const deletedUser = await User.findOne({ _id: createdUser._id });

    expect(deletedUser).toBe(null);
  });
});
