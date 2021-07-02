import React from 'react'

const Search = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <>
      find countries
      <input type="text"
        value={filter}
        onChange={handleFilter}
      />
    </>
  )
}

export default Search
