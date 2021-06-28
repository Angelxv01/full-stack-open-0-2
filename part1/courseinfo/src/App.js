import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({ content }) => {
  return (
    <div>
      {
        content.map((obj) => <Part part={`${obj.name} ${obj.exercises}`} />)
      }
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>{part}</p>
    </>
  )
}

const Total = ({ content }) => {
  return (
    <>
      <p>Number of exercises {content.reduce((sum, part) => sum += part.exercises, 0)}</p>
    </>
  )
}

export default App