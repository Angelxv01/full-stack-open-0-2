import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const res = action.data
      return state.map((text) => (text.id === res.id ? res : text))
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updated = { ...anecdote, votes: anecdote.votes + 1 }
    const res = await anecdotesService.like(updated.id, updated)
    dispatch({
      type: 'VOTE',
      data: res
    })
  }
}

export const createAnecdote = (text) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(asObject(text))
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export default reducer
