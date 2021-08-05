import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ol>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ol>
    </div>
  )
}

export default User
