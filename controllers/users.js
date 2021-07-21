const logger = require('../utils/logger')
const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  logger.Info(body)
  if (body === undefined) {
    return res.status(400).json({ error: 'missing body' })
  }

  if (body.password.length < 3) {
    return res.status(400).json({ error: 'malformed data' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name || '',
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = usersRouter
