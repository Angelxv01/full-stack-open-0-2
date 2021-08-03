import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, asObject } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (e) => {
    e.preventDefault()
    const text = asObject(e.target.anecdote.value)
    e.target.anecdote.value = ''

    anecdotesService.create(text).then((anecdote) => {
      dispatch(createAnecdote(anecdote))
      dispatch(setNotification(`added ${anecdote.content}`))
      setTimeout(() => dispatch(resetNotification()), 5000)
    })
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

export default AnecdoteForm
