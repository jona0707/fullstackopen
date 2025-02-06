const blogsRouter = require('express').Router();
const Blog = require('../models/blogModel');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deletedBlog = await Blog.findByIdAndDelete(id);
  res.status(204).json(deletedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = req.body;

  const existingBlog = await Blog.findById(id);
  if (!existingBlog) {
    return res.status(404).json({ error: "Blog not found" }).end();
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true });

  res.json(updatedBlog);

});

module.exports = blogsRouter;