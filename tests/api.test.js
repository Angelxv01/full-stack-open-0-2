const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
// const logger = require('../utils/logger')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogsObject = helper.blogs.map((blog) => new Blog(blog))
  const promiseBuffer = blogsObject.map((blog) => blog.save())
  await Promise.all(promiseBuffer)
}, 100000)

test('API get all', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('API check id', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const ids = res.body.map((blog) => blog.id)
  expect(ids).toBeDefined()
})

test('API post message', async () => {
  const blog = {
    title: 'different message since before',
    author: 'Angelxv01',
    url: 'still_fake_url',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()

  expect(blogs).toHaveLength(helper.blogs.length + 1)

  const contents = blogs.map((blog) => blog.title)
  expect(contents).toContain(blog.title)
})

test('API post without likes', async () => {
  const blog = {
    title: 'different message since before',
    author: 'Angelxv01',
    url: 'still_fake_url'
  }

  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('API post without title and url', async () => {
  const blog = {
    author: 'Angelxv01'
  }

  await api.post('/api/blogs').send(blog).expect(400)
})

afterAll(() => mongoose.connection.close())
