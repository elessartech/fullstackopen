import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { 
  voteFor, initializeAnecdotes
} from './reducers/anecdoteReducer' 
import { createNotification } from './reducers/notificationReducer'
import { filterAnecdotes } from "./reducers/filterReducer"

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(createNotification("you voted for " + anecdote.content))
    setTimeout (() => dispatch(createNotification("")), 5000)
  }

  const modifyFilteringString = (event) => {
    dispatch(filterAnecdotes(event.target.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification notification={notification}/>
      <AnecdoteForm />
      <Filter onChange={modifyFilteringString}/>
      <AnecdoteList filter={filter} anecdotes={anecdotes} onClick={vote}/>
    </div>
  )
}

export default App