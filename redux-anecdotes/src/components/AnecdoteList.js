import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const filter = props.filter
  const anecdotes =
    filter === ''
      ? props.anecdote
      : props.anecdote.filter(
          (obj) => obj.content.toLowerCase().indexOf(filter) !== -1
        )

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted ${anecdote.content}`, 5)
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdote: state.anecdote
  }
}

export default connect(mapStateToProps, { voteAnecdote, setNotification })(
  AnecdoteList
)
