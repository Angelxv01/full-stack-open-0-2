import React from 'react'

const AddPerson = ({
    name, 
    number, 
    handleNewName, 
    handleNewNumber, 
    addPerson
  }) => {
  return (
      <form>
        <div>
          name: <input value={name} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={number} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
  )
}

export default AddPerson
