import React from 'react'

const Filter = ({ filter, handleNewFilter }) => {
  return (
    <input value={filter} onChange={handleNewFilter} />
  )
}

export default Filter
