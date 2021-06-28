import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const randInt = (min = 0, max = 6) => Math.floor(Math.random() * (max - min + 1)) + min
  const nextAnecdote = () => setSelected(randInt())

  const updateVotes = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const getMaxIndex = () => points.indexOf(Math.max(...points))

  return (
    <>
      <div className="today">
        <Title text="Anecdote of the day" />
        <Entry anecdotes={anecdotes} points={points} index={selected} />
      </div>
      <button onClick={updateVotes}>vote</button>
      <button onClick={nextAnecdote}>next anecdotes</button>

      <div className="mostVoted">
        <Title text="Anecdote with most votes" />
        <Entry anecdotes={anecdotes} points={points} index={getMaxIndex()} />
      </div>
    </>
  )
}

const Entry = ({anecdotes, points, index}) => {
  return (
    <>
      {anecdotes[index]} <br />
      has {points[index]} votes
    </>
  )
}

const Title = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

export default App