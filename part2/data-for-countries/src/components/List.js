import React from 'react'

const List = (props) => {
    const content = props.countries.map((country, i) => <li key={i}>{country.name} <button value={country.name} onClick={props.onClick}>Show</button></li>)
    return ( 
    <React.Fragment>
        <ul>
            {content}
        </ul>
    </React.Fragment>
    )
}

export default List