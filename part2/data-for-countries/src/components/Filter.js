import React from 'react'

const Filter = (props) => {
    return ( 
    <React.Fragment>
        filter shown with<input type="text" value={props.country} onChange={props.onChange}/>
    </React.Fragment>
    )
}

export default Filter