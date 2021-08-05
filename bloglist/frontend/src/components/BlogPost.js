import React from 'react'

const BlogPost = ({ blog, putLike }) => {
  if (!blog) {
    return null
  }

  const handleLike = () => {
    // form the data to send and send the request
    const data = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    putLike(blog.id, data)
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        link <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>Like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogPost
