import React from 'react'
const Weather = ({ weather, capital }) => {
  if (!weather) {
    return null
  }

  return (
    <div>
      <h1>Weather in {capital}</h1>
      <div>
        <strong>Temperature:</strong> {weather.temperature} Celsius
      </div>
      <div>
        <img src={weather.weather_icons} alt={weather.weather_descriptions} />
      </div>
      <div>
        <strong>Wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  )
}

export default Weather
