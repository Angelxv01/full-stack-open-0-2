import './index.css'

import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// import { decode } from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux'

import userService from './services/user'

// import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogpost from './components/AddBlogpost'
import Message from './components/Message'
import User from './components/User'
import BlogPost from './components/BlogPost'
import Users from './components/Users'
import Navigation from './components/Navigation'

import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import {
  addBlog,
  // deleteBlog,
  initBlogs,
  likeBlog,
  commentBlog
} from './reducers/blogReducer'
import { loadUser, loginUser } from './reducers/userReducer'
import { Entry, Title } from './styles'

const App = () => {
  const [time, setTime] = useState(null)
  const [users, setUsers] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    userService.getAll().then((res) => setUsers(res))
  }, [])

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  const matchUser = useRouteMatch('/users/:id')
  const selectedUser = matchUser
    ? users.find((obj) => obj.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const selectedBlog = matchBlog
    ? blogs.find((obj) => obj.id === matchBlog.params.id)
    : null

  const addBlogpostRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      dispatch(loginUser(credentials))
    } catch (error) {
      handleMessage(error.response.data.error, 'error')
    }
  }

  const addComment = async (id, comment) => {
    dispatch(commentBlog(id, comment))
    setComment('')
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

  // const removeBlog = (id) => {
  //   try {
  //     dispatch(deleteBlog(id))
  //   } catch (err) {
  //     return handleMessage(err.response.data.error, 'error')
  //   }
  // }

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
      <Navigation />
      <Message />
      <Switch>
        <Route path="/users/:id">
          <User user={selectedUser} />
        </Route>
        <Route path="/blogs/:id">
          <BlogPost
            blog={selectedBlog}
            putLike={putLike}
            commentBlog={addComment}
            comment={comment}
            setComment={setComment}
          />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <Title size={2} color={'#0F3325'}>
            Blogs
          </Title>
          <Togglable buttonLabel="create" ref={addBlogpostRef}>
            <AddBlogpost handleCreate={handleCreate} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Entry to={`/blogs/${blog.id}`} key={blog.id}>
                {blog.title}
              </Entry>
              // <Blog
              //   key={blog.id}
              //   blog={blog}
              //   putLike={putLike}
              //   removeBlog={removeBlog}
              //   isCreator={user.username === blog.user.username}
              // />
            ))}
        </Route>
      </Switch>
    </div>
  )
}

export default App
