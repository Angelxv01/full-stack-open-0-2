import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Weather = ({ capital }) => {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
            .then((response) => {
                console.log(response.data.current)
                setWeather(response.data.current)
            })
    }, [capital])

    return (
        <div>
            <h1>Weather in {capital}</h1>
            <p><b>Temperature:</b> {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt={weather.weather_descriptions} />
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather
