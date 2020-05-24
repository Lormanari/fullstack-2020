import React from 'react'
import SinglePerson from './SinglePerson'

const Persons = ({filteredPersons}) => {
	return (
		<>
		{filteredPersons.map((filteredperson) => <SinglePerson key={filteredperson.name} person={filteredperson}/>)}
		</>
	)
}

export default Persons