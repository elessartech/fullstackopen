import React, { useState, useEffect } from 'react'
import personsService from "./services/persons"
import Filter from "./components/Filter" 
import Notification from "./components/Notification" 
import PersonForm from "./components/PersonForm" 
import Persons from "./components/Persons"

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newNotification, setNewNotification ] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then((response) => {
        setPersons(response)
      })
  }, [])
  
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
    let updatablePerson = personsClone.find(person => person.name === newName)
    let personAlreadyExists;
    updatablePerson ? personAlreadyExists = true : personAlreadyExists = false
    if (!personAlreadyExists) {
      const newPerson = {name: newName, number: newNumber}
      personsService
        .create(newPerson)
        .then(retrievedPerson => { 
          setNewNotification(
            {
              message: `Added ${retrievedPerson.name}`,
              mode: "success"
            }
          )
          setTimeout(() => {
            setNewNotification(null)
          }, 5000)
          personsClone.push(retrievedPerson)
          setPersons(personsClone)
        })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatablePerson.name = newName
        updatablePerson.number = newNumber
        personsService
          .update(updatablePerson.id, updatablePerson)
          .then(retrievedPerson => {
            setNewNotification(
              {
                message: `Updated ${retrievedPerson.name}`,
                mode: "success"
              }
            )
            setTimeout(() => {
              setNewNotification(null)
            }, 5000)
            const personIndex = personsClone.findIndex((person => person.id === retrievedPerson.id));
            personsClone[personIndex] = retrievedPerson
            setPersons(personsClone)
          })
          .catch(_ => {
            setNewNotification(
              {
                message: `Information of ${updatablePerson.name} has already been removed from server, please reload the page!`,
                mode: "error"
              }
            )
            setTimeout(() => {
              setNewNotification(null)
            }, 5000)
          })
      }
    }
    setNewNumber("")
    setNewName("")
  }

  const deletePerson = (event) => {
    const personsClone = [...persons]
    const deletablePersonsName = event.target.value
    if (window.confirm("Delete " + deletablePersonsName + " ?")) { 
      const deletablePerson = personsClone.find(person => person.name === deletablePersonsName)
      personsService
        .remove(deletablePerson.id)
        .then(_ => {
          const updatedPersons = personsClone.filter(person=>person.id !== deletablePerson.id)
          setPersons(updatedPersons)
        })
        .catch(_ => {
          setNewNotification(
            {
              message: `Information of ${deletablePerson.name} has already been removed from server`,
              mode: "error"
            }
          )
          setTimeout(() => {
            setNewNotification(null)
          }, 5000)
        })
    }
  }

  return (
    <React.Fragment>
      <h2>Phonebook</h2>
        <Notification message={newNotification}/>
        <Filter onChangeFilter={handleFilter} filter={newFilter}/>
      <h3>add a new</h3>
        <PersonForm 
          onSubmit={handleSubmit}
          onChangeName={handleName}
          onChangeNumber={handleNumber}
          name={newName}
          number={newNumber} />
      <h3>Numbers</h3>
        <Persons onClick={deletePerson} persons={persons} filter={newFilter}/>
    </React.Fragment>
  )
}

export default App