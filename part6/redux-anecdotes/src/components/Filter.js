import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from "../reducers/filterReducer"

const Filter = ({filterAnecdotes}) => {

  const modifyFilteringString = (event) => {
    filterAnecdotes(event.target.value)
  }

  return (
    <div style={{margin: "20px 0"}}>
      <span>filter <input onChange={modifyFilteringString}/></span>
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdotes,
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter