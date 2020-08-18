const request = require('supertest');
const app = require('../../src/config/app');
const User = require('../../src/modules/user/User');
const { connect, disconnect, drop } = require('../utils');

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

  it('verify if GET /users/:id return 200 and user', async () => {
    const user = await User.create(params);
    const { status, body } = await request(app).get(`/users/${user._id}`);

    expect(body.user._id).not.toBe(null);
    expect(status).toBe(200);
  });

  it('verify if PUT /users return 200 and update user', async () => {
    const user = await User.create(params);
    const { status, body } = await request(app).put(`/users/${user._id}`).send({
      email: 'test@test.com',
    });

    expect(body.user.email).not.toBe(user.email);
    expect(status).toBe(200);
  });

  it('verify if POST /users/:id return 200 and create user', async () => {
    const { status, body } = await request(app).post('/users').send(params);

    expect(body.user.email).toEqual(params.email);
    expect(status).toBe(201);
  });

  it('verify if DELETE /users/:id return 200 and delete user', async () => {
    const { body } = await request(app).post('/users').send(params);
    const { status } = await request(app).delete(`/users/${body.user._id}`);

    expect(status).toBe(200);
  });

  it('verify if DELETE /users/:id return 400 and return bad request', async () => {
    const { status, body } = await request(app).delete(`/users/123123`);

    expect(status).toBe(400);
    expect(body.error).toBe('bad request');
  });
});
