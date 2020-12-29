import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { 
  initializeAnecdotes
} from './reducers/anecdoteReducer' 
import { filterAnecdotes } from "./reducers/filterReducer"

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const modifyFilteringString = (event) => {
    dispatch(filterAnecdotes(event.target.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification notification={notification}/>
      <AnecdoteForm />
      <Filter onChange={modifyFilteringString}/>
      <AnecdoteList filter={filter} anecdotes={anecdotes}/>
    </div>
  )
}

export default App