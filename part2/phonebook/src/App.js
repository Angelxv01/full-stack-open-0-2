import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setnewNumber ] = useState('')
  const [ newFilter, setnewFilter ] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setnewNumber(event.target.value)
  const handleNewFilter = (event) => setnewFilter(event.target.value.toLowerCase())

  const addPerson = (event) => {
    event.preventDefault()
    const name = newName
    const number = newNumber

    setNewName('')
    setnewNumber('')

    if (persons.findIndex((person) => person.name === name) !== -1) {
      alert(`${name} is already added to phonebook`)
      return
    }
    if (!name || !number) {
      alert(`Empty values not allowed`)
      return
    }
    setPersons([...persons, {name, number}])
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
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
          <Person key={person.id} person={person} />
        )
      }
    </div>
  )
}


export default App