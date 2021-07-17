const Blog = require('../models/blog')

const blogs = [
  {
    title: 'First try',
    author: 'Angelxv01',
    url: 'fake_url',
    likes: 0
  },
  {
    title: 'Second try',
    author: 'Angelxv01',
    url: 'fake_url',
    likes: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  blogsInDb,
  blogs
}
