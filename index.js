// const morgan = require("morgan");
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world!')
})

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

app.get('/info', (req, res) =>
  Person.find({}).then((people) =>
    res.send(
      `<p>Phonebook has info for ${people.length} people</p>
      <br>
      ${new Date()}`
    )
  )
)

app.get('/api/persons', (req, res) =>
  Person.find({}).then((people) => res.json(people))
)

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (body === undefined) {
    return res.status(400).json({
      error: 'Missing content'
    })
  }

  const { name, number } = body

  const person = new Person({
    name,
    number
  })

  person
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  if (body === undefined) {
    return res.status(400).json({
      error: 'Missing content'
    })
  }

  const { name, number } = body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err))
})

app.use((req, res) => res.status(404).send('invalid route'))
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
