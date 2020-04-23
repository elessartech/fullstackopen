import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Button = (props) => { 
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))

  const handleSelectedAnecdote = () => {
    const rand = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(rand)
  }

  const handleVoting = () => {
    const pointsClone = [...points]
    pointsClone[selected] += 1
    setPoints(pointsClone)
  }

  let popularAnecdoteIndex = points.indexOf(points.reduce((a, b) => Math.max(a, b)))
  let popularAnecdote = props.anecdotes[popularAnecdoteIndex]

  return (
    <React.Fragment>
      <div>
        <Header title="Anecdote of the day" />
        {props.anecdotes[selected]}
        <div>
          <Button text="vote" onClick={handleVoting}/>
          <Button text="next anecdote" onClick={handleSelectedAnecdote}/>
        </div>
      </div>
      <div>
        <Header title="Anecdote with most votes" />
        <p>{popularAnecdote}</p>
      </div>
    </React.Fragment>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)