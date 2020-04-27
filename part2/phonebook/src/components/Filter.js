import React from 'react'

const Filter = (props) => (
    <React.Fragment>
        filter shown with<input type="text" value={props.filter} onChange={props.onChangeFilter}/>
    </React.Fragment>
)

export default Filter