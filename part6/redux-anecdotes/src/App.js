import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { 
  voteFor, createAnecdote
} from './reducers/anecdoteReducer' 

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm onSubmit={addAnecdote}/>
      <AnecdoteList anecdotes={anecdotes} onClick={vote}/>
    </div>
  )
}

export default App