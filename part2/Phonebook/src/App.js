import React, {useState} from 'react';
import './index.css';

const App = () => {
	const [ persons, setPersons ] = useState([
	  {
		name: 'Arto Hellas',
		number: '040-1234567',
	  }
	])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
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
	return (
	  <div>
		<h2>Phonebook</h2>
		<form onSubmit={addName}>
		  <div>
			name: <input value={newName} onChange={handleNameChange}/>
		  </div>
		  <div>
			number: <input value={newNumber} onChange={handleNumberChange}/>
		  </div>
		  <div>
			<button type="submit">Add</button>
		  </div>
		</form>
		<h2>Numbers</h2>

		{persons.map((person) => <p className='mt-0 mb-5' key={person.name}>{person.name} {person.number}<br></br></p>)}

	  </div>
	)
  }

export default App
