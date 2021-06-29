import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <p><b>Number of exercises {sum}</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {
        course.parts.map((part) => <Part key={part.id} part={part} />)
      }
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Algorithms and data structures',
        exercises: 25,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course} />
    </>
  )
}

export default App