import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (e) => {
    e.preventDefault()
    const text = e.target.anecdote.value
    e.target.anecdote.value = ''

    props.createAnecdote(text)
    props
      .setNotification(`you voted ${text}`, 5, props.time)
      .then((timeId) => props.setTime(timeId))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)
