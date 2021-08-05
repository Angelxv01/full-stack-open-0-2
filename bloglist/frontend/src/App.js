import './index.css'

import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
// import { decode } from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogpost from './components/AddBlogpost'
import Message from './components/Message'

import Togglable from './components/Togglable'

import {
  setNotification,
  resetNotification
} from './reducers/notificationReducer'
import {
  addBlog,
  deleteBlog,
  initBlogs,
  likeBlog
} from './reducers/blogReducer'
import { loadUser, loginUser, logoutUser } from './reducers/userReducer'
import Users from './components/Users'

const App = () => {
  const [time, setTime] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)
  const addBlogpostRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      dispatch(loginUser(credentials))
    } catch (error) {
      handleMessage(error.response.data.error, 'error')
    }
  }

  const handleCreate = async (title, author, url) => {
    const data = { title, author, url }
    addBlogpostRef.current.toggleVisibility()
    const res = await dispatch(addBlog(data))
    handleMessage(`a new blog ${res.title} by ${res.author} added`)
  }

  const handleMessage = async (message, type = 'success') => {
    const id = await dispatch(setNotification({ message, type }, 5, time))
    setTime(id)
  }

  const putLike = async (id, blogToUpdate) => {
    dispatch(likeBlog(id, blogToUpdate))
  }

  const removeBlog = (id) => {
    try {
      dispatch(deleteBlog(id))
    } catch (err) {
      return handleMessage(err.response.data.error, 'error')
    }
  }

  const logout = () => {
    dispatch(resetNotification())
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(loadUser())
    // const loggedUserJSON = window.localStorage.getItem('loggedUser')
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   blogService.setToken(user.token)
    //   const { exp } = decode(user.token)
    //   const expired = Date.now() >= exp * 1000 - 60000
    //   expired ? logout() : setUser(user)
    // }
  }, [])

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Message />
        <LoginForm handleLogin={handleLogin} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message />
      <div>
        {user.name} logged in
        <button onClick={logout}>log out</button>
      </div>
      <div>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
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
        </Route>
      </Switch>
    </div>
  )
}

export default App
