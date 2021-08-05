import React from 'react'

const BlogPost = ({ blog, putLike, commentBlog, comment, setComment }) => {
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

  const Comments = () => {
    let counter = 0
    return (
      <div>
        <ul>
          {blog.comments.map((comment) => {
            counter++
            return <li key={counter}>{comment}</li>
          })}
        </ul>
      </div>
    )
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
      <div>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={() => commentBlog(blog.id, comment)}>
          add comment
        </button>
      </div>
      <div>
        <h3>comments</h3>
        {blog.comments ? <Comments /> : 'no comments yet'}
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogPost
