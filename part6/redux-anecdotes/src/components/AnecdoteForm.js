import React from 'react'

const AnecdoteForm = ({onSubmit}) => {
  return (
    <React.Fragment>
        <h2>create new</h2>
        <form onSubmit={onSubmit}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
    </React.Fragment>
  )
}

export default AnecdoteForm