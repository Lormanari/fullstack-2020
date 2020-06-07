import React, {useState, useEffect} from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Showerror from './components/Showerror'
import personService from './services/persons'

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ showFiltered, setshowFiltered ] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [Message, setMessage] = useState(null)

	useEffect(() => {
		// axios
		// .get('http://localhost:3001/persons')
		personService
		.getAll()
		.then(initialPersons => {
			setPersons(initialPersons)
		})
	}, [])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const HandleFilterQueryChange = (event) => {
		setshowFiltered(event.target.value)
	}

	const deletePerson = (id, person) => {
		const r = window.confirm(`delete ${person}?`)
		if(r === true) {
			personService
			.remove(id)
			.then(() => {
				setPersons(persons.filter(p => p.id !== id))
			})

		}
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

			const confirmNewPhone = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
			if(confirmNewPhone === true) {
				const id = persons.find(x => x.name === newName).id
				const person = persons.find(p => p.id === id)
				const changedPerson = {...person, number: newNumber}
				personService
				.update(id, changedPerson)
				.then(returnedPerson => {
					setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
					setMessage(`${returnedPerson.name}'s number is updated`)
					setTimeout(() => {
						setMessage(null)
					}, 5000)
				})
				.catch(error => {
					setErrorMessage(`Information of '${person.name}' has already been removed from server`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
					setPersons(persons.filter(p => p.id !== id))
				})
			}
		} else {
			// axios.post('http://localhost:3001/persons', personObject)
			personService
			.create(personObject)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setMessage(`Added ${returnedPerson.name}`)
				setTimeout(() => {
					setMessage(null)
				  }, 5000)
			})
		}
		setNewName('')
		setNewNumber('')
	}

	const filteredPersons = !showFiltered.length ? persons : persons.filter(person => person.name.toLowerCase().indexOf(showFiltered) >= 0)
	return (
	  <div>
		<h2>Phonebook</h2>
		<Notification message={Message} />
		<Showerror message={errorMessage} />
		{/* <p>Filter shown with <input value={showFiltered} onChange={HandleFilterQueryChange}/></p> */}
		<Filter query={showFiltered} changehandler={HandleFilterQueryChange} />
		<h2>Add a new</h2>
		<PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

		<h2>Numbers</h2>
		<Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
		{/* {filteredPersons.map((person) => <p className='mt-0 mb-5' key={person.name}>{person.name} {person.number}<br></br></p>)} */}

	  </div>
	)
  }

export default App
