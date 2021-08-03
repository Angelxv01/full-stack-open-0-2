import React, { useState, useEffect } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { initAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [time, setTime] = useState(null)
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList time={time} setTime={setTime} />
      <AnecdoteForm time={time} setTime={setTime} />
    </div>
  )
}

export default App
