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

describe('API GET /', () => {
  test('get all', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('check id', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const ids = res.body.map((blog) => blog.id)
    expect(ids).toBeDefined()
  })
})

describe('API POST /', () => {
  test('valid post', async () => {
    const blog = {
      title: 'different message since before',
      author: 'Angelxv01',
      url: 'still_fake_url',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    expect(blogs).toHaveLength(helper.blogs.length + 1)

    const contents = blogs.map((blog) => blog.title)
    expect(contents).toContain(blog.title)
  })

  test('valid post without likes', async () => {
    const blog = {
      title: 'different message since before',
      author: 'Angelxv01',
      url: 'still_fake_url'
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('invalid post without title and url', async () => {
    const blog = {
      author: 'Angelxv01'
    }

    await api.post('/api/blogs').send(blog).expect(400)
  })
})

describe('API DELETE /:id', () => {
  test('valid id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const inDbBlogs = await helper.blogsInDb()
    expect(inDbBlogs).toHaveLength(helper.blogs.length - 1)
  })

  test('invalid id', async () => {
    await api
      .delete('/api/blogs/1')
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('API PUT /:id', () => {
  test('valid id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const updatedInfo = { likes: 200, title: 'My friend and I at the zoo' }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedInfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = await helper.findById(blogToUpdate.id)
    expect(updatedBlog).toEqual(expect.objectContaining(updatedInfo))
  })

  test('missing body', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({})
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('missing body', async () => {
    const updatedInfo = { likes: 200, title: 'My friend and I at the zoo' }

    await api
      .put('/api/blogs/1')
      .send(updatedInfo)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => mongoose.connection.close())
