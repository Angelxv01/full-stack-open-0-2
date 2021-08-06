import React from 'react'
import { Title } from '../styles'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <Title color={'#0F3325'}>{user.name}</Title>
      <Title color={'#0F3325'} size={1} capitalize>
        Added blogs
      </Title>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
