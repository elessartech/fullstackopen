import React from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(createNotification("you created the anecdote " + content))
    setTimeout (() => dispatch(createNotification("")), 5000)
  }

  return (
    <React.Fragment>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
    </React.Fragment>
  )
}

export default AnecdoteForm