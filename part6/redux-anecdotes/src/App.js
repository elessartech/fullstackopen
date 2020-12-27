import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { 
  voteFor, createAnecdote
} from './reducers/anecdoteReducer' 
import { createNotification } from './reducers/notificationReducer'
import { filterAnecdotes } from "./reducers/filterReducer"

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(createNotification("you voted for " + anecdote.content))
    setTimeout (() => dispatch(createNotification("")), 5000)
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(createNotification("you created the anecdote " + content))
    setTimeout (() => dispatch(createNotification("")), 5000)
  }

  const modifyFilteringString = (event) => {
    dispatch(filterAnecdotes(event.target.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification notification={notification}/>
      <AnecdoteForm onSubmit={addAnecdote}/>
      <Filter onChange={modifyFilteringString}/>
      <AnecdoteList filter={filter} anecdotes={anecdotes} onClick={vote}/>
    </div>
  )
}

export default App