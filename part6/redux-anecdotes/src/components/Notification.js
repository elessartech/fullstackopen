import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { 
  initializeAnecdotes
} from '../reducers/anecdoteReducer' 

const Notification = ({notification, initializeAnecdotes}) => {
  useEffect(() => {
    initializeAnecdotes()
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={notification === "" ? { display: "none" } : style}>
      {notification}
    </div>
  )
}

const mapDispatchToProps = {
  initializeAnecdotes,
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Notification)

export default ConnectedNotification