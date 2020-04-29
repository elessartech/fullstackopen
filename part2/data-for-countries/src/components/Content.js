import React from 'react'
import List from "./List"
import Country from "./Country"

const Content = (props) => {
    const countriesToShow = props.country === "" 
        ? [] 
        : props.countries.filter(el => 
            el.name.toLowerCase().includes(props.country.toLowerCase())
        ) 
    const content = countriesToShow.length === 1 
        ? <Country weather={props.weather} country={countriesToShow[0]}/>
        : <List onClick={props.onClick} countries={countriesToShow}/>

    return ( 
    <React.Fragment>
        {content}
    </React.Fragment>
    )
}

export default Content