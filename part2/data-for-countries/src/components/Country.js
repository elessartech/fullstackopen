import React, {useState} from 'react'
import axios from "axios"

const Country = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [ weatherData, setWeatherData ] = useState({})

    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}`)
      .then(response => {
        setWeatherData(response.data.current)
    })

    const languages = props.country.languages.map((lang, i) => <li key={i}>{lang.name}</li>) 
    return ( 
        <React.Fragment>
            <h1>{props.country.name}</h1>
            <div>
                <p>capital {props.country.capital}</p>
                <p>population {props.country.population}</p>
            </div>
            <h3>languages</h3>
            <ul>
                {languages}
            </ul>
            <img src={props.country.flag} width="200px" height="150px" alt="flag"/>
            <h3>Weather in {props.country.capital}</h3>
            <p><strong>temperature:</strong> {weatherData.temperature} Celcius</p>
            <img src={weatherData.weather_icons} alt={weatherData.weather_descriptions}/>
            <p><strong>wind:</strong> {weatherData.wind_speed} mph direction {weatherData.wind_dir}</p>
        </React.Fragment>
    )
}

export default Country