import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [ persons, setPersons ] = useState([])

	useEffect(() => {
		axios
		.get('http://localhost:3001/persons')
		.then(response => {
			setPersons(response.data)
		})
	}, [])

	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ showFiltered, setshowFiltered ] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const HandleFilterQueryChange = (event) => {
		setshowFiltered(event.target.value)
	}

	const addName = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber,
		}
		const names = []
		persons.map((person) => names.push(person.name))

		if (names.includes(newName)) {
			alert(`${newName} already added to phonebook`)
		} else {
			setPersons(persons.concat(personObject))
		}
		setNewName('')
		setNewNumber('')
	}

	const filteredPersons = !showFiltered.length ? persons : persons.filter(person => person.name.toLowerCase().indexOf(showFiltered) >= 0)
	return (
	  <div>
		<h2>Phonebook</h2>
		{/* <p>Filter shown with <input value={showFiltered} onChange={HandleFilterQueryChange}/></p> */}
		<Filter query={showFiltered} changehandler={HandleFilterQueryChange} />
		<h2>Add a new</h2>
		<PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

		<h2>Numbers</h2>
		<Persons filteredPersons={filteredPersons}/>
		{/* {filteredPersons.map((person) => <p className='mt-0 mb-5' key={person.name}>{person.name} {person.number}<br></br></p>)} */}

	  </div>
	)
  }

export default App
