import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Person from './components/Person'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setnewNumber(event.target.value)
  const handleNewFilter = (event) => setnewFilter(event.target.value.toLowerCase())

  const handleDeletePerson = (id) => {
    personsService
      .deletePerson(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)))
  }

  const handleUpdatePerson = (currentPerson, number) => {
    if (
      !window.confirm(`${currentPerson.name} is already to phonebook, replace the old number with a new one?`)
    ) return
    personsService
      .update(currentPerson.id, { ...currentPerson, number })
      .then((response) => {
        setPersons(
          persons.map(
            (person) =>
              person.id === currentPerson.id
                ? response
                : person
          )
        )
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const name = newName
    const number = newNumber

    setNewName('')
    setnewNumber('')
    const index = persons.findIndex((person) => person.name === name)
    if (index !== -1) {
      handleUpdatePerson(persons[index], number)
      return
    }
    if (!name || !number) {
      alert(`Empty values not allowed`)
      return
    }

    personsService
      .create({ name, number })
      .then((person) => setPersons([...persons, person]))
  }

  useEffect(() => {
    personsService
      .getAll()
      .then((persons) => setPersons(persons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleNewFilter={handleNewFilter} />
      <h2>add a new</h2>
      <AddPerson
        name={newName}
        number={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {
        (newFilter
          ? persons.filter(
            (person) =>
              person.name.toLowerCase().includes(newFilter)
          )
          : persons
        ).map((person) =>
          <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson} />
        )
      }
    </div>
  )
}


export default App