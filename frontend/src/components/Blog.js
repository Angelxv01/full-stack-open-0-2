import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, putLike, removeBlog, isCreator }) => {
  const [show, setShow] = useState(false)

  const showWhenVisible = { display: show ? '' : 'none' }

  const handleLike = () => {
    // form the data to send and send the request
    const { title, author, url, user } = blog
    const data = {
      user: user.id,
      likes: blog.likes + 1,
      author,
      title,
      url
    }
    putLike(blog.id, data)
  }

  const handleRemove = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      removeBlog(blog.id)
    }
  }

  const styles = {
    border: '0.125em solid #979797',
    borderRadius: '0.5em',
    margin: '0.5em 0',
    padding: '0.5em',
    width: '33%'
  }

  return (
    <div style={styles}>
      <div className="base">
        {blog.title} {blog.author}
      </div>
      <button className="toggleShow" onClick={() => setShow(!show)}>
        {show ? 'hide' : 'show'}
      </button>
      {/* <button onClick={() => console.log(blog)}>info</button> */}
      <div style={showWhenVisible} className="additional">
        <div>{blog.url}</div>
        <div>
          {blog.likes}{' '}
          <button onClick={handleLike} className="like">
            Like
          </button>
        </div>
        <div>{blog.user.username}</div>
        {isCreator && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  putLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  isCreator: PropTypes.bool.isRequired
}

export default Blog
