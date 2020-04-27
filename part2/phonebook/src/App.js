import React, { useState } from 'react'
import Filter from "./components/Filter" 
import PersonForm from "./components/PersonForm" 
import Persons from "./components/Persons"

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  
  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const personsClone = [...persons]
    let personAlreadyExists = false
    personsClone.forEach(person => {
      if (person.name === newName) {
        personAlreadyExists = true
        alert(`${newName} is already added to phonebook`)
      }
    })
    if (!personAlreadyExists) {
      personsClone.push({name: newName, number: newNumber})
      setPersons(personsClone)  
      setNewNumber("")
      setNewName("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter onChangeFilter={handleFilter} filter={newFilter}/>
      <h3>add a new</h3>
        <PersonForm 
          onSubmit={handleSubmit}
          onChangeName={handleName}
          onChangeNumber={handleNumber}
          name={newName}
          number={newNumber} />
      <h3>Numbers</h3>
        <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App