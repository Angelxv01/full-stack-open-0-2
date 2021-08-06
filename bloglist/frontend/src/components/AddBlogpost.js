import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyledButton, Grid, StyledInput } from '../styles'

const AddBlogPost = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreate(title, author, url)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <Grid rows={1}>
        <StyledInput>
          title
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </StyledInput>
        <StyledInput>
          author
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </StyledInput>
        <StyledInput>
          url
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </StyledInput>
      </Grid>
      <StyledButton onClick={handleSubmit}>Create</StyledButton>
    </div>
  )
}

AddBlogPost.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default AddBlogPost
