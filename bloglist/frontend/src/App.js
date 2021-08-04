import './index.css'

import React, { useState, useEffect, useRef } from 'react'
import { decode } from 'jsonwebtoken'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogpost from './components/AddBlogpost'
import Message from './components/Message'

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const addBlogpostRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (error) {
      handleMessage(error.response.data.error, 'error')
    }
  }

  const handleCreate = async (title, author, url) => {
    addBlogpostRef.current.toggleVisibility()
    const res = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(res))
    handleMessage(`a new blog ${res.title} by ${res.author} added`)
  }

  const handleMessage = (message, type = 'success') => {
    setMessage({ type, message })
    setTimeout(() => setMessage(null), 3000)
  }

  const putLike = async (id, blogToUpdate) => {
    const result = await blogService.update(id, blogToUpdate)
    setBlogs(blogs.map((blog) => (blog.id === id ? result : blog)))
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
    } catch (err) {
      return handleMessage(err.response.data.error, 'error')
    }
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setMessage(null)
    setUser(null)
    blogService.setToken(null)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      const { exp } = decode(user.token)
      const expired = Date.now() >= exp * 1000 - 60000
      expired ? logout() : setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Message message={message} />
        <LoginForm handleLogin={handleLogin} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <div>
        {user.name} logged in
        <button onClick={logout}>log out</button>
      </div>
      <Togglable buttonLabel="create" ref={addBlogpostRef}>
        <AddBlogpost handleCreate={handleCreate} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            putLike={putLike}
            removeBlog={removeBlog}
            isCreator={user.username === blog.user.username}
          />
        ))}
    </div>
  )
}

export default App
