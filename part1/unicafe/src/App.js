import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => setGood(good + 1)
  const updateNeutral = () => setNeutral(neutral + 1)
  const updateBad = () => setBad(bad + 1)

  const getNumOfVotes = () => good + neutral + bad
  return (
    <>
      <div className="controller">
        <Header text="give feedback" />
        <Button text="good" update={updateGood} />
        <Button text="neutral" update={updateNeutral} />
        <Button text="bad" update={updateBad} />
      </div>
      <div className="statistics">
        <Header text="statistics" />
        {getNumOfVotes() > 0
          ? <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            getNumOfVotes={getNumOfVotes}
          />
          : "No feedback given"
        }
      </div>
    </>
  )
}

const Statistics = ({ good, neutral, bad, getNumOfVotes }) => {
  const average = () => {
    const sum = getNumOfVotes()
    const points = good - bad
    return points / sum || 0
  }
  const positivePercentage = () => good / getNumOfVotes() * 100 || 0

  return (
    <table>
      <tbody>
        <Statistic text="good" number={good} />
        <Statistic text="neutral" number={neutral} />
        <Statistic text="bad" number={bad} />
        <Statistic text="all" number={getNumOfVotes()} />
        <Statistic text="average" number={average()} />
        <Statistic text="positive" number={positivePercentage() + "%"} />
      </tbody>
    </table>
  )
}

const Button = ({ text, update }) => {
  return (
    <button onClick={update} style={{ marginRight: "1em" }}>
      {text}
    </button>
  )
}

const Statistic = ({ text, number }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}

const Header = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

export default App