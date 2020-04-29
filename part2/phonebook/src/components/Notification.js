import React from "react"

const Notification = ({ message }) => {
    let notificationStyle = {
        fontStyle: "italic",
        fontSize: 16,
        background: "lightgrey",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    }
    if (message === null) { return null }
    message.mode === "success" ? notificationStyle.color = "green" : notificationStyle.color = "red"
    return (
      <div style={notificationStyle}>
        {message.message}
      </div>
    )
  }

export default Notification