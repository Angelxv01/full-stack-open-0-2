const logger = require('../utils/logger')

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

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
