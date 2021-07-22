const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const requestLogger = (req, res, next) => {
  logger.Info('Method:', req.method)
  logger.Info('Path:  ', req.path)
  logger.Info('Body:  ', req.body)
  logger.Info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.Error(err.message)
  switch (err.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformed id' })
    case 'ValidationError':
      return res.status(400).json({ error: err.message })
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' })
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' })
  }
  next(err)
}

const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substr(7)
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const token = req.token

  const decodedToken = jwt.verify(token, SECRET)

  if (!(token || decodedToken)) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  req.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  userExtractor
}
