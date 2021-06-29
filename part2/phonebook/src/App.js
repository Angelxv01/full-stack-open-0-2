import React, { useState } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Person from './components/Person'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

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
          <Person key={person.name} person={person} />
        )
      }
    </div>
  )
}


export default App