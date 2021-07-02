import React from 'react'

const Person = ({ person, handleDeletePerson }) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={() => handleDeletePerson(person.id)}>delete</button>
    </div>
  )
}

export default Person
