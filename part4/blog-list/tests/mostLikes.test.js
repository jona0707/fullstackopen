const { test, describe } = require('node:test')
const assert = require('node:assert')
const _ = require('lodash')
const mostLikes = require('../utils/list_helper').mostLikes

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('mostLikes', () => {
  test('of empty list is zero', () => {
    const result = mostLikes([])
    assert.strictEqual(result, 0)
  });
  test('when list has only one blog, that author is the most', () => {
    const onlyOneBlog = [blogs[0]]
    const mostLikesAuthor = {
      author: "Michael Chan",
      likes: 7
    }
    const result = mostLikes(onlyOneBlog)
    assert.deepStrictEqual(result, mostLikesAuthor)
  });
  test('of a bigger list is choose right', () => {
    // const mostLikesAuthor = {
    //   author: "Edsger W. Dijkstra",
    //   likes: 17
    // }
    const groupByAuthor = _.groupBy(blogs, 'author');
    const likesByAuthor = _.map(groupByAuthor, (authorBlogs, author) => ({
      author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    const mostLikesAuthor = _.maxBy(likesByAuthor, 'likes');

    const result = mostLikes(blogs)
    assert.deepStrictEqual(result, mostLikesAuthor)
  });
});