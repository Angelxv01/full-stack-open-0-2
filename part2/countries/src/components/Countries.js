import React from 'react'
import Country from './Country'

const Countries = ({ countries, filter, setFilter }) => {

  if (countries.length === 0) {
    return (
      <div>
        No matches
      </div>
    )
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  if (countries.length <= 10) {
    return countries.map((country) =>
      <div key={country.alpha3Code}>
        <p>{country.name}</p>
        <button onClick={() => setFilter(country.name)}>show</button>
      </div>
    )
  }

  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

export default Countries
