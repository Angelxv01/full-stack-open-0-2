import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AddAnecdotes = () => {
  const dispatch = useDispatch()
  const addAnecdote = (e) => {
    e.preventDefault()
    const text = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(text))
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

export default AddAnecdotes
