require('dotenv/config');
const database = require('../../src/config/database');
const User = require('../../src/models/user');
const { disconnect, dropDatabase } = require('../utils');

describe('User', () => {
  beforeEach(async () => {
    await database(process.env.DATABASE_URL);
  });

  afterEach(async () => {
    await dropDatabase();
    await disconnect();
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

  it('delete user by valid email', async () => {
    await User.create(params);
    const user = await User.findOne({ email: params.email });

    expect(user.email).toBe(params.email);

    await user.deleteOne();
    const deletedUser = await User.findOne({ email: params.email });

    expect(deletedUser).toBe(null);
  });
});
