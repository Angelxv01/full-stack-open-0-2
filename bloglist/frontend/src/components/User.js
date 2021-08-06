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
      <ol>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ol>
    </div>
  )
}

export default User
