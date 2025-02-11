const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const app = require('../app');
const helper = require('./test_helper')
const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekretLOL', 10)
    const user = new User({ username: 'first', name: 'admin', passwordHash })

    await user.save()
  })

  test('creation succeeds with a correct username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Jona',
      name: 'Jonathan',
      password: 'myPassword'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    assert(usernames.includes(newUser.username));
  });

  test('if username is already taken, creation fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'first',
      name: 'admin',
      password: 'myPassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error === 'expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  });

  test('if password have less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'Jona',
      name: 'Jonathan',
      password: 'my'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert(result.body.error === 'Password must have at least 3 characters');
  });

  after(async () => {
    await mongoose.connection.close()
  })


})