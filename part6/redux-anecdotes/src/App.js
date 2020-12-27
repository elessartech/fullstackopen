import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { 
  voteFor, createAnecdote, initializeAnecdotes
} from './reducers/anecdoteReducer' 
import { createNotification } from './reducers/notificationReducer'
import { filterAnecdotes } from "./reducers/filterReducer"
import anecdoteService from "./services/anecdotes"

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll().then(notes => dispatch(initializeAnecdotes(notes)))
  }, [dispatch])

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(createNotification("you voted for " + anecdote.content))
    setTimeout (() => dispatch(createNotification("")), 5000)
  }

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
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