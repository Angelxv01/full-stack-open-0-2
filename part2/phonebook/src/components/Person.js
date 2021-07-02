import React from 'react'

const Person = ({ person, handleDeletePerson }) => {
  const confirmAndDeletePerson = () => {
    if (!window.confirm(`Delete ${person.name}`)) return

    handleDeletePerson(person.id)
  }
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={confirmAndDeletePerson}>delete</button>
    </div>
  )
}

export default Person
