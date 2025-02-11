const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const assert = require('assert');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');

const api = supertest(app);

describe('blog_api', () => {
  let token;
  let userId;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const userResponse = await api
      .post('/api/users')
      .send(helper.initialUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    userId = userResponse.body.id;

    const login = await api
      .post('/api/login')
      .send({ username: helper.initialUser.username, password: helper.initialUser.password })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    token = 'Bearer ' + login.body.token;

    const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: userId }));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set({ Authorization: token })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('unique identifier is called id', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: token });
    const blogs = response.body;

    blogs.forEach(blog => {
      assert(blog.id); // detecta que existe la propiedad id
      assert(!blog._id); // detecta que no existe la propiedad _id
    });
  });

  test('a new blog can be added', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'http://newblog.com',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(blog => blog.title);
    assert(contents.includes('New blog'));
  });

  test('if likes property is missing, it defaults to 0', async () => {
    const blogWithoutLikes = {
      title: 'New blog',
      author: 'New author',
      url: 'http://newblog.com',
    };

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const blog = blogsAtEnd.find(blog => blog.title === 'New blog');
    assert.strictEqual(blog.likes, 0);
  });


  test('if titlte or url is missing, api returns 400 Bad Request', async () => {
    const blogWithoutTitle = {
      author: 'New author',
      url: 'http://newblog.com',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogWithoutURL = {
      title: 'New blog',
      author: 'New author',
      likes: 0,
    };
    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(blogWithoutURL)
      .expect(400)
      .expect('Content-Type', /application\/json/);


    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: token })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

    const blogsTitles = blogsAtEnd.map(blog => blog.title);
    assert(!blogsTitles.includes(blogToDelete.title));
  });

  test('deleting a non-existing blog returns 204', async () => {
    const nonExistingId = await helper.nonExistingId();

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set({ Authorization: token })
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogsAtStart[0],
      likes: 1000,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set({ Authorization: token })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
    assert.strictEqual(updatedBlogInDb.likes, 1000);
  });

  test('updating a non-existing blog returns 204', async () => {
    const nonExistingId = await helper.nonExistingId();

    await api
      .put(`/api/blogs/${nonExistingId}`)
      .set({ Authorization: token })
      .send({})
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});


