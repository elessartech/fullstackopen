import React from 'react'

const PersonForm = (props) => (
    <form onSubmit={props.onSubmit}>
        <div>
          name: <input type="text" value={props.name} onChange={props.onChangeName}/>
        </div>
        <div>
          number: <input type="text" value={props.number} onChange={props.onChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm