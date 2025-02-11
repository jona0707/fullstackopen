const blogsRouter = require('express').Router();
const Blog = require('../models/blogModel');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});


blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = req.user;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  await Blog.findByIdAndDelete(id);
  user.blogs = user.blogs.filter(blog => blog.id.toString() !== id);
  await user.save();

  res.status(200).json({ message: 'blog deleted' });
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