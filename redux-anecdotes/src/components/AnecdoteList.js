import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdote, filter }) => {
    filter = filter.toLowerCase()
    return filter === ''
      ? anecdote
      : anecdote.filter(
          (obj) => obj.content.toLowerCase().indexOf(filter) !== 1
        )
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }
  return (
    <div>
      {anecdotes
        .sort((one, two) => two.votes - one.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  vote(anecdote)
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
