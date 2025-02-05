const blogsRouter = require('express').Router();
const Blog = require('../models/blogModel');

blogsRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then(blogs => res.json(blogs))
    .catch(error => next(error));
});

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(savedBlog => res.status(201).json(savedBlog))
    .catch(error => next(error));
});

module.exports = blogsRouter;