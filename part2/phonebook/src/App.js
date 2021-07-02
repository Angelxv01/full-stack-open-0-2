import "./index.css"

import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Person from './components/Person'
import Message from './components/Message'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personsService
      .getAll()
      .then((persons) => setPersons(persons))
  }, [])

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setnewNumber(event.target.value)
  const handleNewFilter = (event) => setnewFilter(event.target.value)

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
    const confirmToDelete = window.confirm(`Delete ${personToDelete.name}`)
    if (!confirmToDelete) return

    personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        handleMessage(`Deleted ${personToDelete.name}`)
      })
      .catch((err) => {
        handleMessage(`${personToDelete.name} had already been removed`, 'error')
      })
  }

  const handleUpdatePerson = (existPerson, number) => {
    personsService
      .update(existPerson.id, { ...existPerson, number })
      .then((response) =>
        setPersons(
          persons.map(
            (person) =>
              existPerson.id === person.id
                ? response
                : person
          )
        )
      )
      .catch((error) => handleMessage("Some error occured", "error"))
  }

  const handleMessage = (message, type = "success") => {
    setMessage({ type, message })
    setTimeout(() => {
      setMessage(null)
    }, 3000);
  }

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName
    const number = newNumber


    if (!name || !number) {
      alert(`Empty values not allowed`)
      return null
    }

    const personExist = persons.find((person) => person.name === name)
    if (personExist) {
      const confirmChange = window.confirm(`${personExist.name} is already to phonebook, replace the old number with a new one?`)
      if (confirmChange) {
        handleUpdatePerson(personExist, number)
        handleMessage(`Changed number of  ${personExist.name}`)
        setNewName('')
        setnewNumber('')
      }
      return
    }

    personsService
      .create({ name, number })
      .then((person) => {
        setPersons([...persons, person])
        handleMessage(`Added ${person.name}`)
        setNewName('')
        setnewNumber('')
      })
      .catch((error) => handleMessage(`${error.response.data.error} `, 'error'))
  }

  const peopleToShow = newFilter.length > 0
    ? persons.filter(
      (person) =>
        person.name.toLowerCase().includes(newFilter)
    )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      filter shown with
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
        peopleToShow.map((person) =>
          <Person
            key={person.id}
            person={person}
            handleDeletePerson={handleDeletePerson}
          />
        )
      }
    </div>
  )
}


export default App