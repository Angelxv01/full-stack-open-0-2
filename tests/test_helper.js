const Blog = require('../models/blog')
const User = require('../models/user')

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

const findBlogById = async (id) => {
  const blog = await Blog.findById(id)
  return blog
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}
const findUserById = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  blogsInDb,
  findBlogById,
  usersInDb,
  findUserById,
  blogs
}
