import React from 'react'
import { StyledButton, StyledInput, Title } from '../styles'

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
      <Title size={2} color={'#0F3325'}>
        {blog.title}
      </Title>
      <div>
        <a href={blog.url}>link</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <StyledButton secondary onClick={handleLike}>
          Like
        </StyledButton>
      </div>
      <div>
        <StyledInput>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </StyledInput>
        <StyledButton onClick={() => commentBlog(blog.id, comment)}>
          add comment
        </StyledButton>
      </div>
      <div>
        <Title size={1} color={'#0F3325'} capitalize>
          comments
        </Title>
        {blog.comments ? <Comments /> : 'no comments yet'}
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogPost
