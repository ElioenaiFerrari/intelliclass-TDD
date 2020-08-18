const request = require('supertest');
const app = require('../../src/config/app');
const User = require('../../src/modules/user/User');
const { connect, disconnect } = require('../utils');

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

  it('verify if GET /users return 200 and users', async () => {
    await User.create(params);
    const { status, body } = await request(app).get('/users');

    expect(body.users).not.toBe([]);
    expect(status).toBe(200);
  });

  it('verify if POST /users return 201 and create user', async () => {
    const { status, body } = await request(app).post('/users').send(params);

    expect(body.user.email).toEqual(params.email);
    expect(status).toBe(201);
  });
});
