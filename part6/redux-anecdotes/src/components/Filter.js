import React from 'react'

const Filter = ({onChange}) => {
  return (
    <div style={{margin: "20px 0"}}>
      <span>filter <input onChange={onChange}/></span>
    </div>
  )
}

export default Filter