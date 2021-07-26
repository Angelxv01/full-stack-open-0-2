const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const userExtractor = async (req, res, next) => {
  const token = req.token
  const decodedToken = jwt.verify(token, SECRET)
  if (!(token || decodedToken)) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  req.user = user.toJSON()
  next()
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    blogs: 0
  })
  res.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.use(userExtractor)

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user

  if (!(body.title && body.url)) {
    return res.status(400).json({ error: 'Missing content' }).end()
  }

  const blog = new Blog(body)

  if (!body.likes) {
    blog.likes = 0
  }
  blog.user = user.id

  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  res.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  let blogId = req.params.id
  const user = req.user
  const blog = await Blog.findById(blogId)

  if (user.id.toString() !== blog.user.toString()) {
    return res.status(401).json({
      error: 'only creator can delete blog'
    })
  }

  await blog.remove()
  blogId = blogId.toString()
  user.blogs = user.blogs.filter((blog) => blog.id.toString() !== blogId)
  user.save()
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const user = req.user
  const blogId = req.params.id

  if (!(body.likes && body.title)) {
    return res.status(400).json({ error: 'Missing content' }).end()
  }

  const blogToUpdate = await Blog.findById(blogId)
  if (user.id.toString() !== blogToUpdate.user.toString()) {
    return res.status(401).json({
      error: 'only creator can edit blog'
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
