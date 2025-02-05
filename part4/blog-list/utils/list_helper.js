const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;
  const maxLikes = Math.max(...blogs.map(blog => blog.likes));
  const favoriteBlog = blogs.find(blog => blog.likes === maxLikes);
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  };
};


// PARA EVITAR REDUCE SE PUEDE USAR LOASH!

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;
  const authorCount = blogs.reduce((count, blog) => {
    const existingAuthor = count.find(item => item.author === blog.author);
    existingAuthor
      ? existingAuthor.blogs++
      : count.push({ author: blog.author, blogs: 1 });
    return count;
  }, []);

  const maxBlogs = Math.max(...authorCount.map(author => author.blogs));
  const authorWithMostBlogs = authorCount.find(author => author.blogs === maxBlogs);

  return authorWithMostBlogs;
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  const authorLikes = blogs.reduce((count, blog) => {
    const existingAuthor = count.find(item => item.author === blog.author);
    existingAuthor
      ? existingAuthor.likes += blog.likes
      : count.push({ author: blog.author, likes: blog.likes });
    return count;
  }, []);

  const maxLikes = Math.max(...authorLikes.map(author => author.likes));
  const authorWithMostLikes = authorLikes.find(author => author.likes === maxLikes);
  return authorWithMostLikes;
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };