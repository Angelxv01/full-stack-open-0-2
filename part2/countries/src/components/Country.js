import React from 'react'
import Weather from './Weather'
const Country = ({ country }) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {
            country.languages.map((language) => <li key={language.iso639_2}>{language.name}</li>)
          }
        </ul>
        <img src={country.flag} alt={`${country.name} flag`} style={{width: "10%"}}/>
        <Weather capital={country.capital}/>
      </div>
    )
  }

export default Country
