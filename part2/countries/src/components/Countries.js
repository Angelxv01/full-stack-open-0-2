import React from 'react'
import Country from './Country'

const Countries = ({ countries, filter, setFilter }) => {
    const setWantedFilter = (country) => setFilter(country.name.toLowerCase())
    return (
      <div>
        {
          countries.length > 10 
            ? "Too many matches, specify another filter"
            : countries.length === 1 
              ? <Country country={countries[0]}/>
              : countries.map((country) => 
                  <div key={country.alpha3Code}>
                    <p>{country.name}</p> 
                    <button onClick={() => setWantedFilter(country)}>show</button>
                  </div>
              )
        }
      </div>
    )
  }

export default Countries
