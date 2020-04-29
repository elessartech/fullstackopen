import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Content from "./components/Content"
import axios from "axios";

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState('')

  const handleNewCountry = (event) => {
    setCountry(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  return (
    <React.Fragment>
        <Filter onChange={handleNewCountry} country={country}/>
        <Content countries={countries} country={country} onClick={handleNewCountry}/>
    </React.Fragment>
  )
}

export default App