import React, { useState, useEffect } from 'react'
import Weather from './Weather'
import axios from "axios";
const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.current)
        setWeather(response.data.current)
      })
  }, [url])
  return (
    <div>
      <h1>{country.name}</h1>

      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {
          country.languages.map((language) => 
            <li key={language.iso639_2}>
              {language.name}
            </li>)
        }
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} style={{ width: "10%" }} />
      <Weather weather={weather} capital={country.capital} />
    </div>
  )
}

export default Country
