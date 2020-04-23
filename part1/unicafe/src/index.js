import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Statistics = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
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

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicks = () => {
    setGood(good + 1)
  }

  const handleNeutralClicks = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClicks = () => {
    setBad(bad + 1)
  }

  let stats = <p>No feedback given</p>
  if (good > 0 || neutral > 0 || bad > 0) {
    stats = 
    <table>
      <tbody>
        <Statistics text="good" value={good} />
        <Statistics text="neutral" value={neutral} />
        <Statistics text="bad" value={bad} />
        <Statistics text="all" value={good + neutral + bad} />
        <Statistics text="average" value={(good - bad) / (good + neutral + bad)} />
        <Statistics text="positive" value={String(good / (good + neutral + bad) * 100).concat("%")} />
      </tbody>
    </table>
  }

  return (
    <React.Fragment>
      <div>
        <Header title="give feedback" />
        <Button onClick={handleGoodClicks} text={"good"} />
        <Button onClick={handleNeutralClicks} text={"neutral"} />
        <Button onClick={handleBadClicks} text={"bad"} />
      </div>
      <div>
        <Header title="statistics" />
        {stats}
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)