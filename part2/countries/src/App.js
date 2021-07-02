import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  const filterCountries = filter.length > 1
    ? countries.filter((country) => country.name.toLowerCase().indexOf(filter) !== -1)
    : countries

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(({ data }) => {
        setCountries(data)
      })
  }, [])

  return (
    <div>
      <Search filter={filter} setFilter={setFilter} />
      <Countries
        countries={filterCountries}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  )
}

// const Search = ({ filter, setFilter }) => {

//   const handleFilter = (event) => {
//     setFilter(event.target.value)
//   }
//   return (
//     <>
//       find countries 
//       <input type="text"
//         value={filter} 
//         onChange={handleFilter}
//       />
//     </>
//   )
// }

export default App

