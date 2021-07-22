// const logger = require('../utils/logger')
const { userExtractor } = require('../utils/middleware')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    blogs: 0
  })
  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

  if (!(body.title && body.url)) {
    return res.status(400).json({ error: 'Missing content' }).end()
  }

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

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blogId = req.params.id
  const user = req.user

  const blog = await Blog.findById(blogId)

  if (user._id.toString() !== blog.user.toString()) {
    return res.status(401).json({
      error: 'creator id is different from token id'
    })
  }

  await Blog.findByIdAndDelete(blogId)
  res.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user
  const blogId = req.params.id

  if (!(body.likes && body.title)) {
    return res.status(400).json({ error: 'Missing content' }).end()
  }

  const blogToUpdate = await Blog.findById(blogId)

  if (user._id.toString() !== blogToUpdate.user.toString()) {
    return res.status(401).json({
      error: 'creator id is different from token id'
    })
  }

  const blog = await Blog.findByIdAndUpdate(
    blogId,
    { title: body.title, likes: body.likes },
    { new: true }
  )

  res.json(blog.toJSON())
})
module.exports = blogsRouter
