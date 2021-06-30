import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState(countries)
  const [filter, setFilter] = useState("")

  const getFilterCountries = () => {
    const result = countries.filter((country) => country.name.toLowerCase().indexOf(filter) !== -1)
    setFilterCountries(result)
  }


  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(({ data }) => {
        setCountries(data)
      })
  }, [])

  useEffect(getFilterCountries, [filter, countries])

  const handleFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      find countries <input type="text" value={filter} onChange={handleFilter} />
      <Countries countries={filterCountries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App

