const logger = require('../utils/logger')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    blogs: 0
  })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if (!(body.title && body.url)) {
    return res.status(400).json({ error: 'Missing content' }).end()
  }

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  res.json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  if (!(body.likes && body.title)) {
    return res.status(400).json({ error: 'Missing content' }).end()
  }

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title: body.title, likes: body.likes },
    { new: true }
  )

  logger.Info(blog)
  res.json(blog.toJSON())
})
module.exports = blogsRouter
