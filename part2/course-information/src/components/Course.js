import React from 'react'

const Course = ({ course }) => { 
  return (
      <React.Fragment>
          <Header course={course.name} />
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
      </React.Fragment>
  )
}

const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.part} {props.exercise}</p>
    )
  } 
  
  const Content = (props) => {
    const parts = props.parts.map(el => <Part key={el.id} part={el.name} exercise={el.exercises} />)
    return (
      <React.Fragment>
        {parts}
      </React.Fragment>
    )
  }

  const Total = (props) => {
    const total = Object.values(props.parts).reduce((sum, el) => sum + el.exercises, 0)
    return (
      <p><strong>total of {total}</strong></p>
    )
  }

  export default Course