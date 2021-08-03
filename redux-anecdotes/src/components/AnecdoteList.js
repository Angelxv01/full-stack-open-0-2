import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdote }) => anecdote)
  const filter = useSelector(({ filter }) => filter).toLowerCase()
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`))
    setTimeout(() => dispatch(resetNotification()), 5000)
  }
  return (
    <div>
      {anecdotes
        .filter(
          (anecdote) => anecdote.content.toLowerCase().indexOf(filter) !== -1
        )
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
